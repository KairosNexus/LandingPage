"use client";

import { FormEvent, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  PiCalendar as CalendarDays,
  PiCheckCircle as CheckCircle2,
  PiSpinnerGap as Loader2,
  PiWarningCircle as AlertCircle,
  PiX as X,
} from "react-icons/pi";
import { scheduleCustomerSuccessCall } from "@/lib/api";

type SubmissionState = "form" | "loading" | "success" | "error";

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm = {
  fullName: "",
  workEmail: "",
  company: "",
  projectSummary: "",
  date: "",
  time: "",
};

const schedulingTimeZone = "America/New_York";
const schedulingTimeZoneLabel = "Eastern Time (ET)";
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

const easternDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: schedulingTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const easternDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: schedulingTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function partsByType(
  formatter: Intl.DateTimeFormat,
  date: Date
): Record<string, string> {
  return Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value])
  );
}

function getEasternDate(date: Date): string {
  const { year, month, day } = partsByType(easternDateFormatter, date);
  return `${year}-${month}-${day}`;
}

function easternDateTimeToUtc(date: string, time: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(
    `${date}T${time}`
  );
  if (!match) return new Date(Number.NaN);

  const [, year, month, day, hour, minute] = match.map(Number);
  const targetWallTime = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = new Date(targetWallTime);

  // Resolve Eastern offset for selected date, including daylight-saving time.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const parts = partsByType(easternDateTimeFormatter, candidate);
    const candidateWallTime = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second)
    );
    candidate = new Date(
      candidate.getTime() + targetWallTime - candidateWallTime
    );
  }

  return candidate;
}

export function ScheduleCallModal({
  isOpen,
  onClose,
}: ScheduleCallModalProps) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<SubmissionState>("form");
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null);
  const minimumDate = useMemo(() => getEasternDate(new Date()), []);

  const reset = () => {
    setForm(initialForm);
    setState("form");
    setScheduledFor(null);
  };

  const close = () => {
    if (state === "loading") return;
    onClose();
    reset();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedDate = easternDateTimeToUtc(form.date, form.time);

    if (
      !timeSlots.includes(form.time) ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.getTime() <= Date.now()
    ) {
      setState("error");
      return;
    }

    setState("loading");
    try {
      const response = await scheduleCustomerSuccessCall({
        fullName: form.fullName,
        workEmail: form.workEmail,
        company: form.company,
        projectSummary: form.projectSummary,
        scheduledFor: selectedDate.toISOString(),
        timezone: schedulingTimeZone,
      });
      setScheduledFor(
        new Date(response.data?.scheduledFor || selectedDate.toISOString())
      );
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[120] max-h-[92vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <Dialog.Close
            disabled={state === "loading"}
            className="absolute right-5 top-5 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 disabled:opacity-40 dark:hover:bg-zinc-800 dark:hover:text-white"
            aria-label="Close scheduling form"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>

          {state === "success" ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <Dialog.Title className="mt-5 text-3xl font-bold text-zinc-950 dark:text-white">
                Your Call Is Scheduled
              </Dialog.Title>
              <Dialog.Description className="mx-auto mt-4 max-w-md leading-relaxed text-zinc-600 dark:text-zinc-300">
                Your call with our customer success team has been scheduled.
                Please check your email for the meeting details.
              </Dialog.Description>
              {scheduledFor && (
                <p className="mt-5 rounded-xl bg-zinc-50 p-4 font-semibold text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                  {scheduledFor.toLocaleString([], {
                    dateStyle: "full",
                    timeStyle: "short",
                    timeZone: schedulingTimeZone,
                  })}
                  <span className="mt-1 block text-sm font-normal text-zinc-500">
                    {schedulingTimeZoneLabel}
                  </span>
                </p>
              )}
              <button
                type="button"
                onClick={close}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C2185B] px-7 py-3 font-bold text-white hover:bg-[#A3154D]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <CalendarDays className="h-9 w-9 text-[#C2185B]" />
              <Dialog.Title className="mt-4 pr-10 text-3xl font-bold text-zinc-950 dark:text-white">
                Schedule a Call With Customer Success
              </Dialog.Title>
              <Dialog.Description className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
                Choose a convenient time to discuss your project, role, or
                staffing need. Our customer success team will learn what you
                need and explain the next steps.
              </Dialog.Description>

              {state === "error" && (
                <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  Your call was not scheduled. Check your details, choose a
                  future time, and try again.
                </div>
              )}

              <form onSubmit={submit} className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <ModalField label="Full Name">
                    <input
                      required
                      autoComplete="name"
                      minLength={2}
                      maxLength={120}
                      value={form.fullName}
                      onChange={(event) =>
                        setForm({ ...form, fullName: event.target.value })
                      }
                      className={inputClass}
                    />
                  </ModalField>
                  <ModalField label="Work Email">
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={form.workEmail}
                      onChange={(event) =>
                        setForm({ ...form, workEmail: event.target.value })
                      }
                      className={inputClass}
                    />
                  </ModalField>
                </div>

                <ModalField label="Company or Organization" optional>
                  <input
                    autoComplete="organization"
                    maxLength={160}
                    value={form.company}
                    onChange={(event) =>
                      setForm({ ...form, company: event.target.value })
                    }
                    className={inputClass}
                  />
                </ModalField>

                <ModalField label="Project, Role, or Staffing Need">
                  <textarea
                    required
                    minLength={20}
                    maxLength={5000}
                    rows={4}
                    value={form.projectSummary}
                    onChange={(event) =>
                      setForm({ ...form, projectSummary: event.target.value })
                    }
                    placeholder="Briefly tell us what you need."
                    className={`${inputClass} resize-y`}
                  />
                </ModalField>

                <div className="grid gap-5 sm:grid-cols-2">
                  <ModalField label="Preferred Date">
                    <input
                      required
                      type="date"
                      min={minimumDate}
                      value={form.date}
                      onChange={(event) =>
                        setForm({ ...form, date: event.target.value })
                      }
                      className={inputClass}
                    />
                  </ModalField>
                  <ModalField label="Preferred Time">
                    <select
                      required
                      value={form.time}
                      onChange={(event) =>
                        setForm({ ...form, time: event.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {new Date(`2000-01-01T${time}:00`).toLocaleTimeString(
                            [],
                            { hour: "numeric", minute: "2-digit" }
                          )}
                        </option>
                      ))}
                    </select>
                  </ModalField>
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Available times: 9:00 AM–3:00 PM{" "}
                  <strong>{schedulingTimeZoneLabel}</strong>.
                </p>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={close}
                    disabled={state === "loading"}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-300 px-6 py-3 font-bold text-zinc-800 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C2185B] px-7 py-3 font-bold text-white hover:bg-[#A3154D] disabled:opacity-60"
                  >
                    {state === "loading" && (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    )}
                    {state === "loading" ? "Scheduling…" : "Schedule Call"}
                  </button>
                </div>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-[#C2185B] focus:ring-2 focus:ring-[#C2185B]/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";

function ModalField({
  label,
  optional = false,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-zinc-800 dark:text-zinc-200">
      {label}
      {optional && (
        <span className="ml-1 font-normal text-zinc-500">— Optional</span>
      )}
      {children}
    </label>
  );
}
