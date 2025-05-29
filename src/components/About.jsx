import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { aboutServices } from '../constants'; // Changed from 'services' to 'aboutServices'
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { InteractiveLetters } from './other/InteractiveLetters'; // Ensure this path is correct

const ServiceCard = ({ index, title, icon, description }) => {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className="w-full card-gradient p-[1px] rounded-[20px] shadow-card mb-10"
    >
      <div
        className="bg-jetLight rounded-[20px] py-8 px-6 min-h-[200px] flex flex-col justify-start items-start"
      >
        <div className="flex items-center mb-4">
          {icon && (
            <img src={icon} alt={title} className="w-12 h-12 object-contain mr-4" />
          )}
          <h3 className="text-white text-[20px] font-bold text-left">
            <InteractiveLetters
              text={title}
              className="font-bold" // Keep existing bold styling for title
              maxDistance={200}
              maxTranslate={20}
            />
          </h3>
        </div>
        {/* Applying InteractiveLetters to the description */}
        <InteractiveLetters
          text={description}
          className="text-taupe text-[17px] leading-[28px] text-left" // Apply original paragraph styling
          maxDistance={100} // More subtle effect for descriptions
          maxTranslate={10}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const anuDescription = `Anu Software Solutions is a tech company founded by Iraqi and international developers. We specialize in designing intelligent systems that streamline and enhance business operations across industries. Established in 2023, with our Iraq office launching in 2024, Anu combines global expertise with deep local insight. As an official Odoo Partner, we deliver tailored, process-driven software solutions that empower our clients to grow and innovate.`;

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>
          <InteractiveLetters
            text="Overview."
            className={`${styles.sectionHeadText} inline-block`} // Ensure it keeps heading styles and allows proper flow
            maxDistance={400}
            maxTranslate={50}
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
          className="text-taupe text-[18px] leading-[30px]" // Apply original paragraph styling
          maxDistance={150}
          maxTranslate={15}
        />
      </motion.div>

      <div className="mt-20 flex flex-col gap-10">
        {/* Changed from services.map to aboutServices.map */}
        {aboutServices.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');