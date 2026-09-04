import {
  PiBell,
  PiBriefcase,
  PiChatCircleDots,
  PiCheckCircle,
  PiFileText,
  PiGear,
  PiHouse,
  PiSquaresFour,
  PiUserCircle,
  PiUsersThree,
} from "react-icons/pi";

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
      title: "Hi, Maya",
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

  return (
    <div
      className={`product-preview ${compact ? "product-preview-compact" : ""}`}
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
            <span className="product-preview-mark">K</span>
            <strong>Kairos</strong>
          </div>
          {audience === "company" && !compact && (
            <div className="product-preview-company">Sample Company</div>
          )}
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
              <small>Account setup</small>
              <i>
                <b style={{ width: audience === "company" ? "100%" : "80%" }} />
              </i>
              <strong>{audience === "company" ? "Maya" : "Amina"}</strong>
            </div>
          )}
        </aside>
        <div className="product-preview-main">
          <div className="product-preview-topbar">
            <div>
              <small>Kairos Nexus Global</small>
              <strong>{content.activeNav}</strong>
            </div>
            <div className="product-preview-tools" aria-hidden="true">
              <span>{audience === "company" ? "Tier 1" : "Tier 2"}</span>
              <PiBell />
              <PiUserCircle />
            </div>
          </div>
          <div className="product-preview-content">
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
          </div>
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
