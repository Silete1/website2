import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { aboutServices } from '../constants'; // Changed from 'services' to 'aboutServices'
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { InteractiveLetters } from './other/InteractiveLetters'; // Ensure this path is correct
import { useI18n } from '../i18n.jsx';

const ServiceCard = ({ index, title, icon, description, lang }) => {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className="w-full card-gradient p-[1px] rounded-[20px] shadow-card mb-10"
    >
      <div
        className={`bg-jetLight rounded-[20px] py-8 px-6 min-h-[200px] flex flex-col justify-start ${lang === 'ar' ? 'items-end text-right' : 'items-start text-left'}`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className={`flex items-center mb-4 w-full ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          {icon && (
            <img
              src={icon}
              alt={title}
              className={`w-12 h-12 object-contain ${lang === 'ar' ? 'ml-4' : 'mr-4'}`}
            />
          )}
          <h3 className="text-white text-[20px] font-bold w-full">
            <InteractiveLetters
              text={title}
              className="font-bold" // Keep existing bold styling for title
              maxDistance={200}
              maxTranslate={20}
              disableSplit={lang === 'ar'}
            />
          </h3>
        </div>
        {/* Applying InteractiveLetters to the description */}
        <InteractiveLetters
          text={description}
          className={`text-taupe text-[17px] leading-[28px] break-words w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`} // Apply original paragraph styling
          maxDistance={100} // More subtle effect for descriptions
          maxTranslate={10}
          disableSplit={lang === 'ar'}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t, lang } = useI18n();
  const anuDescription = t('about.description');

  const cardTranslations = {
    ar: {
      'About': { title: 'نبذة عنا', description: 'تصمم أنو سوفتوير سوليوشنز أنظمة ويب وجوال وERP مخصصة لتناسب طريقة عمل الشركات في العراق والمنطقة.' },
      'Our Mission': { title: 'رسالتنا', description: 'نساعد الشركات على الانتقال من الجداول وواتساب إلى تطبيقات قوية دون تعقيد مفرط.' },
      'Our Vision': { title: 'رؤيتنا', description: 'أن نكون الشريك التقني المحلي القادر على تصميم وتشغيل الأنظمة الحيوية للأعمال العراقية.' },
      'Our Approach': { title: 'منهجيتنا', description: 'نجمع بين تحليل الأعمال (BPMN، TOGAF، ArchiMate) وهندسة قوية في React و Next.js و Node.js مع استخدام أودو عند الحاجة.' },
    },
  };

  const localizedServices = aboutServices.map((service) => {
    if (lang !== 'ar') return service;
    const override = cardTranslations.ar[service.title];
    return override
      ? { ...service, title: override.title, description: override.description }
      : service;
  });

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>
          <InteractiveLetters
            text={t('about.heading')}
            className={`${styles.sectionHeadText} inline-block`} // Ensure it keeps heading styles and allows proper flow
            maxDistance={400}
            maxTranslate={50}
            disableSplit={lang === 'ar'}
          />
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 max-w-3xl"
      >
        {/* Applying InteractiveLetters to the main descriptive paragraph */}
        <InteractiveLetters
          text={anuDescription}
          className={`text-taupe text-[18px] leading-[30px] ${lang === 'ar' ? 'text-right' : ''}`} // Apply original paragraph styling
          maxDistance={150}
          maxTranslate={15}
          disableSplit={lang === 'ar'}
        />
      </motion.div>

      <div className="mt-20 flex flex-col gap-10">
        {/* Changed from services.map to aboutServices.map */}
        {localizedServices.map((service, index) => (
          <ServiceCard key={`${service.title}-${index}`} index={index} {...service} lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
