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
      rotating: ['تطبيقاتك', 'مواقعك', 'عملياتك', 'إجراءاتك', 'إدارتك'],
      subtitle: 'مواقع إلكترونية وتطبيقات موبايل مخصّصة ونظام أودو ERP ضمن منظومة واحدة منسجمة، مصمَّمة لتناسب طريقة عمل شركتك فعلياً.',
      cta: 'احجز استشارة مجانية',
    },
    about: {
      heading: 'نظرة عامة',
      description:
        'أنو سوفتوير سوليوشنز تطوّر برمجيات أعمال للشركات في العراق والمنطقة. نعمل على تصميم وتنفيذ مواقع إلكترونية وتطبيقات موبايل وأنظمة داخلية مخصّصة، إضافةً إلى إعداد أنظمة أودو ERP لتنظيم الحسابات والمخزون والعمليات. تركيزنا الأساسي هو فهم طريقة العمل الحقيقية داخل شركتك، ثم تحويلها إلى خطوات رقمية واضحة وثابتة يمكن للفريق الاعتماد عليها يومياً.',
    },
    services: {
      heading: 'خدماتنا',
      intro:
        'نقدّم خدمات لتحسين عمليات الأعمال وبناء حلول مخصصة في العمارة المؤسسية، تنفيذ الـERP، الأتمتة الذكية، وتطوير التطبيقات.',
      items: {
        customApps: {
          title: 'تطبيقات',
          description: 'مواقع إلكترونية وتطبيقات موبايل حديثة مصمَّمة لتدفّقات عملك ومستخدميك.',
        },
        portals: {
          title: 'الأتمتة الذكية',
          description: 'بوابات وأنظمة حجز وتتبع وتدفّقات مؤتمتة تقلّل العمل اليدوي والأخطاء.',
        },
        architecture: {
          title: 'معمارية المؤسسات',
          description: 'نمذجة العمليات وتصميم الأنظمة باستخدام TOGAF وBPMN لبناء منظومات رقمية قابلة للتوسّع.',
        },
        integrations: {
          title: 'أودو',
          description: 'تنفيذ أودو ERP وتصميم الوحدات وربط متعمّق مع تطبيقاتك المخصّصة وبياناتك.',
        },
      },
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
      heading: 'تواصل معنا',
      description: 'يسعدنا سماعك. إذا كنت مستعدًا لتطوير عملك أو لديك فكرة، فريقنا جاهز للمساعدة',
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
      subtitle: 'Custom web & mobile applications and Odoo ERP delivered as one coherent system — designed around how your company really works.',
      cta: 'Book a free consultation',
    },
    about: {
      heading: 'Overview',
      description:
        'Anu Software Solutions builds business software for companies in Iraq and the region. We design and deliver custom websites, mobile applications, and internal tools, and we also implement Odoo-based ERP systems to organize finance, inventory, and operations. Our focus is simple: understand how work really happens inside your company, then turn it into clear, reliable digital flows that your team can actually use every day.',
    },
    services: {
      heading: 'Our Services',
      intro:
        'We provide expert services across enterprise architecture, ERP implementation, intelligent automation, and custom app development to optimize your operations.',
      items: {
        customApps: {
          title: 'Applications',
          description: 'Modern web & mobile apps tailored to your workflows and users.',
        },
        portals: {
          title: 'Smart Automation',
          description: 'Portals, booking and tracking flows, and process automation that reduce manual work and errors.',
        },
        architecture: {
          title: 'Architecture',
          description: 'Process modeling and system design using TOGAF and BPMN for scalable digital ecosystems.',
        },
        integrations: {
          title: 'Odoo',
          description: 'Odoo ERP implementation, module design, and deep integrations with your custom apps and data.',
        },
      },
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
      heading: 'Contact Us',
      description: 'We’d love to hear from you. Whether you’re ready to transform your business or exploring ideas, our team is here to help',
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
