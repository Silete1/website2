// src/components/other/Cursor.jsx
import { useEffect, useRef } from "react";

// --- SVG Configuration ---
const cursorSVGWidth = '28';
const cursorSVGHeight = '28';
const cursorFillColor = '%233b82f6'; // Blue color

const cursorSvgString = `<svg xmlns='http://www.w3.org/2000/svg' width='${cursorSVGWidth}' height='${cursorSVGHeight}' viewBox='0 0 190 213' preserveAspectRatio='xMidYMid meet'><g transform='translate(0,213) scale(0.1,-0.1)' fill='${cursorFillColor}'><path d='M907 1792 l-119 -119 35 -46 c49 -64 62 -108 62 -209 0 -67 -4 -91 -16 -104 -15 -14 -19 -14 -45 -1 -127 65 -340 82 -484 38 -93 -28 -191 -80 -250 -130 l-45 -39 120 -120 119 -119 44 33 c60 47 136 67 233 62 43 -2 83 -8 89 -14 8 -8 5 -24 -9 -58 -55 -128 -72 -278 -47 -406 21 -103 88 -247 144 -310 l41 -45 119 119 120 119 -34 44 c-42 55 -64 129 -63 207 2 115 18 132 86 97 111 -56 298 -70 436 -32 96 26 173 64 255 126 l64 48 -120 120 -121 120 -33 -25 c-78 -59 -164 -83 -260 -73 -85 10 -92 19 -63 82 105 225 63 525 -98 707 l-42 47 -118 -119z'/></g></svg>`;

let encodedCursorSvg = cursorSvgString
  .replace(/\s+/g, " ")
  .replace(/"/g, "'")
  .replace(/</g, "%3C")
  .replace(/>/g, "%3E")
  .replace(/#/g, "%23")
  .replace(/&/g, "%26")
  .replace(/\?/g, "%3F");

const cursorDataUri = `data:image/svg+xml;charset=utf-8,${encodedCursorSvg}`;

export default function Cursor() {
  const lastTrailTime = useRef(0);

  useEffect(() => {
    const hotspotX = parseInt(cursorSVGWidth) / 2;
    const hotspotY = parseInt(cursorSVGHeight) / 2;
    document.body.style.cursor = `url("${cursorDataUri}") ${hotspotX} ${hotspotY}, auto`;

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastTrailTime.current < 30) return;
      lastTrailTime.current = now;

      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.width = "20px";
      dot.style.height = "20px";
      dot.style.backgroundImage = `url("${cursorDataUri}")`;
      dot.style.backgroundSize = "contain";
      dot.style.backgroundRepeat = "no-repeat";
      dot.style.pointerEvents = "none";
      dot.style.transform = "translate(-50%, -50%)";
      dot.style.opacity = "0.7"; // Initial state
      dot.style.zIndex = "9998";
      dot.style.willChange = 'opacity, transform'; // Hint

      document.body.appendChild(dot);

      // Set transition property AFTER initial styles are applied and element is in DOM
      // and BEFORE triggering the transition with rAF or setTimeout.
      dot.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      
      // Force a reflow to ensure initial styles are applied
      void dot.offsetHeight; 

      // Trigger the animation in the next frame
      requestAnimationFrame(() => {
      // Using a nested requestAnimationFrame or a very short setTimeout
      // can sometimes be more reliable for triggering transitions.
        requestAnimationFrame(() => {
          if (document.body.contains(dot)) {
            dot.style.opacity = "0";
            dot.style.transform = "translate(-50%, -50%) scale(1.3)";
          }
        });
      });

      let cleanedUp = false;
      const onTransitionEnd = () => {
        if (cleanedUp) return;
        cleanedUp = true;
        if (document.body.contains(dot)) {
          document.body.removeChild(dot);
        }
        dot.removeEventListener("transitionend", onTransitionEnd);
      };
      dot.addEventListener("transitionend", onTransitionEnd);

      setTimeout(() => {
        onTransitionEnd();
      }, 550);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "";
      const currentDots = document.querySelectorAll('div[style*="z-index: 9998"]');
      currentDots.forEach(dot => {
        if (document.body.contains(dot)) {
          document.body.removeChild(dot);
        }
      });
    };
  }, []);

  return null;
}