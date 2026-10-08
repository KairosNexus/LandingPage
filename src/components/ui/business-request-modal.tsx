"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
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
import {
  parseSowDictation,
  parseSowTranscript,
  submitBusinessRequest,
  type ParsedSowDictation,
} from "@/lib/api";

type SubmissionState = "form" | "review" | "loading" | "success" | "error";
type ActivePolicy = "terms" | "privacy" | null;

interface SpeechResult {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<SpeechResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
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
  selectedTalentId?: string | null;
  selectedTalentName?: string | null;
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
  selectedTalentId,
  selectedTalentName,
}: BusinessRequestModalProps) {
  const [form, setForm] = useState(initialForm);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [state, setState] = useState<SubmissionState>("form");
  const [fileError, setFileError] = useState("");
  const [listening, setListening] = useState(false);
  const [parsingDictation, setParsingDictation] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [dictationWarnings, setDictationWarnings] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [dictationTranscript, setDictationTranscript] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [activePolicy, setActivePolicy] = useState<ActivePolicy>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const liveTranscriptRef = useRef("");
  const messageBeforeDictationRef = useRef("");
  const discardRecordingRef = useRef(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const policyFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    return () => {
      discardRecordingRef.current = true;
      if (recorderRef.current?.state === "recording")
        recorderRef.current.stop();
      recognitionRef.current?.stop();
      audioStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!activePolicy) return;

    modalContentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activePolicy]);

  const openPolicy = (policy: Exclude<ActivePolicy, null>) => {
    setActivePolicy(policy);
    modalContentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const applyDraft = (draft: ParsedSowDictation) => {
    setForm((current) => ({
      ...current,
      subject: draft.subject,
      message: draft.message,
    }));
    setDictationWarnings(draft.warnings);
    setShowRecommendations(false);
    setDictationTranscript(draft.transcript);
  };

  const parseRecording = async (audio: Blob) => {
    setParsingDictation(true);
    try {
      const transcript = [
        messageBeforeDictationRef.current,
        liveTranscriptRef.current.trim(),
      ]
        .filter(Boolean)
        .join("\n\n");
      const draft =
        transcript.length >= 10
          ? await parseSowTranscript(transcript)
          : await parseSowDictation(audio);
      applyDraft(draft);
    } catch (error: unknown) {
      setSpeechError(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Could not parse dictation. Try again or type your description.",
      );
    } finally {
      setParsingDictation(false);
    }
  };

  const stopDictation = (parse = true) => {
    discardRecordingRef.current = !parse;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setListening(false);
  };

  const startDictation = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setSpeechError(
        "Dictation is unavailable in this browser. Type your description instead.",
      );
      return;
    }
    setSpeechError("");
    setDictationWarnings([]);
    setShowRecommendations(false);
    setDictationTranscript("");
    liveTranscriptRef.current = "";
    messageBeforeDictationRef.current = form.message.trim();
    discardRecordingRef.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredTypes = [
        "audio/webm;codecs=opus",
        "audio/mp4",
        "audio/ogg;codecs=opus",
      ];
      const mimeType = preferredTypes.find((type) =>
        MediaRecorder.isTypeSupported(type),
      );
      const recorder = new MediaRecorder(stream, {
        ...(mimeType ? { mimeType } : {}),
        audioBitsPerSecond: 48_000,
      });
      recorderRef.current = recorder;
      audioStreamRef.current = stream;
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) audioChunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const audio = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        stream.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
        if (!discardRecordingRef.current && audio.size) {
          window.setTimeout(() => void parseRecording(audio), 300);
        }
      };

      const browser = window as SpeechRecognitionWindow;
      const Recognition =
        browser.SpeechRecognition || browser.webkitSpeechRecognition;
      if (Recognition) {
        const recognition = new Recognition();
        recognition.lang = "en-NG";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event) => {
          const finalParts: string[] = [];
          const interimParts: string[] = [];
          Array.from(event.results).forEach((result) => {
            const text = result[0].transcript.trim();
            if (!text) return;
            (result.isFinal ? finalParts : interimParts).push(text);
          });
          liveTranscriptRef.current = finalParts.join(" ").trim();
          const visibleTranscript = [...finalParts, ...interimParts]
            .join(" ")
            .trim();
          setForm((current) => ({
            ...current,
            message: [messageBeforeDictationRef.current, visibleTranscript]
              .filter(Boolean)
              .join("\n\n")
              .slice(0, 10_000),
          }));
        };
        recognition.onerror = (event) => {
          if (!["no-speech", "aborted"].includes(event.error)) {
            setSpeechError(
              "Live transcription unavailable. Audio will still be processed.",
            );
          }
        };
        recognitionRef.current = recognition;
        recognition.start();
      }
      recorder.start(1000);
      setListening(true);
    } catch {
      setSpeechError(
        "Could not access microphone. Check permission or type your description.",
      );
    }
  };

  const reset = () => {
    stopDictation(false);
    setForm(initialForm);
    setAttachments([]);
    setState("form");
    setFileError("");
    setSpeechError("");
    setDictationWarnings([]);
    setShowRecommendations(false);
    setDictationTranscript("");
    setTermsAccepted(false);
    setConsentError("");
    setActivePolicy(null);
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
      current.filter((_, index) => index !== indexToRemove),
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!termsAccepted) {
      setConsentError(
        "You must accept the Terms of Service and Privacy Policy before submitting your Scope of Work.",
      );
      return;
    }
    setConsentError("");
    if (state === "form") {
      if (listening) {
        stopDictation();
        return;
      }
      if (parsingDictation) return;
      setState("review");
      return;
    }
    if (state !== "review") return;
    setState("loading");

    try {
      await submitBusinessRequest({
        ...form,
        selectedTalentId: selectedTalentId || undefined,
        message: selectedTalentName
          ? `Selected talent: ${selectedTalentName}\n\n${form.message}`
          : form.message,
        attachments,
      });
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
        <Dialog.Content
          ref={modalContentRef}
          className="fixed left-1/2 top-1/2 z-[120] max-h-[92vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          {activePolicy && (
            <div className="absolute inset-0 z-20 flex min-h-full flex-col rounded-[2rem] bg-white dark:bg-zinc-950">
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800 sm:px-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C00079] dark:text-[#FEC2E8]">
                    Legal document
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-zinc-950 dark:text-white">
                    {activePolicy === "terms"
                      ? "Terms of Service"
                      : "Privacy Policy"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePolicy(null)}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-[#DE028E] hover:bg-pink-50 hover:text-[#C00079] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE028E] focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-[#FEC2E8] dark:focus-visible:ring-offset-zinc-950"
                  aria-label="Close legal document"
                  title="Close"
                >
                  <X className="h-7 w-7" aria-hidden="true" />
                </button>
              </div>
              <iframe
                key={activePolicy}
                ref={policyFrameRef}
                src={
                  activePolicy === "terms"
                    ? "/embed/terms-of-service"
                    : "/embed/privacy-policy"
                }
                title={
                  activePolicy === "terms"
                    ? "Terms of Service"
                    : "Privacy Policy"
                }
                onLoad={() =>
                  policyFrameRef.current?.contentWindow?.scrollTo(0, 0)
                }
                className="min-h-[68vh] w-full flex-1 rounded-b-[2rem] bg-white dark:bg-zinc-950 sm:min-h-[72vh]"
              />
              <div className="flex shrink-0 justify-end border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950 sm:px-7">
                {activePolicy === "terms" ? (
                  <button
                    type="button"
                    onClick={() => openPolicy("privacy")}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#DE028E] px-6 py-3 font-bold text-white transition-colors hover:bg-[#C00079] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE028E] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 sm:w-auto"
                  >
                    Next: Privacy Policy
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setTermsAccepted(true);
                      setConsentError("");
                      setActivePolicy(null);
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#DE028E] px-6 py-3 font-bold text-white transition-colors hover:bg-[#C00079] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE028E] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 sm:w-auto"
                  >
                    Agree &amp; Continue
                  </button>
                )}
              </div>
            </div>
          )}
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
                Check these exact details before sending. Edit anything missing
                or incorrect.
              </Dialog.Description>
              {selectedTalentName && (
                <p className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-sm text-zinc-800 dark:border-pink-900/60 dark:bg-pink-950/30 dark:text-zinc-100">
                  <strong>Selected talent:</strong> {selectedTalentName}
                </p>
              )}
              <div className="break-words rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p>
                  <strong>From:</strong> {form.fullName} · {form.workEmail}
                </p>
                {form.company && (
                  <p>
                    <strong>Organization:</strong> {form.company}
                  </p>
                )}
                <p>
                  <strong>Subject:</strong> {form.subject}
                </p>
                <p>
                  <strong>Attachments:</strong>{" "}
                  {attachments.length
                    ? attachments.map((file) => file.name).join(", ")
                    : "None"}
                </p>
                <p>
                  <strong>Terms and policies:</strong> Accepted
                </p>
              </div>
              <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap break-words rounded-xl border border-zinc-200 bg-white p-4 font-sans text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                {form.message}
              </pre>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setState("form")}
                  className="min-h-12 rounded-xl border border-zinc-300 px-6 py-3 font-bold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                >
                  Edit Details
                </button>
                <button
                  type="submit"
                  disabled={!termsAccepted}
                  className="min-h-12 rounded-xl bg-[#DE028E] px-7 py-3 font-bold text-white hover:bg-[#C00079] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Scope of Work
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
                  {selectedTalentName
                    ? "Submit your scope of work, and our team will coordinate the match and introduction."
                    : "Share your project, role, or staffing need. Our customer success team will review your request, identify relevant talent, and contact you about the next step."}
                </Dialog.Description>
              </div>

              {selectedTalentName && (
                <div className="mt-6 rounded-xl border border-pink-200 bg-pink-50 p-4 dark:border-pink-900/60 dark:bg-pink-950/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C00079] dark:text-[#FEC2E8]">
                    Selected talent
                  </p>
                  <p className="mt-1 text-lg font-bold text-zinc-950 dark:text-white">
                    {selectedTalentName}
                  </p>
                </div>
              )}

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
                    <label
                      htmlFor="business-request-message"
                      className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                    >
                      Message
                    </label>
                    <button
                      type="button"
                      disabled={parsingDictation}
                      onClick={() =>
                        listening ? stopDictation() : void startDictation()
                      }
                      className="inline-flex h-12 items-center gap-3 rounded-lg border border-zinc-300 px-4 py-3 text-base font-bold text-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-100"
                      aria-pressed={listening}
                    >
                      {parsingDictation ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Microphone className="h-5 w-5" />
                      )}
                      {parsingDictation
                        ? "Gemini is drafting…"
                        : listening
                          ? "Stop & parse"
                          : "Dictate with AI"}
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
                    placeholder="Tell us about the project or role, required skills, expected hours, timeline, budget, and any other important details. You can type or dictate with AI."
                    className={`${inputClass} resize-y`}
                  />
                  {listening && (
                    <div
                      className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#C00079]"
                      role="status"
                      aria-label="Recording. Your words will appear in the message field."
                    >
                      <span
                        className="flex h-6 items-center gap-1"
                        aria-hidden="true"
                      >
                        {[9, 17, 23, 14, 20, 11, 18].map((height, index) => (
                          <span
                            key={index}
                            className="voice-wave-bar w-1 rounded-full bg-current"
                            style={{
                              height,
                              animationDelay: `${index * 110}ms`,
                            }}
                          />
                        ))}
                      </span>
                      <span>
                        Recording. Stop when finished; Gemini will structure
                        your SOW.
                      </span>
                    </div>
                  )}
                  {speechError && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {speechError}
                    </p>
                  )}
                  {dictationWarnings.length > 0 && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          setShowRecommendations((current) => !current)
                        }
                        aria-expanded={showRecommendations}
                        aria-controls="ai-sow-recommendations"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-900 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/70"
                      >
                        <AlertCircle className="h-5 w-5" aria-hidden="true" />
                        AI recommendations ({dictationWarnings.length})
                      </button>
                      {showRecommendations && (
                        <div
                          id="ai-sow-recommendations"
                          className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
                        >
                          <p className="font-bold">
                            Consider adding or clarifying:
                          </p>
                          <ul className="mt-1 list-inside list-disc">
                            {dictationWarnings.map((warning) => (
                              <li key={warning}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {dictationTranscript && (
                    <details className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                      <summary className="cursor-pointer font-bold">
                        View dictation transcript
                      </summary>
                      <p className="mt-2 whitespace-pre-wrap">
                        {dictationTranscript}
                      </p>
                    </details>
                  )}
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

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(event) => {
                        setTermsAccepted(event.target.checked);
                        if (event.target.checked) setConsentError("");
                      }}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#DE028E]"
                    />
                    <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      I have reviewed and agree to the{" "}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          openPolicy("terms");
                        }}
                        className="font-bold text-[#C00079] underline-offset-2 hover:underline dark:text-[#FEC2E8]"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          openPolicy("privacy");
                        }}
                        className="font-bold text-[#C00079] underline-offset-2 hover:underline dark:text-[#FEC2E8]"
                      >
                        Privacy Policy
                      </button>
                      .
                    </span>
                  </label>
                  {consentError && (
                    <p
                      className="mt-2 text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {consentError}
                    </p>
                  )}
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
                    disabled={
                      state === "loading" ||
                      !termsAccepted ||
                      listening ||
                      parsingDictation
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#DE028E] px-7 py-3 font-bold text-white hover:bg-[#C00079] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "loading" && (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    )}
                    {parsingDictation
                      ? "Preparing Scope of Work…"
                      : state === "loading"
                        ? "Sending your message…"
                        : "Review Scope of Work"}
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
