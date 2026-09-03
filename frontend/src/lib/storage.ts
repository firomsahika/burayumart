import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
HAS_SEEN_ONBOARDING: "burayumart.hasSeenOnboarding",
} as const;

export async function hasSeenOnboarding(): Promise<boolean> {
const value = await AsyncStorage.getItem(
STORAGE_KEYS.HAS_SEEN_ONBOARDING
);

return value === "true";
}

export async function markOnboardingComplete(): Promise<void> {
await AsyncStorage.setItem(
STORAGE_KEYS.HAS_SEEN_ONBOARDING,
"true"
);
}

export async function resetOnboarding(): Promise<void> {
await AsyncStorage.removeItem(
STORAGE_KEYS.HAS_SEEN_ONBOARDING
);
}
