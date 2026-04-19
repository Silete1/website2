import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { styles } from '../styles';
import { setPageMetadata } from '../utils/seo';
import { getPostBySlug } from '../lib/blog';
import { useI18n } from '../i18n.jsx';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);
  const { lang } = useI18n();

  useEffect(() => {
    if (!post) {
      navigate('/blog');
      return;
    }

    setPageMetadata({
      title: `${post.title} | ANU`,
      description:
        post.excerpt ||
        'Article from ANU about Odoo ERP, accounting software, integrations, and business systems in Iraq.',
      path: `/blog/${post.slug}`,
      type: 'article',
      locale: lang === 'ar' ? 'ar_IQ' : 'en_US',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description:
          post.excerpt ||
          'Article from ANU about Odoo ERP, accounting software, integrations, and business systems in Iraq.',
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: `https://www.anu.ltd/blog/${post.slug}`,
        author: {
          '@type': 'Organization',
          name: 'ANU',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ANU',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.anu.ltd/anulogopng-.png',
          },
        },
      },
    });
  }, [lang, navigate, post]);

  if (!post) {
    return null;
  }

  return (
    <main className="bg-flashWhite min-h-screen">
      <section className={`${styles.padding} ${styles.navPadding} max-w-4xl mx-auto pb-16`}>
        <div className="mb-6">
          <Link to="/blog" className="text-french font-semibold hover:underline">
            Back to blog
          </Link>
        </div>

        <article>
          <header className="mb-6">
            <p className={`${styles.sectionSubText} uppercase`}>Article</p>
            <h1 className={`${styles.sectionHeadText} leading-tight`}>{post.title}</h1>
            <p className="text-taupe text-[15px] mt-2">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </p>
          </header>

          <div
            className="prose prose-invert prose-p:text-silver prose-headings:text-timberWolf prose-strong:text-timberWolf prose-a:text-french max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </section>
    </main>
  );
};

export default BlogPost;
