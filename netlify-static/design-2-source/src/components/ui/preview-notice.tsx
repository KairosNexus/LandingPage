import { Clock3, Mail } from "lucide-react";

export function PreviewNotice() {
  return (
    <aside className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100" aria-label="Platform preview notice">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-bold">Platform preview — work in progress</p>
            <p className="mt-1 text-sm leading-relaxed opacity-80">
              Self-service marketplace remains in development. Features, profiles, and public results may be limited or incomplete and do not represent our full sourcing reach.
            </p>
          </div>
        </div>
        <a
          href="mailto:info@kairosnexusglobal.com?subject=Scope%20of%20Work%20%E2%80%94%20Talent%20Matching%20Request"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-black dark:bg-amber-200 dark:text-amber-950 dark:hover:bg-white"
        >
          <Mail className="h-4 w-4" />
          Request a Manual Match
        </a>
      </div>
    </aside>
  );
}
