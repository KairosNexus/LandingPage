"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PiArrowRight,
  PiCheckCircle,
  PiCode,
  PiHeadset,
  PiMegaphone,
  PiPaintBrush,
  PiUser,
} from "react-icons/pi";
import { getPublicTalents, type PublicTalent } from "@/lib/api";
import { formatProfileLabel } from "@/lib/format-profile-label";

const capabilities = [
  {
    title: "Product and design",
    description:
      "UI/UX designers who turn ideas into clear, useful digital experiences, plus graphic designers who keep your brand consistent across every touchpoint.",
    icon: PiPaintBrush,
  },
  {
    title: "Engineering",
    description:
      "Frontend and backend developers who can build customer-facing products, internal tools, APIs, integrations, and the systems behind them.",
    icon: PiCode,
  },
  {
    title: "Marketing and growth",
    description:
      "Marketing professionals who help shape your message, reach the right audience, run campaigns, and turn attention into business growth.",
    icon: PiMegaphone,
  },
  {
    title: "Customer support",
    description:
      "Customer service professionals who help your users, resolve issues, protect trust, and give your team room to focus on the next stage of growth.",
    icon: PiHeadset,
  },
];

function selectDistinctRoles(talents: PublicTalent[]) {
  const roles = new Set<string>();
  const prioritized = [...talents].sort((a, b) => {
    const score = (talent: PublicTalent) =>
      (talent.profilePicture?.trim() ? 4 : 0) +
      (talent.user?.verifiedRoles?.length ? 2 : 0) +
      (talent.user?.isKycDone ? 1 : 0);
    return score(b) - score(a);
  });

  const selected = prioritized.filter((talent) => {
    const title = getTalentTitle(talent);
    const normalizedTitle = title.toLocaleLowerCase();
    if (roles.has(normalizedTitle)) return false;
    roles.add(normalizedTitle);
    return true;
  }).slice(0, 5);

  if (selected.length < 5) {
    const selectedIds = new Set(selected.map((talent) => talent.id));
    selected.push(...prioritized.filter((talent) => !selectedIds.has(talent.id)).slice(0, 5 - selected.length));
  }

  return selected;
}

function getTalentTitle(talent: PublicTalent) {
  const title = talent.jobTitles?.find((item) => item.trim()) || talent.jobRole;
  return formatProfileLabel(title) || "Professional";
}

function humanize(value?: string) {
  return formatProfileLabel(value);
}

function getInitials(talent: PublicTalent) {
  return `${talent.firstName?.[0] ?? ""}${talent.lastName?.[0] ?? ""}`.toUpperCase();
}

export function CompanyCapabilities() {
  const [talents, setTalents] = useState<PublicTalent[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getPublicTalents({ limit: 50 })
      .then((response) => {
        if (!cancelled) setTalents(selectDistinctRoles(response.data));
      })
      .catch((error) => {
        console.error("Failed to load public talent:", error);
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="product-capabilities" aria-labelledby="company-capabilities-title">
      <div className="product-capabilities-intro" data-reveal>
        <p className="product-eyebrow">Capabilities across your business</p>
        <h2 id="company-capabilities-title">
          The people behind your <span>next stage.</span>
        </h2>
        <p>
          From the first product idea to the customers who depend on it, Kairos
          helps you meet skilled professionals across the roles that keep a
          business moving.
        </p>
      </div>

      <div className="product-capability-grid">
        {capabilities.map((capability, index) => (
          <article key={capability.title} data-reveal>
            <div>
              <span>0{index + 1}</span>
              <capability.icon aria-hidden="true" />
            </div>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>
        ))}
      </div>

      <div className="product-verified-header" data-reveal>
        <div>
          <p className="product-eyebrow">Featured professionals</p>
          <h2>Meet talent ready to be <span>considered.</span></h2>
        </div>
        <Link href="/talents" className="product-button product-button-secondary">
          View more talent
          <PiArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="product-talent-grid" aria-live="polite">
        {loading &&
          Array.from({ length: 5 }, (_, index) => (
            <div className="product-talent-card is-loading" key={index} aria-hidden="true">
              <span />
              <i />
              <i />
            </div>
          ))}

        {!loading && talents.map((talent) => {
          const title = getTalentTitle(talent);
          const verifiedRole = humanize(talent.user?.verifiedRoles?.[0]);
          const badgeLabel = verifiedRole
            ? "Skill verified"
            : talent.user?.isKycDone
              ? "Identity verified"
              : "Talent profile";
          const skills = talent.user?.skillSet?.filter((skill) => skill.title.trim()).slice(0, 3) ?? [];

          return (
            <Link
              className="product-talent-card"
              href={`/talents/${talent.id}?returnTo=${encodeURIComponent("/talents")}`}
              key={talent.id}
              aria-label={`View ${talent.firstName} ${talent.lastName}'s profile`}
            >
              <div className="product-talent-photo">
                {talent.profilePicture ? (
                  // Public profile images can come from user-configured storage hosts.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={talent.profilePicture}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span>{getInitials(talent) || <PiUser aria-hidden="true" />}</span>
                )}
                <b><PiCheckCircle aria-hidden="true" /> {badgeLabel}</b>
              </div>
              <div className="product-talent-body">
                <p>{title}</p>
                <h3>{talent.firstName} {talent.lastName}</h3>
                {verifiedRole && <small>Verified for {verifiedRole}</small>}
                {skills.length > 0 && (
                  <ul aria-label="Skills">
                    {skills.map((skill) => <li key={skill.title}>{skill.title.trim()}</li>)}
                  </ul>
                )}
                <span>View profile <PiArrowRight aria-hidden="true" /></span>
              </div>
            </Link>
          );
        })}

        {!loading && (failed || talents.length === 0) && (
          <div className="product-talent-empty">
            <PiUser aria-hidden="true" />
            <h3>{failed ? "Profiles are temporarily unavailable" : "More verified profiles are coming"}</h3>
            <p>Browse the full talent directory or share your requirements with our team.</p>
            <Link href="/talents">Browse talent <PiArrowRight aria-hidden="true" /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
