import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ONBOARDING_KEY = "@burayumart/onboarding-complete";

interface OnboardingContextValue {
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOnboardingState() {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);

        setHasCompletedOnboarding(value === "true");
      } catch (error) {
        console.error(
          "Failed to load onboarding state:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadOnboardingState();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setHasCompletedOnboarding(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        isLoading,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );
  }

  return context;
}
