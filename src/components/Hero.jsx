import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { InteractiveLetters } from "./other/InteractiveLetters";
import odooPartnerLogo from '../assets/odoo-logo-with-partner.png';
import { useI18n } from '../i18n.jsx';

const Hero = () => {
  const { lang, t } = useI18n();
  const rotatingTexts = Array.isArray(t('hero.rotating'))
    ? t('hero.rotating')
    : [
        "your apps",
        "your websites",
        "your processes",
        "your workflows",
        "your operations",
      ];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setTextIndex((i) => (i + 1) % rotatingTexts.length),
      2000
    );
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: { y: "-100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  const [navbarHeight, setNavbarHeight] = useState(0);
  useEffect(() => {
    const navbarElement = document.querySelector('nav');
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);

  return (
    <>
      <section
        id="home"
        className={`
          font-['Exo_2']
          relative
          w-full
          h-screen
          mx-auto
          flex
          flex-col
          items-center
          justify-start
          bg-white 
          overflow-hidden
          text-center
          px-4
        `}
        style={{ paddingTop: navbarHeight ? `${navbarHeight + 20}px` : '90px' }}
      >
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.img
            id="site-logo"
            src="/logo.png"
            alt="ANU logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="
              w-1/2 xxs:w-5/12 xs:w-4/12 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[10%]
              h-auto
              mb-3 md:mb-4
            "
          />

          <div className="flex flex-col items-center w-full">
            {/* Block 1: "Simplify" + Rotating Text */}
            <div className={`my-2 md:my-3 flex flex-col ${lang === 'ar' ? 'items-end text-right' : 'items-center text-center'}`}>
              <InteractiveLetters
                text={t('hero.title')}
                // MODIFIED className HERE
                className={`flex flex-wrap justify-center text-6xl xxs:text-7xl xs:text-8xl sm:text-9xl md:text-[100px] lg:text-[120px] font-extrabold ${styles.heroHeadText || ''} leading-tight mb-1 md:mb-2`}
                maxDistance={600}
                maxTranslate={200}
                disableSplit={lang === 'ar'}
              />
              <div className="h-12 xxs:h-14 xs:h-16 sm:h-20 md:h-24 relative w-full max-w-lg overflow-hidden mt-1 md:mt-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={textIndex}
                    variants={variants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-x-0 flex justify-center text-3xl xxs:text-4xl xs:text-5xl sm:text-6xl font-bold text-blue-600"
                  >
                    {rotatingTexts[textIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Block 2: Subtext, CTA, and Odoo Partner Logo */}
            <div className="mt-2 md:mt-3 flex flex-col items-center">
              <InteractiveLetters
                text={t('hero.subtitle')}
                className={`text-sm xxs:text-base xs:text-lg md:text-xl ${styles.heroSubText || ''} text-taupe max-w-xl mb-6 md:mb-8 ${lang === 'ar' ? 'text-right' : 'text-center'}`}
                maxDistance={600}
                maxTranslate={200}
                disableSplit={lang === 'ar'}
              />

              <motion.a
                href="/#contact"
                className="inline-block px-8 py-3 md:px-10 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-lg transition text-base md:text-lg mb-4 md:mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {t('hero.cta')}
              </motion.a>

              <motion.img
                src={odooPartnerLogo}
                alt="Odoo Partner"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="
                  h-auto
                  w-1/2 xxs:w-2/5 xs:w-1/3 sm:w-1/4 md:w-1/5 lg:w-[20%] xl:w-[15%]
                  max-w-[200px] 
                "
              />
            </div>
          </div>
        </div>

        <div
          className="absolute xs:bottom-6 bottom-16 w-full
          flex justify-center items-center z-20"
        >
          <a href="#about">
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4
            border-french border-dim flex
            justify-center items-start p-2"
            >
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
