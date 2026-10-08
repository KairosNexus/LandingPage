export type SignupIntent = "talent" | "company";

const APP_URL = "https://app.kairosng.com";

export function getAppLoginUrl() {
  return `${APP_URL}/auth/login`;
}

export function getAppSignupUrl(intent: SignupIntent) {
  return `${APP_URL}/auth/onboarding?intent=${intent}`;
}
