import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      contact: 'تواصل',
      blog: 'المدونة',
    },
    hero: {
      title: 'بسّط',
      rotating: ['تطبيقاتك', 'مواقعك', 'عملياتك', 'إجراءاتك', 'تشغيلك'],
      subtitle: 'نصمم ونبني أنظمة ويب وجوال ومتكاملة تناسب طريقة عمل نشاطك.',
      cta: 'احجز استشارة مجانية',
    },
    about: {
      heading: 'نظرة عامة.',
      description:
        'تصمم أنو سوفتوير سوليوشنز أنظمة ويب وجوال وERP مخصصة لتناسب طريقة عمل الشركات في العراق والمنطقة.',
    },
    services: {
      heading: 'خدماتنا.',
      intro:
        'نقدّم خدمات لتحسين عمليات الأعمال وبناء حلول مخصصة في العمارة المؤسسية، تنفيذ الـERP، الأتمتة الذكية، وتطوير التطبيقات.',
    },
    blog: {
      heading: 'المدونة',
      subheading: 'مقالات حول تطبيقات الويب والجوال، التكاملات، و الـERP للشركات في العراق والمنطقة.',
      searchLabel: 'ابحث في المقالات',
      searchPlaceholder: 'ابحث في المقالات...',
      noResults: 'لا توجد مقالات مطابقة لهذا البحث.',
      results: 'نتيجة',
      resultsPlural: 'نتائج',
    },
    contact: {
      heading: 'تواصل معنا.',
      description: 'يسعدنا سماعك. إذا كنت مستعدًا لتطوير عملك أو لديك فكرة، فريقنا جاهز للمساعدة.',
      formTitle: 'أرسل لنا رسالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      submit: 'إرسال',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      blog: 'Blog',
    },
    hero: {
      title: 'Simplify',
      rotating: ['your apps', 'your websites', 'your processes', 'your workflows', 'your operations'],
      subtitle: 'We design and build web, mobile and integrated systems that actually fit how your business works.',
      cta: 'Book a free consultation',
    },
    about: {
      heading: 'Overview.',
      description:
        'Anu Software Solutions designs and builds custom web, mobile and ERP systems for businesses in Iraq and the region.',
    },
    services: {
      heading: 'Our Services.',
      intro:
        'We provide expert services across enterprise architecture, ERP implementation, intelligent automation, and custom app development to optimize your operations.',
    },
    blog: {
      heading: 'Blog',
      subheading: 'Articles on web and mobile apps, integrations, and ERP for businesses in Iraq and the region.',
      searchLabel: 'Search articles',
      searchPlaceholder: 'Search articles...',
      noResults: 'No articles found for this search.',
      results: 'result',
      resultsPlural: 'results',
    },
    contact: {
      heading: 'Contact Us.',
      description: 'We’d love to hear from you. Whether you’re ready to transform your business or exploring ideas, our team is here to help.',
      formTitle: 'Send Us A Message',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send',
    },
  },
};

const I18nContext = createContext({
  lang: 'ar',
  setLang: () => {},
  t: (key) => key,
});

const resolveKey = (obj, key) =>
  key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const t = useMemo(() => {
    return (key) => {
      const value = resolveKey(translations[lang], key);
      if (value === undefined) {
        return key;
      }
      return value;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
