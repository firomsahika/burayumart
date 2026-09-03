import { create } from "zustand";

interface AppState {
hasSeenOnboarding: boolean;
setHasSeenOnboarding: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
hasSeenOnboarding: false,

setHasSeenOnboarding: (value) =>
set({
hasSeenOnboarding: value,
}),
}));
