"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  PiCheckCircle as CheckCircle2,
  PiFileText as FileText,
  PiMicrophone as Microphone,
  PiPaperclip as Paperclip,
  PiShieldWarning as ShieldAlert,
  PiSpinnerGap as Loader2,
  PiTrash as Trash2,
  PiWarningCircle as AlertCircle,
  PiX as X,
} from "react-icons/pi";
import { submitBusinessRequest } from "@/lib/api";

type SubmissionState = "form" | "review" | "loading" | "success" | "error";

interface SpeechResult {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { resultIndex: number; results: ArrayLike<SpeechResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
};

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
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const stopDictation = () => recognitionRef.current?.stop();

  const startDictation = () => {
    const browser = window as SpeechRecognitionWindow;
    const Recognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechError("Dictation is unavailable in this browser. Type your description instead.");
      return;
    }

    setSpeechError("");
    const recognition = new Recognition();
    recognition.lang = "en-NG";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spoken = Array.from(event.results)
        .slice(event.resultIndex)
        .filter((result) => result.isFinal)
        .map((result) => result[0].transcript.trim())
        .filter(Boolean)
        .join(" ");
      if (spoken) {
        setForm((current) => ({
          ...current,
          message: `${current.message.trim()} ${spoken}`.trim().slice(0, 10000),
        }));
      }
    };
    recognition.onerror = (event) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setSpeechError("Dictation stopped. Check microphone permission or type your description.");
      }
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
    } catch {
      recognitionRef.current = null;
      setSpeechError("Could not start dictation. Type your description instead.");
    }
  };

  const reset = () => {
    stopDictation();
    setForm(initialForm);
    setAttachments([]);
    setState("form");
    setFileError("");
    setSpeechError("");
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
    if (state === "form") {
      stopDictation();
      setState("review");
      return;
    }
    if (state !== "review") return;
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
        <style>{`
          @keyframes business-request-voice-wave {
            0%, 100% { transform: scaleY(0.45); }
            50% { transform: scaleY(1); }
          }
          .voice-wave-bar { animation: business-request-voice-wave 800ms ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .voice-wave-bar { animation: none; }
          }
        `}</style>
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
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#DE028E] px-7 py-3 font-bold text-white hover:bg-[#C00079]"
              >
                Done
              </button>
            </div>
          ) : state === "review" ? (
            <form onSubmit={submit} className="space-y-5">
              <Dialog.Title className="pr-10 text-3xl font-bold text-zinc-950 dark:text-white">
                Review Your Request
              </Dialog.Title>
              <Dialog.Description className="text-zinc-600 dark:text-zinc-300">
                Check these exact details before sending. Edit anything missing or incorrect.
              </Dialog.Description>
              <div className="break-words rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p><strong>From:</strong> {form.fullName} · {form.workEmail}</p>
                {form.company && <p><strong>Organization:</strong> {form.company}</p>}
                <p><strong>Subject:</strong> {form.subject}</p>
                <p><strong>Attachments:</strong> {attachments.length ? attachments.map((file) => file.name).join(", ") : "None"}</p>
              </div>
              <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap break-words rounded-xl border border-zinc-200 bg-white p-4 font-sans text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                {form.message}
              </pre>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setState("form")} className="min-h-12 rounded-xl border border-zinc-300 px-6 py-3 font-bold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100">
                  Edit Details
                </button>
                <button type="submit" className="min-h-12 rounded-xl bg-[#DE028E] px-7 py-3 font-bold text-white hover:bg-[#C00079]">
                  Confirm and Send
                </button>
              </div>
            </form>
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
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#DE028E] px-7 py-3 font-bold text-white hover:bg-[#C00079]"
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

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label htmlFor="business-request-message" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      Message
                    </label>
                    <button type="button" onClick={listening ? stopDictation : startDictation} className="inline-flex h-12 items-center gap-3 rounded-lg border border-zinc-300 px-4 py-3 text-base font-bold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100" aria-pressed={listening}>
                      <Microphone className="h-5 w-5" />
                      {listening ? "Stop dictation" : "Dictate"}
                    </button>
                  </div>
                  <textarea
                    id="business-request-message"
                    required
                    minLength={20}
                    maxLength={10000}
                    rows={6}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    placeholder="Tell us about the project or role, required skills, expected hours, timeline, budget, and any other important details. You can type or dictate your message."
                    className={`${inputClass} resize-y`}
                  />
                  {listening && (
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#C00079]" role="status" aria-label="Recording. Your words will appear in the message field.">
                      <span className="flex h-6 items-center gap-1" aria-hidden="true">
                        {[9, 17, 23, 14, 20, 11, 18].map((height, index) => (
                          <span key={index} className="voice-wave-bar w-1 rounded-full bg-current" style={{ height, animationDelay: `${index * 110}ms` }} />
                        ))}
                      </span>
                      <span>Listening. Your words will appear here.</span>
                    </div>
                  )}
                  {speechError && <p className="mt-2 text-sm text-red-600" role="alert">{speechError}</p>}
                </div>

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
                    className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-bold text-zinc-800 transition-colors hover:border-[#DE028E] hover:text-[#C00079] dark:border-zinc-700 dark:text-zinc-100 dark:hover:text-[#FEC2E8]"
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
                          <FileText className="h-4 w-4 shrink-0 text-[#DE028E]" />
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
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#DE028E] px-7 py-3 font-bold text-white hover:bg-[#C00079] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "loading" && (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    )}
                    {state === "loading"
                      ? "Sending your message…"
                      : "Review Request"}
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
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition focus:border-[#DE028E] focus:ring-2 focus:ring-[#DE028E]/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";

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
