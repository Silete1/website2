const SITE_URL = 'https://www.anu.ltd';
const DEFAULT_IMAGE = `${SITE_URL}/anulogopng-.png`;

const upsertMeta = (selector, attributes) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('link');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
};

const upsertJsonLd = (structuredData) => {
  const selector = 'script[data-seo="structured-data"]';
  let tag = document.head.querySelector(selector);

  if (!structuredData) {
    if (tag) {
      tag.remove();
    }
    return;
  }

  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.setAttribute('data-seo', 'structured-data');
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify(structuredData);
};

export const setPageMetadata = ({
  title,
  description,
  path = '/',
  type = 'website',
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  image = DEFAULT_IMAGE,
  locale = 'ar_IQ',
  structuredData = null,
} = {}) => {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  if (title) {
    document.title = title;
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  }

  if (description) {
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
  }

  upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: locale });
  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
  upsertJsonLd(structuredData);
};

export const siteMetadata = {
  siteUrl: SITE_URL,
  defaultImage: DEFAULT_IMAGE,
};
