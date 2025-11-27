// src/components/PreLoader.jsx
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
// DO NOT import the logo if it's in the public folder.

export default function PreLoader() {
  const [show, setShow] = useState(true);
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const animate = () => {
      const splash = logoRef.current;
      const target = document.getElementById("site-logo");

      if (!splash || !target) {
        gsap.to(wrapperRef.current, {
          autoAlpha: 0,
          duration: 0.5,
          onComplete() {
            document.body.style.overflow = "";
            setShow(false);
          },
        });
        return;
      }

      const fromRect = splash.getBoundingClientRect();
      const toRect = target.getBoundingClientRect();
      const dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2);
      const dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);
      const scaleAmt = toRect.width / fromRect.width;

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete() {
          setShow(false);
        },
      });

      tl
        .set(splash, { scale: 0, autoAlpha: 1 })
        .to(splash, { scale: 1, duration: 0.8 })
        .set("body", { css: { overflow: "" } }, "-=0.3")
        .call(() => {
          if (wrapperRef.current) {
            wrapperRef.current.style.pointerEvents = "none";
          }
        })
        .to(splash, { x: dx, y: dy, scale: scaleAmt, duration: 0.8 }, "+=0.1")
        .to(wrapperRef.current, { height: "0vh", autoAlpha: 0, duration: 0.6 }, "-=0.4")
        .set(wrapperRef.current, { display: "none" });
    };

    if (document.readyState === "complete") {
      setTimeout(animate, 100);
    } else {
      window.addEventListener("load", animate);
    }

    return () => {
      window.removeEventListener("load", animate);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={wrapperRef}
      className="preloader fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div ref={logoRef}>
        <img
          src="/logo.png" // Use a root-relative path to access files in 'public'
          alt="Anu Logo" // Or "Logo" as in your original
          style={{ width: '150px', height: '150px' }}
        />
      </div>
    </div>
  );
}