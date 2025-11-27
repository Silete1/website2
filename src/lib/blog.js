import { marked } from 'marked';

const markdownModules = import.meta.glob('/content/blog/*.md', {
  eager: true,
  as: 'raw',
});

let cachedPosts;

const parseFrontmatter = (raw) => {
  // Minimal frontmatter parser to avoid Buffer usage (SES-friendly)
  const match = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)/m.exec(raw);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, fm, content] = match;
  const data = {};

  fm.split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [key, ...rest] = line.split(':');
      if (!key) return;
      data[key.trim()] = rest.join(':').trim().replace(/^"|"$|^'|'$/g, '');
    });

  return { data, content };
};

const parseMarkdownModules = () => {
  if (cachedPosts) return cachedPosts;

  const posts = Object.entries(markdownModules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slugFromPath = path.split('/').pop()?.replace('.md', '') || '';
    const slug = data.slug || slugFromPath;

    return {
      slug,
      title: data.title || slugFromPath,
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      html: marked.parse(content || ''),
    };
  });

  cachedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return cachedPosts;
};

export const getAllPosts = () =>
  parseMarkdownModules().map(({ html, content, ...rest }) => rest);

export const getPostBySlug = (slug) =>
  parseMarkdownModules().find((post) => post.slug === slug);
