import pkg from 'netlify-cms-oauth-provider-node';

const { createVercelBeginHandler } = pkg;

const siteUrl = (process.env.SITE_URL || 'http://localhost:5173').replace(
  /\/$/,
  ''
);

const originList = Array.from(
  new Set(
    [
      siteUrl,
      process.env.SITE_URL ? process.env.SITE_URL.replace(/\/$/, '') : null,
      'http://localhost:5173',
      'http://localhost:3000',
    ].filter(Boolean)
  )
);

const adminPanelUrl = `${siteUrl}/admin`;
const completeUrl = `${siteUrl}/api/callback`;

const requiredEnv = [
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'GITHUB_REPO',
  'SITE_URL',
];

const missing = requiredEnv.filter((key) => !process.env[key]);

const errorHandler = async (req, res) => {
  res.status(500).json({ error: 'OAuth configuration is incomplete.' });
};

const begin =
  missing.length > 0
    ? errorHandler
    : createVercelBeginHandler(
        {
          origin: originList,
          completeUrl,
          adminPanelUrl,
          oauthProvider: 'github',
          oauthClientID: process.env.GITHUB_CLIENT_ID,
          oauthClientSecret: process.env.GITHUB_CLIENT_SECRET,
          oauthScopes: 'public_repo',
        },
        { useEnv: false, useArgs: false }
      );

const allowedUsers = (() => {
  const envList = (process.env.ALLOWED_GITHUB_USERS || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  const repoOwner =
    (process.env.GITHUB_REPO || '').split('/')[0]?.trim() || null;
  const combined = [...envList, repoOwner].filter(Boolean);
  return new Set(combined.map((u) => u.toLowerCase()));
})();

const renderSuccess = (token) => `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function send(msg) {
          if (window.opener) {
            window.opener.postMessage(msg, '*');
            window.close();
          }
        }
        send('authorization:github:success:${token}');
      })();
    </script>
  </body>
</html>`;

const renderError = (message) => `<!doctype html>
<html>
  <body>
    <p>${message}</p>
    <script>
      (function() {
        if (window.opener) {
          window.opener.postMessage('authorization:github:error:${message}', '*');
          window.close();
        }
      })();
    </script>
  </body>
</html>`;

const complete = async (req, res) => {
  if (missing.length > 0) {
    res.status(500).json({ error: 'OAuth configuration is incomplete.' });
    return;
  }

  const code = req.query?.code;
  if (!code) {
    res.status(400).send(renderError('Missing authorization code'));
    return;
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: completeUrl,
      }),
    });

    if (!tokenResponse.ok) {
      res.status(502).send(renderError('OAuth token exchange failed'));
      return;
    }

    const tokenJson = await tokenResponse.json();
    const accessToken = tokenJson.access_token;
    if (!accessToken) {
      res.status(502).send(renderError('OAuth token missing'));
      return;
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'decap-cms-auth',
      },
    });

    if (!userResponse.ok) {
      res.status(502).send(renderError('GitHub user lookup failed'));
      return;
    }

    const { login } = await userResponse.json();
    const normalizedLogin = (login || '').toLowerCase();
    if (allowedUsers.size && !allowedUsers.has(normalizedLogin)) {
      res.status(403).send(renderError('User not allowed'));
      return;
    }

    res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8');
    res.send(renderSuccess(accessToken));
  } catch (error) {
    res.status(500).send(renderError('Unexpected error'));
  }
};

export { begin, complete };
