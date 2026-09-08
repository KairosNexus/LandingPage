import {
  PiArrowRight,
  PiBell,
  PiBriefcase,
  PiChatCircleDots,
  PiCheckCircle,
  PiFileText,
  PiGear,
  PiHouse,
  PiMagnifyingGlass,
  PiMapPin,
  PiShieldCheck,
  PiSparkle,
  PiSquaresFour,
  PiUserCircle,
  PiUsersThree,
} from "react-icons/pi";
import Image from "next/image";

export type PreviewKind =
  | "dashboard"
  | "talent"
  | "verification"
  | "jobs"
  | "messaging"
  | "contracts";

type Audience = "company" | "talent";

type PreviewContent = {
  title: string;
  eyebrow: string;
  description: string;
  activeNav:
    | "Home"
    | "Jobs"
    | "Messages"
    | "Contracts"
    | "Skill Verification"
    | "Settings";
  icon: typeof PiSquaresFour;
  metrics: Array<{ label: string; value: string }>;
  items: string[];
};

const previewContent: Record<Audience, Record<PreviewKind, PreviewContent>> = {
  company: {
    dashboard: {
      title: "Hi, Joshua",
      eyebrow: "Company workspace",
      description: "Review hiring activity and keep conversations moving.",
      activeNav: "Home",
      icon: PiSquaresFour,
      metrics: [
        { label: "Job posts", value: "3" },
        { label: "Recent applicants", value: "18" },
        { label: "Talent matches", value: "6" },
      ],
      items: ["Post a job", "Review applicants", "Talent pool"],
    },
    talent: {
      title: "Jobs",
      eyebrow: "Talent Match Preview",
      description: "Review applicants and recommended candidates by role.",
      activeNav: "Jobs",
      icon: PiUsersThree,
      metrics: [
        { label: "Applicants", value: "18" },
        { label: "Recommended", value: "6" },
        { label: "Interviewing", value: "3" },
      ],
      items: ["Applicants and recommendations", "Skills, CVs, and certifications", "Application stage"],
    },
    verification: {
      title: "Verification",
      eyebrow: "Professional signals",
      description: "Review identity status and available role-verification badges.",
      activeNav: "Home",
      icon: PiCheckCircle,
      metrics: [
        { label: "Identity", value: "Verified" },
        { label: "Skills", value: "By role" },
        { label: "Availability", value: "Visible" },
      ],
      items: ["Talent identity status", "Role-specific skill evidence", "Availability and delivery expectations"],
    },
    jobs: {
      title: "Jobs",
      eyebrow: "Manage your job postings",
      description: "Create listings and track every stage in one place.",
      activeNav: "Jobs",
      icon: PiBriefcase,
      metrics: [
        { label: "Published", value: "3" },
        { label: "Draft", value: "1" },
        { label: "Closed", value: "2" },
      ],
      items: ["Jobs posted by me", "Applicants and recommendations", "Explore talent pool"],
    },
    messaging: {
      title: "Messages",
      eyebrow: "Product Designer",
      description: "Keep conversations and hiring context together.",
      activeNav: "Messages",
      icon: PiChatCircleDots,
      metrics: [
        { label: "Presence", value: "Online" },
        { label: "Contact", value: "Protected" },
        { label: "Files", value: "Enabled" },
      ],
      items: ["Search conversation history", "Send messages and attachments", "Schedule an interview"],
    },
    contracts: {
      title: "Contracts",
      eyebrow: "Manage offers and terms",
      description: "Create standard or milestone agreements from applicants.",
      activeNav: "Contracts",
      icon: PiFileText,
      metrics: [
        { label: "Pending", value: "2" },
        { label: "Accepted", value: "4" },
        { label: "Completed", value: "7" },
      ],
      items: ["Scope and deliverables", "Terms and attachments", "Milestones and status"],
    },
  },
  talent: {
    dashboard: {
      title: "Hi, Amina",
      eyebrow: "Talent workspace",
      description: "Track your profile and find your next opportunity.",
      activeNav: "Home",
      icon: PiSquaresFour,
      metrics: [
        { label: "Open roles", value: "6" },
        { label: "Skills added", value: "12" },
        { label: "Skill verification", value: "Done" },
      ],
      items: ["Finish account setup", "Explore jobs", "Messages"],
    },
    talent: {
      title: "Settings",
      eyebrow: "Professional details",
      description: "Manage skills, preferences, education, CV, and certifications.",
      activeNav: "Settings",
      icon: PiUserCircle,
      metrics: [
        { label: "Setup", value: "80%" },
        { label: "Skills", value: "8" },
        { label: "Documents", value: "3" },
      ],
      items: ["Job interests and experience", "CV and certifications", "Employment preferences"],
    },
    verification: {
      title: "Verification",
      eyebrow: "Skill Verification (Tier 2)",
      description: "Track identity and role-specific submission progress.",
      activeNav: "Skill Verification",
      icon: PiCheckCircle,
      metrics: [
        { label: "Identity", value: "Tier 1" },
        { label: "Method", value: "PDF or PR" },
        { label: "Status", value: "In review" },
      ],
      items: ["NIN identity verification", "PDF or GitHub submission", "Submission status and history"],
    },
    jobs: {
      title: "Jobs",
      eyebrow: "Explore Jobs that Match You",
      description: "Search, filter, save, and track relevant roles.",
      activeNav: "Jobs",
      icon: PiBriefcase,
      metrics: [
        { label: "Saved", value: "4" },
        { label: "Applied", value: "3" },
        { label: "Alerts", value: "2" },
      ],
      items: ["All Jobs, Applied, and Saved", "Role, location, and experience filters", "Skill match and application status"],
    },
    messaging: {
      title: "Messages",
      eyebrow: "Frontend Engineer",
      description: "Continue company conversations inside Kairos.",
      activeNav: "Messages",
      icon: PiChatCircleDots,
      metrics: [
        { label: "Presence", value: "Online" },
        { label: "Contact", value: "Protected" },
        { label: "Files", value: "Enabled" },
      ],
      items: ["Opportunity-linked conversation", "Messages and attachments", "Interview invitation"],
    },
    contracts: {
      title: "Contracts",
      eyebrow: "Review the agreement",
      description: "Understand scope, deliverables, terms, and milestones.",
      activeNav: "Contracts",
      icon: PiFileText,
      metrics: [
        { label: "Status", value: "Pending" },
        { label: "Type", value: "Milestone" },
        { label: "Currency", value: "USD" },
      ],
      items: ["Scope and deliverables", "Payment terms and milestones", "Accept, negotiate, or reject"],
    },
  },
};

const navItems = [
  { name: "Home" as const, icon: PiHouse },
  { name: "Jobs" as const, icon: PiBriefcase },
  { name: "Messages" as const, icon: PiChatCircleDots },
  { name: "Contracts" as const, icon: PiFileText },
  {
    name: "Skill Verification" as const,
    icon: PiCheckCircle,
    talentOnly: true,
  },
  { name: "Settings" as const, icon: PiGear },
];

export function ProductPreview({
  kind,
  audience,
  compact = false,
}: {
  kind: PreviewKind;
  audience: Audience;
  compact?: boolean;
}) {
  const content = previewContent[audience][kind];
  const Icon = content.icon;
  const isDashboard = kind === "dashboard";
  const percentage = 90;

  return (
    <div
      className={`product-preview product-preview-${kind} product-preview-audience-${audience} ${compact ? "product-preview-compact" : ""}`}
      data-product-frame
      data-screenshot-slot={`kairos-${audience}-${kind}`}
      aria-label={`${content.title} illustrative Kairos product preview with sample data`}
    >
      <div className="product-preview-chrome">
        <span />
        <span />
        <span />
        <p>Illustrative product preview</p>
      </div>
      <div className="product-preview-shell">
        <aside className="product-preview-sidebar" aria-hidden="true">
          <div className="product-preview-brand">
            <span className="product-preview-mark"><Image src="/logo.png" alt="" width={32} height={32} /></span>
            <strong>kairos</strong>
          </div>
          {!compact && <div className="product-preview-company">Kairos Nexus Global</div>}
          <nav>
            {navItems
              .filter((item) => !item.talentOnly || audience === "talent")
              .map((item) => (
                <span
                  key={item.name}
                  className={
                    item.name === content.activeNav ? "is-active" : ""
                  }
                >
                  <item.icon />
                  <b>{item.name}</b>
                </span>
              ))}
          </nav>
          {!compact && (
            <div className="product-preview-account">
              <small>Complete Account Setup</small>
              <span>Almost done!</span>
              <i>
                <b style={{ width: `${percentage}%` }} />
              </i>
              <em>Get started</em>
              <strong>{audience === "company" ? "John" : "Amina"}</strong>
            </div>
          )}
        </aside>
        <div className="product-preview-main">
          <div className="product-preview-topbar">
            {!isDashboard && <div><small>Kairos Nexus Global</small><strong>{content.activeNav}</strong></div>}
            <div className="product-preview-tools" aria-hidden="true">
              <span>{audience === "company" ? "Get Verified" : "Tier 2"}</span>
              <PiBell />
            </div>
          </div>
          {isDashboard ? <DashboardHome audience={audience} percentage={percentage} /> : <div className="product-preview-content">
            <div className="product-preview-lead">
              <span className="product-preview-icon">
                <Icon />
              </span>
              <div>
                <small>{content.eyebrow}</small>
                <h3>{content.title}</h3>
                <p>{content.description}</p>
              </div>
            </div>
            <div className="product-preview-metrics" aria-hidden="true">
              {content.metrics.map((metric) => (
                <span key={metric.label}>
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </span>
              ))}
            </div>
            <div className="product-preview-list" aria-hidden="true">
              {content.items.map((item, index) => (
                <div key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                  <i>View</i>
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>
      <p className="product-preview-replace">Sample data</p>
      <a
        className="product-preview-signin"
        href="https://app.kairosng.com/auth/login"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Sign in to explore the ${content.title} workspace`}
      />
    </div>
  );
}

function DashboardHome({ audience, percentage }: { audience: Audience; percentage: number }) {
  const company = audience === "company";
  const stats = company
    ? [["Job posts", "7", PiBriefcase], ["Recent applicants", "4", PiUsersThree], ["Talent matches", "7", PiSparkle], ["Profile complete", `${percentage}%`, PiUserCircle]] as const
    : [["Open roles", "7", PiBriefcase], ["Skills added", "12", PiCheckCircle], ["Skill verification", "Done", PiShieldCheck], ["Profile complete", `${percentage}%`, PiUserCircle]] as const;
  const actions = company
    ? [["Post a job", "Create a role and start matching.", PiFileText], ["Review applicants", "Open your jobs and compare talent.", PiUsersThree], ["Talent pool", "Explore verified talent profiles.", PiMagnifyingGlass], ["Messages", "Continue hiring conversations.", PiChatCircleDots]] as const
    : [["Explore jobs", "Find roles that fit your skills.", PiMagnifyingGlass], ["Messages", "Reply to active conversations.", PiChatCircleDots], ["Skill verification", "Build trust around your strongest role.", PiShieldCheck], ["Contracts", "Review offers and agreed terms.", PiBriefcase]] as const;
  return <div className="product-preview-dashboard">
    <section className="product-preview-welcome">
      <div><h3>Hi, {company ? "John" : "Amina"}</h3><p>{company ? "Welcome back! Manage your job posts and find the best talent." : "Welcome back! Discover new opportunities and manage your career journey."}</p></div>
      <button>{percentage}% | Account setup <PiArrowRight /></button>
      <div className="product-preview-search"><span><PiMagnifyingGlass />{company ? "Search by name, role, or skill" : "Search for your perfect job"}</span><span><PiMapPin />Location</span><b><PiMagnifyingGlass /></b></div>
    </section>
    <div className="product-preview-dashboard-stats">{stats.map(([label, value, StatIcon]) => <div key={label}><span><small>{label}</small><strong className={label === "Profile complete" ? "is-progress" : ""}>{value}</strong></span><i><StatIcon /></i></div>)}</div>
    <section className="product-preview-next"><h4>Complete next</h4><div><article><i><PiUserCircle /></i><span><strong>Finish account setup</strong><small>{percentage}% complete</small></span><PiArrowRight /></article>{company && <article><i><PiShieldCheck /></i><span><strong>Verify your account</strong><small>Confirm your identity</small></span><PiArrowRight /></article>}</div></section>
    <section className="product-preview-actions"><h4>Quick actions</h4><div>{actions.map(([title, description, ActionIcon]) => <article key={title}><header><i><ActionIcon /></i><PiArrowRight /></header><strong>{title}</strong><small>{description}</small></article>)}</div></section>
    <div className="product-preview-lower"><strong>{company ? "Recent jobs" : "Skill verification · Tier 2"}</strong><span>{company ? "View all" : "1 verified role"}</span></div>
  </div>;
}
