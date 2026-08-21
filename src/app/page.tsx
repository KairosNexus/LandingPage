"use client";

import { EditorialLanding } from "@/components/layout/editorial-landing";
import { useIntent } from "@/components/providers/intent-provider";

export default function Home() {
  const { intent } = useIntent();

  return <EditorialLanding audience={intent} />;
}
