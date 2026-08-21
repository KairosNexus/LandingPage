"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

type Intent = "talent" | "company";

interface IntentContextType {
  intent: Intent;
  setIntent: (intent: Intent) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const IntentContext = createContext<IntentContextType | undefined>(undefined);

const subscribeToHydration = () => () => {};

export function IntentProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);
  const [modalOverride, setModalOverride] = useState<boolean | null>(null);
  const savedIntent = hydrated ? getStorageItem("kairos_intent") : null;
  const validSavedIntent = savedIntent === "talent" || savedIntent === "company" ? savedIntent : null;
  const intent = selectedIntent ?? validSavedIntent ?? "company";
  const showModal = modalOverride ?? (hydrated && validSavedIntent === null);

  const handleSetIntent = (newIntent: Intent) => {
    setSelectedIntent(newIntent);
    setStorageItem("kairos_intent", newIntent);
    setModalOverride(false);
  };

  return (
    <IntentContext.Provider 
      value={{ 
        intent, 
        setIntent: handleSetIntent, 
        showModal, 
        setShowModal: setModalOverride,
      }}
    >
      {children}
    </IntentContext.Provider>
  );
}

export function useIntent() {
  const context = useContext(IntentContext);
  if (context === undefined) {
    throw new Error("useIntent must be used within an IntentProvider");
  }
  return context;
}
