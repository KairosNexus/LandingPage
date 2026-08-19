"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Desktop, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  if (!mounted) return <div className="h-11 w-11" aria-hidden="true" />;

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Desktop },
  ];
  const ActiveIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Desktop;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-[#5f5f5b] transition-colors hover:bg-black/5 dark:text-[#b7b7b2] dark:hover:bg-white/5"
        aria-label="Choose color theme"
        aria-expanded={isOpen}
      >
        <ActiveIcon size={20} weight="regular" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#1d1d1d]">
          {options.map((option) => {
            const Icon = option.icon;
            const selected = theme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-sm transition-colors",
                  selected ? "bg-[#C2185B]/10 font-semibold text-[#C2185B]" : "hover:bg-black/5 dark:hover:bg-white/5",
                )}
              >
                <span className="flex items-center gap-2.5"><Icon size={18} aria-hidden="true" /> {option.label}</span>
                {selected && <Check size={16} weight="bold" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
