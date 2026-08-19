"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRef } from "react";
import {
  ArrowUpRight,
  Buildings,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";

export interface IntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (intent: "talent" | "company") => void;
}

const choices = [
  {
    intent: "company" as const,
    title: "I'm hiring",
    description: "I need vetted professionals for a project or an ongoing role.",
    action: "Find talent",
    icon: Buildings,
    className: "bg-[#202020] text-[#f5f5f2] dark:bg-[#292929]",
    iconClassName: "bg-white/10 text-[#f287b5]",
    arrowClassName: "border-white/20 text-white",
    copyClassName: "text-white/68",
  },
  {
    intent: "talent" as const,
    title: "I'm a professional",
    description: "I want to build my profile and prepare for global opportunities.",
    action: "Join as talent",
    icon: UserCircle,
    className: "bg-[#f7dce8] text-[#35101f] dark:bg-[#3a1d29] dark:text-[#fff7fa]",
    iconClassName: "bg-white/65 text-[#C2185B] dark:bg-white/10 dark:text-[#f287b5]",
    arrowClassName: "border-[#35101f]/15 text-[#35101f] dark:border-white/15 dark:text-white",
    copyClassName: "text-[#674554] dark:text-white/68",
  },
];

export function IntentModal({ isOpen, onClose, onSelect }: IntentModalProps) {
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="fixed inset-0 z-[100] bg-[#171717]/58 backdrop-blur-md"
          />
        </Dialog.Overlay>

        <div className="pointer-events-none fixed inset-0 z-[101] flex items-end justify-center sm:items-center sm:p-5">
          <Dialog.Content
            asChild
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              titleRef.current?.focus();
            }}
          >
            <motion.section
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 27 }}
              className="pointer-events-auto relative max-h-[calc(100dvh-0.75rem)] w-full overflow-y-auto rounded-t-[28px] border border-black/10 bg-white shadow-[0_30px_100px_rgba(45,14,28,0.28)] dark:border-white/10 dark:bg-[#1d1d1d] sm:max-w-[720px] sm:rounded-[28px]"
            >
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="icon-button absolute right-4 top-4 z-10 bg-white/80 backdrop-blur-md dark:bg-[#1d1d1d]/80 sm:right-5 sm:top-5"
                  aria-label="Close role selection"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </Dialog.Close>

              <header className="px-5 pb-7 pt-8 pr-20 sm:px-8 sm:pb-8 sm:pt-9 sm:pr-24">
                <Dialog.Title ref={titleRef} tabIndex={-1} className="max-w-xl text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.052em] outline-none">
                  What brings you to Kairos?
                </Dialog.Title>
                <Dialog.Description className="mt-4 max-w-lg text-base leading-7 text-[#666662] dark:text-[#b7b7b2]">
                  Choose the path that fits today. You can switch whenever you need to.
                </Dialog.Description>
              </header>

              <div className="grid gap-3 px-3 pb-3 sm:grid-cols-2 sm:px-4 sm:pb-4">
                {choices.map((choice) => (
                  <button
                    key={choice.intent}
                    type="button"
                    onClick={() => onSelect(choice.intent)}
                    className={`group flex min-h-52 flex-col justify-between rounded-[24px] border border-black/8 p-5 text-left transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 active:translate-y-0 sm:min-h-60 sm:p-6 ${choice.className}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${choice.iconClassName}`}>
                        <choice.icon size={25} weight="regular" aria-hidden="true" />
                      </span>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${choice.arrowClassName}`}>
                        <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="mt-10">
                      <h3 className="text-2xl font-medium tracking-[-0.035em]">{choice.title}</h3>
                      <p className={`mt-2 max-w-[28ch] text-sm leading-6 ${choice.copyClassName}`}>{choice.description}</p>
                      <span className="mt-5 inline-block text-sm font-semibold">{choice.action}</span>
                    </div>
                  </button>
                ))}
              </div>

              <footer className="border-t border-black/10 px-5 py-4 dark:border-white/10 sm:px-8">
                <p className="text-sm leading-6 text-[#666662] dark:text-[#b7b7b2]">
                  Human-led matching is available now. The self-service marketplace continues to grow.
                </p>
              </footer>
            </motion.section>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
