import React, { useRef, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export const InteractiveLetters = ({
  text,
  className = "",
  maxDistance = 600,
  maxTranslate = 200,
  disableSplit = false,
}) => {
  const containerRef = useRef(null);
  const letterSpanElements = useRef([]); // To store references to individual letter spans
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef();
  const animationState = useRef({
    scatterTimeout: null,
    homeTimeout: null,
    isAnimating: false,
  });

  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Collect all individual letter <span> elements
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    // Select only the innermost spans that contain actual letters or whole words (when disableSplit)
    letterSpanElements.current = Array.from(
      disableSplit ? c.querySelectorAll(".iword") : c.querySelectorAll("span > span")
    );
  }, [text, inView]); // Rerun if text changes or view status changes

  const resetAllLetters = useCallback(() => {
    letterSpanElements.current.forEach((el) => {
      if (el) {
        el.style.transition = "none";
        el.style.transform = "";
        void el.offsetWidth; // Force reflow
      }
    });
  }, []);

  const cleanupAnimations = useCallback(() => {
    if (animationState.current.scatterTimeout) {
      clearTimeout(animationState.current.scatterTimeout);
      animationState.current.scatterTimeout = null;
    }
    if (animationState.current.homeTimeout) {
      clearTimeout(animationState.current.homeTimeout);
      animationState.current.homeTimeout = null;
    }
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = undefined;
    }
    animationState.current.isAnimating = false;
  }, []);

  useEffect(() => {
    if (!inView) {
      cleanupAnimations();
      resetAllLetters();
      return;
    }

    const lettersToAnimate = letterSpanElements.current;
    if (!lettersToAnimate.length) return;

    const scatterDur = 800;
    const scatterDelayRange = 500;
    const homeDur = 600;

    animationState.current.isAnimating = true;

    lettersToAnimate.forEach((el) => {
      if (!el) return;
      const randX = (Math.random() - 0.5) * maxDistance * 1.5;
      const randY = (Math.random() - 0.5) * maxDistance * 1.5;
      const delay = Math.random() * scatterDelayRange;
      el.style.transition = `transform ${scatterDur}ms cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}ms`;
      el.style.transform = `translate(${randX}px, ${randY}px)`;
    });

    const maxTotalScatterTime = scatterDur + scatterDelayRange;

    animationState.current.homeTimeout = setTimeout(() => {
      if (!containerRef.current || !inView) return;
      lettersToAnimate.forEach((el) => {
        if (!el) return;
        el.style.transition = `transform ${homeDur}ms cubic-bezier(0.23, 1, 0.32, 1)`;
        el.style.transform = "";
      });

      animationState.current.scatterTimeout = setTimeout(() => {
        if (!containerRef.current || !inView) return;
        lettersToAnimate.forEach((el) => {
          if (!el) return;
          el.style.transition = "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        });
        animationState.current.isAnimating = false;
      }, homeDur);
    }, maxTotalScatterTime);

    return () => {
      cleanupAnimations();
    };
  }, [inView, text, maxDistance, cleanupAnimations, resetAllLetters]);

  const setRef = useCallback(
    (el) => {
      containerRef.current = el;
      inViewRef(el);
    },
    [inViewRef]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (animationState.current.isAnimating && !inView) {
        cleanupAnimations();
        resetAllLetters();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inView, cleanupAnimations, resetAllLetters]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c || !inView) return;

    const onMove = (e) => {
      if (animationState.current.isAnimating) return;
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const { x: mx, y: my } = pointer.current;
          letterSpanElements.current.forEach((el) => {
            if (!el) return;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = mx - cx;
            const dy = my - cy;
            const dist = Math.hypot(dx, dy);

            if (dist < maxDistance) {
              const force = (1 - dist / maxDistance) * maxTranslate;
              const angle = Math.atan2(dy, dx);
              const tx = -Math.cos(angle) * force;
              const ty = -Math.sin(angle) * force;
              el.style.transform = `translate(${tx}px, ${ty}px)`;
            } else {
              el.style.transform = "";
            }
          });
          frame.current = undefined;
        });
      }
    };

    const onLeave = () => {
      if (animationState.current.isAnimating) return;
      letterSpanElements.current.forEach((el) => {
        if (el) el.style.transform = "";
      });
    };

    c.addEventListener("mousemove", onMove);
    c.addEventListener("mouseleave", onLeave);
    return () => {
      c.removeEventListener("mousemove", onMove);
      c.removeEventListener("mouseleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [maxDistance, maxTranslate, inView, animationState.current.isAnimating]);

  useEffect(() => {
    return () => {
      cleanupAnimations();
    };
  }, [cleanupAnimations]);

  return (
    <div
      ref={setRef}
      className={`inline whitespace-pre-wrap ${className}`} // Changed to 'inline' for container if it better suits flow with 'inline-block' words
      aria-label={text}
    >
      {text.split(/(\s+)/).map((segment, segmentIndex) => {
        if (segment.match(/^\s+$/)) { // Check if the segment is purely whitespace
          return (
            <React.Fragment key={`space-${segmentIndex}`}>
              {/* Replace multiple spaces with non-breaking spaces to preserve them */}
              {segment.replace(/ /g, "\u00A0")}
            </React.Fragment>
          );
        }
        // It's a word
        if (disableSplit) {
          return (
            <span key={`word-${segmentIndex}`} className="inline-block iword">
              {segment}
            </span>
          );
        }
        return (
          <span key={`word-${segmentIndex}`} className="inline-block"> {/* Word wrapper */}
            {Array.from(segment).map((ch, letterIndex) => (
              <span
                key={letterIndex}
                className="inline-block" // Individual letters are inline-block
                aria-hidden="true"
              >
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
};
