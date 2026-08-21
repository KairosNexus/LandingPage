"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  PiCheckCircle as CheckCircle2,
  PiFileText as FileText,
  PiPaperclip as Paperclip,
  PiShieldWarning as ShieldAlert,
  PiSpinnerGap as Loader2,
  PiTrash as Trash2,
  PiWarningCircle as AlertCircle,
  PiX as X,
} from "react-icons/pi";
import { submitBusinessRequest } from "@/lib/api";

type SubmissionState = "form" | "loading" | "success" | "error";

interface BusinessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm = {
  fullName: "",
  workEmail: "",
  company: "",
  subject: "",
  message: "",
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const acceptedFileTypes =
  ".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.webp";

export function BusinessRequestModal({
  isOpen,
  onClose,
}: BusinessRequestModalProps) {
  const [form, setForm] = useState(initialForm);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [state, setState] = useState<SubmissionState>("form");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setForm(initialForm);
    setAttachments([]);
    setState("form");
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const close = () => {
    if (state === "loading") return;
    onClose();
    reset();
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    setFileError("");

    if (attachments.length + selected.length > MAX_FILES) {
      setFileError(`Choose no more than ${MAX_FILES} files.`);
      event.target.value = "";
      return;
    }

    const oversized = selected.find((file) => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setFileError(`${oversized.name} is larger than 10 MB.`);
      event.target.value = "";
      return;
    }

    setAttachments((current) => [...current, ...selected]);
    event.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    setAttachments((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");

    try {
      await submitBusinessRequest({ ...form, attachments });
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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[120] max-h-[92vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <Dialog.Close
            disabled={state === "loading"}
            className="absolute right-5 top-5 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-zinc-800 dark:hover:text-white"
            aria-label="Close request form"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>

          {state === "success" ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <Dialog.Title className="mt-5 text-3xl font-bold text-zinc-950 dark:text-white">
                Request Received
              </Dialog.Title>
              <Dialog.Description className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Thank you for telling us what you need. Our customer success
                team will review your request, identify relevant talent, and
                contact you about the next step.
              </Dialog.Description>
              <button
                type="button"
                onClick={close}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C2185B] px-7 py-3 font-bold text-white hover:bg-[#A3154D]"
              >
                Done
              </button>
            </div>
          ) : state === "error" ? (
            <div className="py-8 text-center">
              <AlertCircle className="mx-auto h-14 w-14 text-red-600" />
              <Dialog.Title className="mt-5 text-3xl font-bold text-zinc-950 dark:text-white">
                Your Message Was Not Sent
              </Dialog.Title>
              <Dialog.Description className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Something went wrong while sending your message. Please check
                your details and try again.
              </Dialog.Description>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setState("form")}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C2185B] px-7 py-3 font-bold text-white hover:bg-[#A3154D]"
                >
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-300 px-7 py-3 font-bold text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="pr-10">
                <Dialog.Title className="text-3xl font-bold text-zinc-950 dark:text-white">
                  Tell Us What You Need
                </Dialog.Title>
                <Dialog.Description className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Share your project, role, or staffing need. Our customer
                  success team will review your request, identify relevant
                  talent, and contact you about the next step.
                </Dialog.Description>
              </div>

              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      required
                      autoComplete="name"
                      minLength={2}
                      maxLength={120}
                      value={form.fullName}
                      onChange={(event) =>
                        setForm({ ...form, fullName: event.target.value })
                      }
                      // placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Work Email">
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={form.workEmail}
                      onChange={(event) =>
                        setForm({ ...form, workEmail: event.target.value })
                      }
                      // placeholder="Enter your work email address"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Company or Organization" optional>
                  <input
                    autoComplete="organization"
                    maxLength={160}
                    value={form.company}
                    onChange={(event) =>
                      setForm({ ...form, company: event.target.value })
                    }
                    // placeholder="Enter your company or organization name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Subject">
                  <input
                    required
                    minLength={5}
                    maxLength={200}
                    value={form.subject}
                    onChange={(event) =>
                      setForm({ ...form, subject: event.target.value })
                    }
                    // placeholder="For example: Product designer needed for a six-week project"
                    className={inputClass}
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    required
                    minLength={20}
                    maxLength={10000}
                    rows={6}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    placeholder="Tell us about the project or role, required skills, expected hours, timeline, budget, and any other important details."
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="business-request-attachments"
                      className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                    >
                      Attachments — Optional
                    </label>
                    <span className="text-xs text-zinc-500">
                      Up to 5 files · 10 MB each
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Attach your scope of work, role description, project brief,
                    or other helpful documents.
                  </p>
                  <input
                    ref={fileInputRef}
                    id="business-request-attachments"
                    type="file"
                    multiple
                    accept={acceptedFileTypes}
                    onChange={handleFiles}
                    className="sr-only"
                  />
                  <label
                    htmlFor="business-request-attachments"
                    className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-bold text-zinc-800 transition-colors hover:border-[#C2185B] hover:text-[#C2185B] dark:border-zinc-700 dark:text-zinc-100"
                  >
                    <Paperclip className="h-4 w-4" />
                    Choose Files
                  </label>

                  {fileError && (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      {fileError}
                    </p>
                  )}

                  {attachments.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {attachments.map((file, index) => (
                        <li
                          key={`${file.name}-${file.lastModified}-${index}`}
                          className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
                        >
                          <FileText className="h-4 w-4 shrink-0 text-[#C2185B]" />
                          <span className="min-w-0 flex-1 truncate text-sm text-zinc-700 dark:text-zinc-300">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-200 hover:text-red-600 dark:hover:bg-zinc-800"
                            aria-label={`Remove ${file.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
                    Please do not upload passwords, financial records, or other
                    highly sensitive information.
                  </div>
                </div>

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
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C2185B] px-7 py-3 font-bold text-white hover:bg-[#A3154D] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "loading" && (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    )}
                    {state === "loading"
                      ? "Sending your message…"
                      : "Send Message"}
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

function Field({
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
