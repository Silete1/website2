import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { setPageMetadata } from '../utils/seo';
import { getAllPosts } from '../lib/blog';
import { useI18n } from '../i18n.jsx';

const posts = getAllPosts();

const Blog = () => {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');

  useEffect(() => {
    setPageMetadata(
      'Blog – Anu Software Solutions',
      'Articles on custom web and mobile apps, integrations, ERP, and digital transformation for businesses in Iraq and the region.'
    );
  }, []);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;

    return posts.filter((post) => {
      const haystack = `${post.title} ${post.excerpt}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

    return (
    <main className="bg-flashWhite min-h-screen">
      <section className={`${styles.padding} ${styles.navPadding} max-w-6xl mx-auto pb-16`}>
        <div className="text-center max-w-3xl mx-auto">
          <p className={`${styles.sectionSubText} text-center`}>{t('blog.heading')}</p>
          <h1 className={`${styles.sectionHeadText} text-center`}>{t('blog.heading')}</h1>
          <p className="text-taupe text-[18px] leading-[30px] mt-4">
            {t('blog.subheading')}
          </p>
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <label htmlFor="blog-search" className={`block text-sm font-semibold text-eerieBlack mb-2 ${lang === 'ar' ? 'text-right' : ''}`}>
            {t('blog.searchLabel')}
          </label>
          <div className="relative">
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('blog.searchPlaceholder')}
              className="w-full rounded-xl border border-white/20 bg-jetLight text-timberWolf placeholder:text-silver focus:outline-none focus:ring-2 focus:ring-french px-4 py-3 text-base shadow-sm"
            />
          </div>
          {query.trim() ? (
            <p className="mt-2 text-sm text-taupe">
              {filteredPosts.length}{' '}
              {filteredPosts.length === 1 ? t('blog.results') : t('blog.resultsPlural')}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-taupe text-base">
              {t('blog.noResults')}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-jetLight rounded-2xl border border-white/10 shadow-card overflow-hidden flex flex-col"
              >
                <div
                  className="h-28 bg-gradient-to-br from-blue-600/70 via-french/70 to-violet-600/40"
                  aria-hidden="true"
                />

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[13px] text-taupe uppercase tracking-[0.2em]">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-timberWolf leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-french transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-silver text-[16px] leading-[28px]">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 text-sm text-taupe">
                    <Link to={`/blog/${post.slug}`} className="font-semibold text-french hover:underline">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
