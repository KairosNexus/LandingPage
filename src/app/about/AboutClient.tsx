"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Globe2, Handshake, ShieldCheck, Target } from "lucide-react";
import { PiLinkedinLogo } from "react-icons/pi";
import { coFounders } from "@/components/layout/cofounders";
import { TrustSection } from "@/components/layout/trust-section";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import styles from "./about.module.css";

const principles = [
  { title: "Trust comes first.", description: "Identity checks and role-specific skill evidence help people make informed decisions, before the work begins.", icon: ShieldCheck },
  { title: "The right fit matters.", description: "Skills, availability, scope, and delivery expectations belong in the same conversation. We help bring them together.", icon: Target },
  { title: "Good work needs clarity.", description: "Protected conversations, clear terms, and agreed milestones give companies and professionals a shared starting point.", icon: Handshake },
];

export function AboutClient() {
  const scope = useRef<HTMLDivElement>(null);
  const { openRequestModal } = useBusinessInquiry();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-about-hero]", {
          y: 30, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 36, opacity: 0, duration: 0.8, ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      });
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-about-orbit]", {
          rotation: 35, y: -35, ease: "none",
          scrollTrigger: { trigger: "[data-about-intro]", start: "top top", end: "bottom top", scrub: 1 },
        });
        gsap.utils.toArray<HTMLElement>("[data-about-divider]").forEach((element) => {
          gsap.from(element, {
            scaleX: 0, transformOrigin: "left", ease: "none",
            scrollTrigger: { trigger: element, start: "top 95%", end: "top 65%", scrub: 0.6 },
          });
        });
      });
    }, scope);
    return () => { media.revert(); context.revert(); };
  }, []);

  return (
    <div ref={scope} className={styles.page}>
      <section className={`${styles.hero} ${styles.container}`} data-about-intro aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-about-hero>Our roots are in Africa. Our vision is global.</p>
          <h1 id="about-title" data-about-hero>Africa&apos;s talent.<br /><em>The world&apos;s opportunity.</em></h1>
          <p className={styles.summary} data-about-hero>Kairos is building a trusted path between ambitious companies and skilled African professionals. We are starting in Nigeria, growing across Africa, and working toward a future where geography does not limit potential.</p>
          <div className={styles.actions} data-about-hero>
            <a className={styles.secondary} href="#about-founders">Meet the founders <ArrowDown aria-hidden="true" /></a>
          </div>
          {/* <div className={styles.heroNote} data-about-hero><span /> Two perspectives. One shared mission.</div> */}
        </div>
        <div className={styles.heroVisual} data-about-hero>
          <div className={styles.orbit} data-about-orbit aria-hidden="true"><span /><span /></div>
          <div className={styles.visualTop}><span>Across borders. Beyond potential.</span><Globe2 aria-hidden="true" /></div>
          <div className={styles.visualHeadline}>Great people.<br /><em>Shared ambition.</em></div>
          <div className={styles.heroPhoto}>
            <Image src="/about-professional-male-hero.png" alt="Young Black male professional in a blue blazer working at a laptop" fill priority sizes="(max-width: 767px) 90vw, 560px" className={styles.heroPhotoImage} />
          </div>

        </div>
      </section>

      <nav className={`${styles.sectionNav} ${styles.container}`} aria-label="About page sections">
        <span>A closer look at Kairos</span>
        <div><a href="#about-mission">Our mission</a><a href="#about-principles">Our principles</a><a href="#about-founders">Our founders</a></div>
      </nav>

      <section id="about-mission" className={`${styles.mission} ${styles.container}`} aria-labelledby="mission-title">
        <div data-about-reveal><p className={styles.eyebrow}>01 / Our mission</p><h2 id="mission-title">Opening global opportunity<br /><em>to African talent.</em></h2></div>
        <div className={styles.missionCopy} data-about-reveal>
          <p>Talent is everywhere. Access is not-and hiring equivalent roles in the U.S. can be expensive. We started Kairos to help close both gaps, beginning in Nigeria.</p>
          <p>We bring companies and skilled African professionals together through human-led introductions, visible skill evidence, and clear expectations. Companies can save up to 70% compared with equivalent U.S. hiring costs. Nigeria is our starting point, Africa is our focus, and a more open global talent market is the future we are building toward.</p>
          <Link href="/how-it-works" className={styles.textLink}>See how Kairos works <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="about-principles" className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading} data-about-reveal><p className={styles.eyebrow}>02 / What guides us</p><h2 id="principles-title">Better connections.<br /><em>Stronger foundations.</em></h2><p>Our principles shape how we build, who we serve, and the experience we create on both sides.</p></div>
          <div className={styles.principleGrid}>
            {principles.map(({ title, description, icon: Icon }, index) => (
              <article className={styles.principle} key={title} data-about-reveal><div className={styles.cardTop}><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section id="about-founders" className={`${styles.founders} ${styles.container}`} aria-labelledby="founders-title">
        <div className={styles.founderIntro} data-about-reveal><p className={styles.eyebrow}>03 / The people behind Kairos</p><h2 id="founders-title">We’ve lived<br /><em>both sides.</em></h2><p>Jubelo has lived the founder side, building a $105,000 business at 17. Ayorinde has lived the talent side, working remotely for U.S. companies from Nigeria. Together, they understand both the founders Kairos serves and the talent it creates opportunities for.</p></div>
        <div className={styles.founderList}>
          {coFounders.map((founder) => (
            <article className={styles.founder} key={founder.name}>
              <div className={styles.divider} data-about-divider />
              <div className={styles.founderHeader} data-about-reveal>
                <div className={styles.founderImage}><Image src={founder.image} alt={founder.name} fill sizes="(max-width: 600px) 112px, 160px" /></div>
                <div><p className={styles.eyebrow}>{founder.role}</p><h3>{founder.name}</h3><div className={styles.socials}>
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on LinkedIn`}><PiLinkedinLogo aria-hidden="true" /></a>
                  {founder.website && <a href={founder.website} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} website`}><Globe2 aria-hidden="true" /></a>}
                  {founder.twitter && <a href={founder.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on X`}><ArrowUpRight aria-hidden="true" /></a>}
                </div></div>
              </div>
              <div className={styles.bio}>{founder.bio.split("\n\n").map((paragraph) => <p key={paragraph} data-about-reveal>{paragraph}</p>)}</div>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.credibility} data-about-reveal><TrustSection /></div>

      <section className={`${styles.ctaWrap} ${styles.container}`} aria-labelledby="about-cta-title">
        <div className={styles.cta} data-about-reveal><div><p className={styles.eyebrow}>Your next chapter</p><h2 id="about-cta-title">Let’s build<br /><em>what comes next.</em></h2><p>A stronger team. A new opportunity. A shared starting point.</p></div><div className={styles.ctaActions}><button type="button" onClick={openRequestModal} className={styles.primary}>Find talent <ArrowUpRight aria-hidden="true" /></button><a href={getAppSignupUrl("talent")} className={styles.secondary}>Create your talent profile <ArrowUpRight aria-hidden="true" /></a></div></div>
      </section>
    </div>
  );
}
