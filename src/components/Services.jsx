// src/components/Services.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { anuCompanyServices } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { InteractiveLetters } from './other/InteractiveLetters';
import { useI18n } from '../i18n.jsx';

const ServiceDisplayCard = ({
  id,
  name,
  description,
  image,
  alt = '',
  index,
  active,
  handleClick,
  lang,
}) => {
  const translations = {
    'service-ea': {
      name: 'الهندسة المؤسسية',
      description: 'نحلل العمليات باستخدام TOGAF ونصمم معماريات محسّنة تناسب منظمتك.',
    },
    'service-erp': {
      name: ' أودو',
      description: 'نضبط ونخصّص أودو ليتماشى مع تدفقات عملك في المبيعات والمحاسبة والمخزون والموارد وغيرها.',
    },
    'service-ia': {
      name: 'الأتمتة الذكية',
      description: 'نربط الأنظمة، ندمج بيانات GPS وواتساب، ونبني تدفقات عمل مؤتمتة مدعومة بـ LLMs.',
    },
    'service-ca': {
      name: 'تطبيقات',
      description: 'نبني تطبيقات ويب/جوال ولوحات بيانات تمنح فرقك\nرؤية لحظية وتشغّيلًا أكثر سلاسة.',
    },
  };

  const displayName = lang === 'ar' && translations[id]?.name ? translations[id].name : name;
  const displayDescription =
    lang === 'ar' && translations[id]?.description ? translations[id].description : description;
  const displayAlt = lang === 'ar' && translations[id]?.name
    ? translations[id].name
    : (alt || displayName);

  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
        } flex items-center justify-center min-w-[170px] 
      h-[420px] cursor-pointer card-shadow overflow-hidden`}
      onClick={() => handleClick(id)}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div
        className="absolute top-0 left-0 z-10 bg-jetLight 
      h-full w-full opacity-[0.5] rounded-[24px]"></div>

      <img
        src={image}
        alt={displayAlt}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />

      {active !== id ? (
        <>
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
          <div className={`flex items-center justify-start pr-[4.5rem] ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <h3
              className="font-extrabold font-beckman uppercase w-[200px] h-[30px] 
            whitespace-nowrap sm:text-[27px] text-[18px] text-white tracking-[1px]
            absolute z-0 lg:bottom-[7rem] lg:rotate-[-90deg] lg:origin-[0,0]
            leading-none z-20"
            >
              {displayName}
            </h3>
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute left-0 right-0 bottom-0 translate-y-[-8px] p-8 pb-12 justify-start items-start w-full 
            flex-col bg-white/90 rounded-b-[24px] z-20 max-h-[280px] overflow-y-auto space-y-3">
            <h2
              className={`font-bold sm:text-[32px] text-[24px] 
              text-eerieBlack uppercase font-beckman sm:mt-0 -mt-[1rem] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {displayName}
            </h2>
            <p
            className={`text-eerieBlack sm:text-[14px] text-[12px] 
              sm:leading-[22px] leading-[18px] break-words whitespace-pre-line
              font-poppins tracking-[1px] mt-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {displayDescription}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

const Services = () => {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(anuCompanyServices.length > 0 ? anuCompanyServices[0].id : '');
  const introParagraph = t('services.intro');

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>
          <InteractiveLetters text={t('services.heading')} className={`${styles.sectionHeadText} inline-block`} maxDistance={400} maxTranslate={50} disableSplit={lang === 'ar'} />
        </h2>
      </motion.div>

      <div className="w-full flex">
        {/* Changed motion.p to motion.div to fix nesting warning */}
        <motion.div
          variants={fadeIn('', '', 0.1, 1)}
          className={`mt-4 text-eerieBlack text-[18px] max-w-3xl leading-[30px] ${lang === 'ar' ? 'text-right' : ''}`}
        >
          <InteractiveLetters text={introParagraph} className="text-eerieBlack text-[18px] leading-[30px]" maxDistance={150} maxTranslate={15} disableSplit={lang === 'ar'} />
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {anuCompanyServices.map((service, index) => (
            <ServiceDisplayCard
              key={service.id}
              index={index}
              {...service}
              active={active}
              handleClick={setActive}
              lang={lang}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Services, 'services');
