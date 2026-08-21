"use client";

import { createContext, useContext, useState } from "react";
import { BusinessRequestModal } from "@/components/ui/business-request-modal";
import { ScheduleCallModal } from "@/components/ui/schedule-call-modal";

interface BusinessInquiryContextValue {
  openRequestModal: () => void;
  openScheduleModal: () => void;
}

const BusinessInquiryContext =
  createContext<BusinessInquiryContextValue | null>(null);

export function BusinessInquiryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [requestOpen, setRequestOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const openRequestModal = () => {
    setScheduleOpen(false);
    setRequestOpen(true);
  };

  const openScheduleModal = () => {
    setRequestOpen(false);
    setScheduleOpen(true);
  };

  return (
    <BusinessInquiryContext.Provider
      value={{ openRequestModal, openScheduleModal }}
    >
      {children}
      <BusinessRequestModal
        isOpen={requestOpen}
        onClose={() => setRequestOpen(false)}
      />
      <ScheduleCallModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
      />
    </BusinessInquiryContext.Provider>
  );
}

export function useBusinessInquiry() {
  const context = useContext(BusinessInquiryContext);
  if (!context) {
    throw new Error(
      "useBusinessInquiry must be used within BusinessInquiryProvider"
    );
  }
  return context;
}
