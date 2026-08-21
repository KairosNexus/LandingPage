import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  integrations: [
    Sentry.replayIntegration(),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
  beforeSend(event) {
    const exceptions = event.exception?.values ?? [];
    const isMissingWebKitBridge = exceptions.some((exception) =>
      exception.value?.includes(
        "undefined is not an object (evaluating 'window.webkit.messageHandlers')",
      ),
    );
    const comesFromInjectedPageIntentScript = exceptions.some((exception) =>
      exception.stacktrace?.frames?.some(
        (frame) =>
          frame.function === "setupPageIntentMessage" &&
          frame.filename?.startsWith("about:"),
      ),
    );

    // Some iOS in-app browsers inject a native bridge script into the page.
    // Normal browser contexts do not expose that bridge; this is not app code.
    if (isMissingWebKitBridge && comesFromInjectedPageIntentScript) {
      return null;
    }

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
