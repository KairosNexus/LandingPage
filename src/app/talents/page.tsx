"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ArrowLeft, MapPin, ArrowRight, User, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPublicTalents, PublicTalent } from "@/lib/api";
import { formatProfileLabel } from "@/lib/format-profile-label";

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

const getRandomSkills = (talents: PublicTalent[], limit = 9) => {
  const skillsByTalent = shuffle(talents.slice(0, 20)).map((talent) =>
    shuffle(talent.user?.skillSet?.map(({ title }) => title.trim()).filter(Boolean) ?? []),
  );
  const selected: string[] = [];
  const seen = new Set<string>();
  const longestSkillList = Math.max(0, ...skillsByTalent.map((skills) => skills.length));

  // Round-robin prevents one profile with many skills from dominating the filter.
  for (let skillIndex = 0; skillIndex < longestSkillList && selected.length < limit; skillIndex += 1) {
    for (const talentSkills of skillsByTalent) {
      const skill = talentSkills[skillIndex];
      const normalizedSkill = skill?.toLocaleLowerCase();
      if (skill && !seen.has(normalizedSkill)) {
        seen.add(normalizedSkill);
        selected.push(skill);
        if (selected.length === limit) break;
      }
    }
  }

  return selected;
};

const prioritizeProfilesWithImages = (talents: PublicTalent[]) =>
  [...talents].sort((a, b) => Number(Boolean(b.profilePicture?.trim())) - Number(Boolean(a.profilePicture?.trim())));

export default function TalentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [locationPreference, setLocationPreference] = useState("");
  const [filtersReady, setFiltersReady] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [publicTalents, setPublicTalents] = useState<PublicTalent[]>([]);
  const [randomSkills, setRandomSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(true);
  const [talentListHref, setTalentListHref] = useState("/talents");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSearchQuery = params.get("search")?.trim() || "";
    const urlLocationPreference = params.get("location") || "";
    const urlSkill = params.get("skill") || "All";
    const urlExperience = params.get("experience") || "All";
    const parsedPage = Number.parseInt(params.get("page") || "1", 10);

    setSearchQuery(urlSearchQuery);
    setAppliedSearchQuery(urlSearchQuery);
    setLocationPreference(urlLocationPreference);
    setSelectedSkills(urlSkill);
    setSelectedExperience(urlExperience);
    setCurrentPage(Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1);
    setFiltersReady(true);
  }, []);

  useEffect(() => {
    if (!filtersReady) return;

    let cancelled = false;

    const fetchPublicTalents = async () => {
      setLoading(true);
      try {
        const response = await getPublicTalents({
          search: appliedSearchQuery || undefined,
          locationPreference: locationPreference === "REMOTE" ? "REMOTE" : undefined,
          region: locationPreference.toLowerCase() === "africa" ? "Africa" : undefined,
          skills: selectedSkills === "All" ? undefined : selectedSkills,
          experienceLevel: selectedExperience === "All" ? undefined : selectedExperience,
          page: currentPage,
          limit: 20,
        });
        if (!cancelled) {
          setPublicTalents(prioritizeProfilesWithImages(response.data));
          setRandomSkills(getRandomSkills(response.data));
          setPagination({
            total: response.pagination.total,
            totalPages: Math.max(response.pagination.totalPages, 1),
            hasNext: response.pagination.hasNext,
            hasPrevious: response.pagination.hasPrevious,
          });

          if (response.pagination.totalPages > 0 && currentPage > response.pagination.totalPages) {
            setCurrentPage(response.pagination.totalPages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch public talents:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPublicTalents();

    return () => {
      cancelled = true;
    };
  }, [appliedSearchQuery, currentPage, filtersReady, locationPreference, selectedExperience, selectedSkills]);

  useEffect(() => {
    if (!filtersReady) return;

    const params = new URLSearchParams();
    if (appliedSearchQuery) params.set("search", appliedSearchQuery);
    if (locationPreference) params.set("location", locationPreference);
    if (selectedSkills !== "All") params.set("skill", selectedSkills);
    if (selectedExperience !== "All") params.set("experience", selectedExperience);
    if (currentPage > 1) params.set("page", currentPage.toString());
    const listHref = params.size ? `/talents?${params.toString()}` : "/talents";
    setTalentListHref(listHref);
    router.replace(listHref);
  }, [appliedSearchQuery, currentPage, filtersReady, locationPreference, router, selectedExperience, selectedSkills]);

  const handleSearch = () => {
    const query = searchQuery.trim();
    setCurrentPage(1);
    setAppliedSearchQuery(query);
  };

  const handleViewAll = () => {
    setSearchQuery("");
    setAppliedSearchQuery("");
    setLocationPreference("");
    setSelectedSkills("All");
    setSelectedExperience("All");
    setCurrentPage(1);
    router.replace("/talents");
  };

  const skills = useMemo(() => {
    if (selectedSkills === "All" || randomSkills.some((skill) => skill.toLocaleLowerCase() === selectedSkills.toLocaleLowerCase())) {
      return ["All", ...randomSkills];
    }

    return ["All", selectedSkills, ...randomSkills.slice(0, 8)];
  }, [randomSkills, selectedSkills]);
  const experienceLevels = useMemo(() => ["All", ...Array.from(new Set(publicTalents.map(t => t.experienceLevel)))], [publicTalents]);

  // Backend applies search and filters before pagination. Rendering response
  // directly prevents alias, fuzzy, or bio-only matches from being discarded.
  const filteredTalents = publicTalents;

  return (
    <main className="kds-page">
      <div className="kds-container">
        {/* Header */}
        <div>
          <Link href="/" className="kds-back">
            <ArrowLeft />
            Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="kds-eyebrow">Global Talent</span>
              <h1 className="kds-display">Discover <em>exceptional talent.</em></h1>
              <p className="kds-lead">
                Browse our network of pre-vetted professionals ready to join your team.
              </p>
            </div>
            <div className="kds-eyebrow">
              {filteredTalents.length} talented professionals available
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="kds-panel kds-search-panel">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="kds-search-row">
              <Search />
              <input 
                type="text" 
                placeholder="Search by name, skills, or expertise..."
                aria-label="Search talents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="kds-button kds-button-primary"
              >
                Search Talents
              </button>
            </div>

            {/* Filter Tags */}
            <div className="kds-filter-grid">
              <div>
                <span className="kds-filter-label">Skills</span>
                <div className="kds-chip-row">
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        setSelectedSkills(skill);
                        setCurrentPage(1);
                      }}
                      className="kds-chip"
                      aria-pressed={selectedSkills === skill}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="kds-filter-label">Experience</span>
                <div className="kds-chip-row">
                  {experienceLevels.map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setSelectedExperience(level);
                        setCurrentPage(1);
                      }}
                      className="kds-chip"
                      aria-pressed={selectedExperience === level}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Talents List */}
        <div className="kds-talent-grid">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5"></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-16"></div>
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-20"></div>
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-14"></div>
                </div>
              </div>
            ))
          ) : filteredTalents.length > 0 ? (
            filteredTalents.map((talent) => (
              <Link
                key={talent.id}
                href={`/talents/${talent.id}?returnTo=${encodeURIComponent(talentListHref)}`}
                className="block"
              >
                <article className="kds-talent-card group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      {talent.profilePicture ? (
                        <div className="kds-avatar"><img
                          src={talent.profilePicture}
                          alt={`${talent.firstName} ${talent.lastName}`}
                        /></div>
                      ) : (
                        <div className="kds-avatar">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                      {talent.user?.isKycDone && (
                        <div className="talent-gold-icon absolute -bottom-1 -right-1">
                          <CheckCircle2 className="h-4 w-4 text-[#9a6700]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="kds-card-title">
                          {talent.firstName} {talent.lastName}
                        </h3>
                        {talent.user?.isKycDone && (
                          <span className="talent-gold-badge"><CheckCircle2 /> Verified</span>
                        )}
                      </div>
                      <p className="kds-card-role">
                        {formatProfileLabel(talent.jobTitles[0] || talent.jobRole) || "Professional"}
                      </p>
                    </div>
                  </div>

                  {talent.bio && (
                    <p className="kds-card-copy line-clamp-3">
                      {talent.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.user?.skillSet?.filter((skill) => skill.title.trim()).slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs rounded-full"
                      >
                        {skill.title.trim()}
                      </span>
                    ))}
                    {talent.user?.skillSet && talent.user.skillSet.length > 4 && (
                      <span className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs rounded-full">
                        +{talent.user.skillSet.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="kds-card-footer">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {talent.location || "Location not specified"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        {formatProfileLabel(talent.experienceLevel)}
                      </div>
                    </div>

                    <span className="kds-card-link">
                      View Profile <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">No talents found</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                Try adjusting your search criteria or check back later for new talent.
              </p>
              <button
                type="button"
                onClick={handleViewAll}
                className="kds-button kds-button-primary"
              >
                View all talents
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {!loading && pagination.totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Talent list pagination">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={!pagination.hasPrevious}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-colors hover:border-[#C2185B] hover:text-[#C2185B] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(pagination.totalPages, page + 1))}
              disabled={!pagination.hasNext}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-colors hover:border-[#C2185B] hover:text-[#C2185B] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
