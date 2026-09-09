"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Award, Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTalentById, PublicTalent } from "@/lib/api";
import { formatProfileLabel, formatProfileLocation } from "@/lib/format-profile-label";

export default function TalentDetailPage() {
  const params = useParams();
  const [talent, setTalent] = useState<PublicTalent | null>(null);
  const [loading, setLoading] = useState(true);
  const [backHref, setBackHref] = useState("/talents");

  useEffect(() => {
    const requestedBackHref = new URLSearchParams(window.location.search).get("returnTo");
    if (requestedBackHref === "/talents" || requestedBackHref?.startsWith("/talents?")) {
      setBackHref(requestedBackHref);
    }

    const fetchTalent = async () => {
      try {
        const response = await getTalentById(params.id as string);
        setTalent(response.data || null);
      } catch (error) {
        console.error("Failed to fetch talent:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTalent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/4 mb-8"></div>
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold dark:text-white mb-4">Talent not found</h2>
        <Link href={backHref} className="text-[#C2185B] hover:underline">
          Back to all talents
        </Link>
      </div>
    );
  }

  const role = talent.jobTitles.filter((title) => title.trim()).map(formatProfileLabel).join(", ") ||
    formatProfileLabel(talent.jobRole) || "Professional";
  const initials = `${talent.firstName?.[0] || ""}${talent.lastName?.[0] || ""}`.toUpperCase();
  const skills = talent.user?.skillSet?.filter((skill) => skill.title.trim()) ?? [];
  const location = formatProfileLocation(talent.location);
  const experienceLevel = formatProfileLabel(talent.experienceLevel);
  const employmentType = formatProfileLabel(talent.employmentType);
  const hasAtAGlanceDetails = Boolean(location || experienceLevel || employmentType);

  return (
    <main className="kds-page">
      <div className="kds-narrow">
        <Link href={backHref} className="kds-back">
          <ArrowLeft /> Back to all talents
        </Link>

        <section className="kds-panel kds-profile-hero">
          <div className="kds-profile-banner" aria-hidden="true" />
          <div className="kds-profile-header">
            <div className="kds-avatar relative">
              {talent.profilePicture ? (
                // Public profile images can come from user-configured storage hosts.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={talent.profilePicture} alt={`${talent.firstName} ${talent.lastName}`} />
              ) : (
                <span>{initials || <Award aria-hidden="true" />}</span>
              )}
              {talent.user?.isKycDone && (
                <div className="talent-gold-icon absolute -bottom-1 -right-1">
                  <CheckCircle2 />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="kds-profile-name">{talent.firstName} {talent.lastName}</h1>
                {talent.user?.isKycDone && (
                  <span className="talent-gold-badge"><CheckCircle2 /> Verified</span>
                )}
              </div>
              <p className="kds-profile-role">{role}</p>
            </div>
          </div>
        </section>

        <div className="kds-profile-layout">
          <div className="kds-panel kds-profile-section">
            <section>
              <p className="kds-eyebrow">Profile</p>
              <h2 className="kds-section-title">About</h2>
              <p className="kds-profile-copy">{talent.bio || "This professional has not added a profile summary yet."}</p>
            </section>

            <section className="mt-10 border-t border-black/10 pt-8 dark:border-white/10">
              <p className="kds-eyebrow">Expertise</p>
              <h2 className="kds-section-title">Skills</h2>
              {skills.length ? (
                <div className="kds-chip-row">
                  {skills.map((skill, index) => (
                    <span className="kds-chip" key={`${skill.title}-${index}`}>{skill.title.trim()}</span>
                  ))}
                </div>
              ) : (
                <p className="kds-profile-copy">No skills listed yet.</p>
              )}
            </section>
          </div>

          {hasAtAGlanceDetails && (
            <aside className="kds-panel kds-profile-section self-start">
              <p className="kds-eyebrow">At a glance</p>
              <div className="kds-facts">
                {location && <div className="kds-fact"><MapPin aria-hidden="true" /> <span>{location}</span></div>}
                {experienceLevel && <div className="kds-fact"><Award aria-hidden="true" /> <span>{experienceLevel}</span></div>}
                {employmentType && <div className="kds-fact"><Briefcase aria-hidden="true" /> <span>{employmentType}</span></div>}
              </div>
              <a
                href="https://app.kairosng.com/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="kds-button kds-button-primary mt-6 w-full"
              >
                Contact Talent
              </a>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
