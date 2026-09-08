"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import styles from "../reviews/reviews.module.css";

export const reviews = [
  {
    id: "kairos-talent-client-success",
    name: "Emmanuel Raimi",
    company: "Developer",
    service: "Client placement",
    date: "Recent",
    initials: "ER",
    image: "https://res.cloudinary.com/dt4apbzc6/image/upload/v1788795749/app_uploads/profile_pics/1788795749591_873184.jpg",
    quote:
      "I thank Kairos Nexus for helping me secure a client, maximize the value of my time, and get well paid for it.",
  },

  {
    id: "velma-funebe",
    name: "Velma Funebe",
    company: "iBraid",
    service: "Branding project",
    date: "19 May",
    initials: "VF",
    image: null,
    quote:
      "Thank you again for all of the work and support throughout the iBraid branding project. I really appreciate the collaboration and everything Emmanuel and the team contributed to bringing the vision to life.",
  },
  {
    id: "kenya-pope",
    name: "Kenya Pope",
    company: "Kenya Pope Coaching",
    service: "Social media strategy",
    date: "7 April",
    initials: "KP",
    image: null,
    quote:
      "Thank you for checking in with me. We have been able to make strides in social media content posting and boosted engagement—all pluses. As I continue to strategize, my goal is to increase inquiries for coaching services so I can convert clients.",
  },
] as const;

export function ReviewsClient() {
  const scope = useRef<HTMLDivElement>(null);
  const { openRequestModal } = useBusinessInquiry();
  const [featured, ...clientReviews] = reviews;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-review-hero]", {
          y: 28, opacity: 0, duration: 0.8, stagger: 0.12,
          ease: "power3.out", clearProps: "transform,opacity",
        });
        gsap.utils.toArray<HTMLElement>("[data-review-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 32, opacity: 0, duration: 0.75, ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      });
    }, scope);
    return () => { media.revert(); context.revert(); };
  }, []);

  return (
    <div ref={scope} className={styles.page}>
      <section className={`${styles.hero} ${styles.container}`} aria-labelledby="reviews-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-review-hero>Voices of Kairos / Reviews</p>
          <h1 id="reviews-title" data-review-hero>Good work.<br />Real people.<br /><em>Their words.</em></h1>
          <p className={styles.summary} data-review-hero>Behind every project is a person with a goal. Hear from the talent and companies moving forward with Kairos.</p>
          <a className={styles.primary} href="#reviews" data-review-hero>Read their experiences <ArrowDown aria-hidden="true" /></a>

        </div>
        <div className={styles.heroVisual} data-review-hero>
          <div className={styles.photo}>
            <Image src="/professional-hero.png" alt="Black professional working at a laptop in a bright office" fill priority sizes="(max-width: 767px) 90vw, 640px" />
          </div>
          <div className={styles.photoCaption}><span>People at the heart<br /><strong>of every opportunity.</strong></span><ArrowUpRight aria-hidden="true" /></div>
        </div>
      </section>

      <section id="reviews" className={`${styles.stories} ${styles.container}`} aria-labelledby="stories-title">
        <div className={styles.sectionHeading} data-review-reveal>
          <div><p className={styles.eyebrow}>Shared experiences</p><h2 id="stories-title">Different journeys.<br /><em>Meaningful connections.</em></h2></div>

        </div>

        <article id={featured.id} className={styles.featured} data-review-reveal aria-labelledby="featured-author">
          <div className={styles.featuredLabel}><span>Talent perspective</span><Quote aria-hidden="true" /></div>
          <div>
            <blockquote>“{featured.quote}”</blockquote>
            <div className={styles.author}>
              <span className={styles.avatar}>
                {featured.image ? (
                  <Image src={featured.image} alt="Emmanuel Raimi" width={48} height={48} />
                ) : (
                  <span aria-hidden="true">{featured.initials}</span>
                )}
              </span>
              <div><h3 id="featured-author">{featured.name}</h3><p>{featured.company} · {featured.service}</p></div>
            </div>
          </div>
        </article>

        <div className={styles.reviewGrid}>
          {clientReviews.map((review) => (
            <article key={review.id} id={review.id} className={styles.reviewCard} data-review-reveal aria-labelledby={`${review.id}-author`}>
              <div className={styles.cardHeading}><span>{review.service}</span><Quote aria-hidden="true" /></div>
              <blockquote>“{review.quote}”</blockquote>
              <div className={styles.author}>
                <span className={styles.avatar}>
                  {review.image ? <Image src={review.image} alt={review.name} width={48} height={48} /> : <span aria-hidden="true">{review.initials}</span>}
                </span>
                <div><h3 id={`${review.id}-author`}>{review.name}</h3><p>{review.company}</p></div>
              </div>
              <div className={styles.cardFooter}><span>Client perspective</span><span>Received {review.date}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.ctaWrap} ${styles.container}`} aria-labelledby="reviews-cta-title">
        <div className={styles.cta} data-review-reveal>
          <div><p className={styles.eyebrow}>Your next chapter</p><h2 id="reviews-cta-title">What could we<br /><em>build together?</em></h2><p>Find the people or the opportunity to move your next idea forward.</p></div>
          <div className={styles.ctaActions}><button className={styles.primary} type="button" onClick={openRequestModal}>Find talent <ArrowUpRight aria-hidden="true" /></button><a className={styles.secondary} href={getAppSignupUrl("talent")}>Explore as talent <ArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </section>
    </div>
  );
}
