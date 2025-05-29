import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import './Contact.css'; // Import the new CSS file

// Make sure to have this SVG or replace it with an equivalent
// For example, save it as public/assets/img/curved-arrow.svg
const curvedArrowSVG = '/assets/img/curved-arrow.svg';


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    user_subject: '',
    user_message: '',
  });
  const [loading, setLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    const remixiconLink = document.createElement('link');
    remixiconLink.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css';
    remixiconLink.rel = 'stylesheet';
    document.head.appendChild(remixiconLink);

    return () => {
      document.head.removeChild(remixiconLink);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setContactMessage('');

    emailjs
      .send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
        {
          user_name: form.user_name,
          user_email: form.user_email,
          user_subject: form.user_subject,
          user_message: form.user_message,
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setLoading(false);
          setContactMessage('Message sent successfully ✅');
          setForm({
            user_name: '',
            user_email: '',
            user_subject: '',
            user_message: '',
          });
          setTimeout(() => {
            setContactMessage('');
          }, 5000);
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS error:', error);
          setContactMessage('Message not sent (service error) ❌');
           setTimeout(() => {
            setContactMessage('');
          }, 5000);
        }
      );
  };

  return (
    <motion.div
      variants={slideIn('left', 'tween', 0.2, 1)}
      className="contact__container grid"
      id="contact-form-container"
    >
      <div className="contact__data">
        <h2 className="section__title-2">
          <span>Contact Us.</span>
        </h2>
        <p className="contact__description-1">
          We’d love to hear from you. Whether you’re ready to transform your business or
          just exploring ideas, our team is here to help.
        </p>
        {/* UPDATED: Added contact details here */}
        <div className="contact__info">
          <p className="contact__info-item">
            <i className="ri-map-pin-line"></i> 
            Iraq - Baghdad - Ali Al-Salih near the 14th of Ramdan Bridge
          </p>
          <p className="contact__info-item">
            <i className="ri-phone-line"></i>
            <a href="tel:+9647867007030">+964 786 700 7030</a>
          </p>
          <p className="contact__info-item">
            <i className="ri-mail-line"></i>
            <a href="mailto:info@anu.ltd">info@anu.ltd</a>
          </p>
        </div>
        <div className="geometric-box"></div>
      </div>

      <div className="contact__mail">
        <h2 className="contact__title">Send Us A Message</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="contact__form" id="contact-form-actual">
          <div className="contact__group">
            <div className="contact__box">
              <input
                type="text"
                name="user_name"
                className="contact__input"
                id="user_name"
                required
                placeholder="Name"
                value={form.user_name}
                onChange={handleChange}
              />
              <label htmlFor="user_name" className="contact__label">Name</label>
            </div>
            <div className="contact__box">
              <input
                type="email"
                name="user_email"
                className="contact__input"
                id="user_email"
                required
                placeholder="Email Address"
                value={form.user_email}
                onChange={handleChange}
              />
              <label htmlFor="user_email" className="contact__label">Email Address</label>
            </div>
          </div>
          <div className="contact__box">
            <input
              type="text"
              name="user_subject"
              className="contact__input"
              id="user_subject"
              required
              placeholder="Subject"
              value={form.user_subject}
              onChange={handleChange}
            />
            <label htmlFor="user_subject" className="contact__label">Subject</label>
          </div>
          <div className="contact__box contact__area">
            <textarea
              name="user_message"
              id="user_message"
              className="contact__input"
              required
              placeholder="Message"
              value={form.user_message}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="user_message" className="contact__label">Message</label>
          </div>
          {contactMessage && <p className="contact__message">{contactMessage}</p>}
          <button type="submit" className="contact__button button" disabled={loading}>
            <i className="ri-send-plane-line"></i> {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* UPDATED: Removed the contact__social section as per the request to put info in the white card */}
      {/* If you still want a social links section, you can re-add a modified version here */}
      {/* <div className="contact__social">
        <img src={curvedArrowSVG} alt="" className="contact__social-arrow" />
        <div className="contact__social-data">
          <div>
            <p className="contact__social-description-2">
              Find us on social media:
            </p>
          </div>
          <div className="contact__social-links">
             <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="contact__social-link">
               <i className="ri-linkedin-box-line"></i>
             </a>
          </div>
        </div>
      </div> 
      */}
    </motion.div>
  );
};

export default SectionWrapper(Contact, 'contact');