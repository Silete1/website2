// src/components/Services.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { anuCompanyServices } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { InteractiveLetters } from './other/InteractiveLetters';

const ServiceDisplayCard = ({
  id,
  name,
  description,
  image,
  index,
  active,
  handleClick,
}) => {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] 
      h-[420px] cursor-pointer card-shadow`}
      onClick={() => handleClick(id)}>
      <div
        className="absolute top-0 left-0 z-10 bg-jetLight 
      h-full w-full opacity-[0.5] rounded-[24px]"></div>

      <img
        src={image}
        alt={name}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />

      {active !== id ? (
        <div className="flex items-center justify-start pr-[4.5rem]">
          <h3
            className="font-extrabold font-beckman uppercase w-[200px] h-[30px] 
            whitespace-nowrap sm:text-[27px] text-[18px] text-timberWolf tracking-[1px]
            absolute z-0 lg:bottom-[7rem] lg:rotate-[-90deg] lg:origin-[0,0]
            leading-none z-20"
          >
            {name}
          </h3>
        </div>
      ) : (
        <>
          <div
            className="absolute bottom-0 p-8 justify-start w-full 
            flex-col bg-[rgba(122,122,122,0.5)] rounded-b-[24px] z-20">
            <h2
              className="font-bold sm:text-[32px] text-[24px] 
              text-timberWolf uppercase font-beckman sm:mt-0 -mt-[1rem]">
              {name}
            </h2>
            <p
              className="text-silver sm:text-[14px] text-[12px] 
              max-w-3xl sm:leading-[24px] leading-[18px]
              font-poppins tracking-[1px] mt-2">
              {description}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

const Services = () => {
  const [active, setActive] = useState(anuCompanyServices.length > 0 ? anuCompanyServices[0].id : '');
  const introParagraph = "We provide a range of expert services designed to optimize your business processes and drive innovation. Explore how our tailored solutions in enterprise architecture, ERP implementation, intelligent automation, and custom application development can transform your operations and empower your success.";

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadTextLight}`}>
           <InteractiveLetters text="Our Services." className={`${styles.sectionHeadTextLight} inline-block`} maxDistance={400} maxTranslate={50} />
        </h2>
      </motion.div>

      <div className="w-full flex">
        {/* Changed motion.p to motion.div to fix nesting warning */}
        <motion.div
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]" 
        >
          <InteractiveLetters text={introParagraph} className="text-taupe text-[18px] leading-[30px]" maxDistance={150} maxTranslate={15}/>
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
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Services, 'services');