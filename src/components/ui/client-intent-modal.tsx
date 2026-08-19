"use client";

import { useSyncExternalStore } from "react";
import { IntentModal, IntentModalProps } from "./intent-modal";

export function ClientIntentModal(props: IntentModalProps) {
  const isClient = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!isClient) {
    return null;
  }

  return <IntentModal {...props} />;
}
