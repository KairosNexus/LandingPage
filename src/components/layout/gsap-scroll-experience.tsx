"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapScrollExperience({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const listenerCleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
        hero
          .fromTo(".product-hero .product-eyebrow", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45 })
          .fromTo(".product-hero h1", { autoAlpha: 0, y: 42, clipPath: "inset(0 0 100% 0)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.82 }, "-=0.18")
          .fromTo(".product-hero-summary", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.38")
          .fromTo(".product-hero-actions", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.3")
          .fromTo(".product-hero-aside", { autoAlpha: 0, x: 22 }, { autoAlpha: 1, x: 0, duration: 0.52 }, "-=0.38")
          .fromTo(".product-hero-preview", { autoAlpha: 0, y: 38, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.72 }, "-=0.18")
          .fromTo(".product-trust-row", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.28");

        gsap.to(".product-hero-preview", {
          y: -14,
          ease: "none",
          scrollTrigger: { trigger: ".product-hero", start: "top top", end: "bottom top", scrub: 1.1 },
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 34 }, {
            autoAlpha: 1, y: 0, duration: 0.58, ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-product-frame]")
          .filter((frame) => !frame.closest("[data-stack-section]") && !frame.closest(".product-hero-preview"))
          .forEach((frame) => {
            gsap.fromTo(frame, { autoAlpha: 0, y: 28, scale: 0.985 }, {
              autoAlpha: 1, y: 0, scale: 1, duration: 0.68, ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: { trigger: frame, start: "top 88%", once: true },
            });
          });
      });

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.querySelector<HTMLElement>("[data-stack-section]");
        const panels = gsap.utils.toArray<HTMLElement>("[data-stack-panel]");
        const progress = root.querySelector<HTMLElement>("[data-stack-progress]");
        const count = root.querySelector<HTMLElement>("[data-stack-count]");
        if (!section || panels.length === 0) return;
        root.dataset.stack = "ready";

        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(panels, { position: "absolute", inset: 0 });
        panels.forEach((panel, index) => gsap.set(panel, { zIndex: index + 1 }));
        gsap.set(panels.slice(1), { yPercent: 100, clipPath: "inset(8% 0 0 0 round 28px 28px 0 0)" });

        const stackTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${(panels.length - 1) * window.innerHeight * 0.92}`,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(progress, { scaleX: self.progress });
              const active = Math.min(panels.length, Math.round(self.progress * (panels.length - 1)) + 1);
              if (count) count.textContent = `${String(active).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
            },
          },
        });

        panels.slice(1).forEach((panel, index) => {
          const previous = panels[index];
          const copy = panel.querySelector<HTMLElement>("[data-stack-copy]");
          const frame = panel.querySelector<HTMLElement>("[data-product-frame]");
          const position = index;
          stackTimeline
            .to(previous, { scale: 0.955, autoAlpha: 0.28, duration: 0.48, ease: "power1.inOut" }, position)
            .to(panel, { yPercent: 0, clipPath: "inset(0% 0 0 0 round 0px)", duration: 1, ease: "power2.inOut" }, position);
          if (copy) stackTimeline.fromTo(copy, { autoAlpha: 0, x: 42 }, { autoAlpha: 1, x: 0, duration: 0.55, ease: "power2.out" }, position + 0.34);
          if (frame) stackTimeline.fromTo(frame, { autoAlpha: 0.38, y: 28, scale: 0.965 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.62, ease: "power2.out" }, position + 0.28);
        });

        return () => { delete root.dataset.stack; };
      });

      media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const heroSection = root.querySelector<HTMLElement>(".product-hero");
        const particleField = root.querySelector<HTMLElement>(".product-hero-particles");
        const cursorGlow = root.querySelector<HTMLElement>(".product-hero-cursor-glow");
        if (heroSection && particleField) {
          const fieldX = gsap.quickTo(particleField, "x", { duration: 1.1, ease: "power3.out" });
          const fieldY = gsap.quickTo(particleField, "y", { duration: 1.1, ease: "power3.out" });
          const trackPointer = (event: PointerEvent) => {
            const bounds = heroSection.getBoundingClientRect();
            fieldX(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
            fieldY(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
          };
          const resetField = () => { fieldX(0); fieldY(0); };
          heroSection.addEventListener("pointermove", trackPointer);
          heroSection.addEventListener("pointerleave", resetField);
          listenerCleanups.push(() => {
            heroSection.removeEventListener("pointermove", trackPointer);
            heroSection.removeEventListener("pointerleave", resetField);
          });
        }

        if (heroSection && cursorGlow) {
          const glowX = gsap.quickTo(cursorGlow, "x", { duration: 1.18, ease: "power3.out" });
          const glowY = gsap.quickTo(cursorGlow, "y", { duration: 1.18, ease: "power3.out" });
          let inactivityTimer: number | undefined;
          let isGlowing = false;
          const positionGlow = (event: PointerEvent) => {
            const bounds = heroSection.getBoundingClientRect();
            glowX(event.clientX - bounds.left - cursorGlow.offsetWidth / 2);
            glowY(event.clientY - bounds.top - cursorGlow.offsetHeight / 2);
            if (!isGlowing) {
              isGlowing = true;
              gsap.to(cursorGlow, {
                opacity: 0.82,
                scale: 1.04,
                duration: 1.3,
                ease: "sine.out",
                overwrite: "auto",
              });
            }
            if (inactivityTimer) window.clearTimeout(inactivityTimer);
            inactivityTimer = window.setTimeout(() => {
              isGlowing = false;
              gsap.to(cursorGlow, {
                opacity: 0,
                scale: 0.68,
                duration: 1.65,
                ease: "sine.inOut",
                overwrite: "auto",
              });
            }, 780);
          };
          const hideGlow = () => {
            if (inactivityTimer) window.clearTimeout(inactivityTimer);
            isGlowing = false;
            gsap.to(cursorGlow, {
              opacity: 0,
              scale: 0.68,
              duration: 1.4,
              ease: "sine.inOut",
              overwrite: "auto",
            });
          };
          gsap.set(cursorGlow, {
            x: heroSection.clientWidth * 0.18 - cursorGlow.offsetWidth / 2,
            y: heroSection.clientHeight * 0.34 - cursorGlow.offsetHeight / 2,
            opacity: 0,
            scale: 0.58,
          });
          heroSection.addEventListener("pointermove", positionGlow);
          heroSection.addEventListener("pointerleave", hideGlow);
          listenerCleanups.push(() => {
            if (inactivityTimer) window.clearTimeout(inactivityTimer);
            heroSection.removeEventListener("pointermove", positionGlow);
            heroSection.removeEventListener("pointerleave", hideGlow);
          });
        }

        const heroFrame = root.querySelector<HTMLElement>(".product-hero-preview > .product-preview");
        if (heroFrame) {
          gsap.set(heroFrame, { transformPerspective: 1100, transformOrigin: "center" });
          const rotateX = gsap.quickTo(heroFrame, "rotationX", { duration: 0.45, ease: "power3.out" });
          const rotateY = gsap.quickTo(heroFrame, "rotationY", { duration: 0.45, ease: "power3.out" });
          const moveFrame = (event: PointerEvent) => {
            const bounds = heroFrame.getBoundingClientRect();
            rotateX(((event.clientY - bounds.top) / bounds.height - 0.5) * -3);
            rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 3);
          };
          const resetFrame = () => { rotateX(0); rotateY(0); };
          heroFrame.addEventListener("pointermove", moveFrame);
          heroFrame.addEventListener("pointerleave", resetFrame);
          listenerCleanups.push(() => {
            heroFrame.removeEventListener("pointermove", moveFrame);
            heroFrame.removeEventListener("pointerleave", resetFrame);
          });
        }

        gsap.utils.toArray<HTMLElement>(".product-button").forEach((button) => {
          const moveX = gsap.quickTo(button, "x", { duration: 0.32, ease: "power3.out" });
          const moveY = gsap.quickTo(button, "y", { duration: 0.32, ease: "power3.out" });
          const magnetize = (event: PointerEvent) => {
            const bounds = button.getBoundingClientRect();
            moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
            moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
          };
          const release = () => { moveX(0); moveY(0); };
          button.addEventListener("pointermove", magnetize);
          button.addEventListener("pointerleave", release);
          listenerCleanups.push(() => {
            button.removeEventListener("pointermove", magnetize);
            button.removeEventListener("pointerleave", release);
          });
        });
      });
    }, root);

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refresh);
      listenerCleanups.forEach((cleanup) => cleanup());
      media.revert();
      context.revert();
    };
  }, []);

  return <div ref={scope}>{children}</div>;
}
