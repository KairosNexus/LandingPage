"use client";

import { PrelaunchLanding } from "@/components/layout/prelaunch-landing";
import { TalentPrelaunchLanding } from "@/components/layout/talent-prelaunch-landing";
import { useIntent } from "@/components/providers/intent-provider";

export default function Home() {
  const { intent } = useIntent();

  return intent === "talent" ? <TalentPrelaunchLanding /> : <PrelaunchLanding />;
}
