import { UserRole } from "./api";
import { getStorageItem, removeStorageItem, setStorageItem } from "./storage";

export interface User {
  id?: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export function getStoredToken(): string | null {
  return getStorageItem("authToken");
}

export function getStoredUser(): User | null {
  const stored = getStorageItem("authUser");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setAuthData(token: string, user: User) {
  setStorageItem("authToken", token);
  setStorageItem("authUser", JSON.stringify(user));
}

export function clearAuthData() {
  removeStorageItem("authToken");
  removeStorageItem("authUser");
}

export function setAccountType(type: "talent" | "company") {
  setStorageItem("accountType", type);
}

export function getAccountType(): "talent" | "company" {
  return (getStorageItem("accountType") as "talent" | "company") || "talent";
}
