import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
// Import your anuNavbarLogo and other necessary assets
import { close, menu, anuNavbarLogo } from '../assets';
import { useI18n } from '../i18n.jsx';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    if (location.pathname === '/blog') {
      setActive('blog');
      return;
    }

    if (location.hash) {
      const matchingHash = navLinks.find(
        (nav) => nav.type === 'hash' && nav.path === `/${location.hash}`
      );

      if (matchingHash) {
        setActive(matchingHash.id);
        return;
      }
    }

    if (location.pathname === '/') {
      setActive('');
    }
  }, [location]);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-2 fixed
      top-0 z-20 bg-flashWhite shadow sm:opacity-[0.9] xxs:h-[12vh]`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2" // The gap-2 will ensure space if you add text later
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={anuNavbarLogo}
            alt="Anu Logo"
            // Adjusted size:
            // Base: h-[40px] w-auto (let width adjust, or set a specific base width)
            // sm: h-[55px]
            // md: h-[60px]
            // You might want the width to be auto or set a specific aspect ratio if your logo isn't square
            // For a logo that should generally fill more of the navbar height:
            // Simpler, more common approach with fixed but responsive sizes:
            // className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain" // Example: h-10 is 2.5rem or 40px
                                                                           // Adjust these values (h-10, sm:h-12 etc.)
                                                                           // to what looks best for your logo's aspect ratio
                                                                           // and the navbar height.
            // Let's try specific pixel values that are responsive:
            // Original: "sm:w-[50px] sm:h-[50px] w-[45px] h-[45px] object-contain"
            // New, larger values:
            // className="w-auto h-[40px] sm:h-[55px] md:h-[60px] object-contain"
            // Or to make it take more width as well if it's not a square logo:
            className="h-[40px] w-[120px] sm:h-[55px] sm:w-[150px] md:h-[60px] md:w-[180px] object-contain"
            // ^^ The line above assumes your logo is wide. If it's square or tall, focus on height.
            // Let's assume a more general approach to make it "bigger" to fit the bar:
            // The navbar has py-2 (0.5rem padding top/bottom = 1rem total vertical padding)
            // and xxs:h-[12vh].
            // If 12vh is ~70px on a small mobile, minus 16px padding = 54px available.
            // If 12vh is ~85px on a larger mobile, minus 16px padding = 69px available.
            // So, let's try heights like this:
            // className="h-[50px] sm:h-[65px] w-auto object-contain" // w-auto will preserve aspect ratio
          />
          {/* No text next to logo as per your request */}
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? 'text-french' : 'text-eerieBlack'
              } hover:text-taupe text-[21px] font-medium font-mova
                uppercase tracking-[3px] cursor-pointer nav-links`}
              onClick={() => setActive(nav.id)}
            >
              <Link to={nav.path}>{t(`nav.${nav.id}`) || nav.title}</Link>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`text-[14px] font-semibold px-2 py-1 rounded ${
                lang === 'ar' ? 'bg-french text-white' : 'text-eerieBlack'
              }`}
            >
              AR
            </button>
            <span className="text-taupe text-sm">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`text-[14px] font-semibold px-2 py-1 rounded ${
                lang === 'en' ? 'bg-french text-white' : 'text-eerieBlack'
              }`}
            >
              EN
            </button>
          </li>
        </ul>

        {/* mobile menu */}
        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">
          {toggle ? (
            <div
              className={`p-6 bg-flashWhite opacity-[0.98] absolute
                top-0 left-0 w-screen h-[100vh] z-10 menu ${
                  toggle ? 'menu-open' : 'menu-close'
                }`}
            >
              <div className="flex justify-end">
                <img
                  src={close}
                  alt="close"
                  className="w-[22px] h-[22px] object-contain cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                />
              </div>
              <ul
                className="list-none flex flex-col -gap-[1rem]
                items-start justify-end mt-[10rem] -ml-[35px]"
              >
                {navLinks.map((nav) => (
                  <li
                    id={nav.id}
                    key={nav.id}
                    className={`${
                      active === nav.id ? 'text-french' : 'text-eerieBlack'
                    } text-[88px] font-bold font-arenq
                      uppercase tracking-[1px] cursor-pointer`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.id);
                    }}
                  >
                    <Link to={nav.path}>{t(`nav.${nav.id}`) || nav.title}</Link>
                  </li>
                ))}
                <li className="mt-6 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setLang('ar')}
                    className={`text-[24px] font-semibold px-3 py-2 rounded ${
                      lang === 'ar' ? 'bg-french text-white' : 'text-eerieBlack'
                    }`}
                  >
                    AR
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`text-[24px] font-semibold px-3 py-2 rounded ${
                      lang === 'en' ? 'bg-french text-white' : 'text-eerieBlack'
                    }`}
                  >
                    EN
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <img
              src={menu}
              alt="menu"
              className="w-[34px] h-[34px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
