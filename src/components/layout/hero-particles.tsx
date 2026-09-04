"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

async function initializeParticles(engine: Engine) {
  await loadSlim(engine);
}

function HeroParticleCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<Container | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduceMotion) container.play();
        else container.pause();
      },
      { threshold: 0.04 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [ready, reduceMotion]);

  const particlesLoaded = useCallback(async (container?: Container) => {
    containerRef.current = container;
    setReady(Boolean(container));
    if (reduceMotion) container?.pause();
  }, [reduceMotion]);

  const options = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    detectRetina: true,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: false, mode: [] },
        onHover: { enable: !reduceMotion, mode: ["bubble", "repulse"] },
        resize: { enable: true },
      },
      modes: {
        bubble: { distance: 130, duration: 0.8, opacity: 0.82, size: 4.4 },
        repulse: { distance: 54, duration: 0.7, factor: 10, speed: 0.35, maxSpeed: 2 },
      },
    },
    particles: {
      color: { value: dark ? ["#FEC2E8", "#DE028E", "#F5F5F2"] : ["#DE028E", "#C00079", "#FEC2E8"] },
      links: { enable: false },
      move: {
        enable: !reduceMotion,
        direction: "none",
        outModes: { default: "out" },
        random: true,
        speed: { min: 0.12, max: 0.32 },
        straight: false,
      },
      number: {
        density: { enable: true, width: 1400, height: 900 },
        value: 54,
      },
      opacity: {
        value: { min: 0.14, max: dark ? 0.56 : 0.42 },
        animation: { enable: !reduceMotion, speed: 0.28, sync: false },
      },
      shadow: { enable: true, color: dark ? "#FEC2E8" : "#DE028E", blur: 9 },
      shape: { type: "circle" },
      size: {
        value: { min: 0.8, max: 2.5 },
        animation: { enable: !reduceMotion, speed: 0.45, sync: false },
      },
    },
    responsive: [
      {
        maxWidth: 767,
        options: {
          fpsLimit: 40,
          interactivity: { events: { onHover: { enable: false, mode: [] } } },
          particles: { number: { value: 22 }, move: { speed: { min: 0.08, max: 0.18 } } },
        },
      },
    ],
  }), [dark, reduceMotion]);

  return (
    <div ref={wrapperRef} className="product-hero-particles" aria-hidden="true">
      {!reduceMotion && <Particles id="kairos-hero-particles" options={options} particlesLoaded={particlesLoaded} />}
    </div>
  );
}

export function HeroParticles() {
  return (
    <ParticlesProvider init={initializeParticles}>
      <HeroParticleCanvas />
    </ParticlesProvider>
  );
}
