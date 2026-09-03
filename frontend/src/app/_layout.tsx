import { Stack } from "expo-router";

import {
  AuthProvider,
  useAuth,
} from "../providers/AuthProvider";

import {
  OnboardingProvider,
  useOnboarding,
} from "../providers/OnboardingProvider";

import { AuthLoadingScreen } from "../components/common/AuthLoadingScreen";

function RootNavigator() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { hasCompletedOnboarding , isLoading:onboardingLoading, } = useOnboarding();

  if (authLoading || onboardingLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      {/* First-time users */}
      <Stack.Protected
        guard={!hasCompletedOnboarding && !isAuthenticated}
      >
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      {/* Users who have completed onboarding but aren't logged in */}
      <Stack.Protected
        guard={hasCompletedOnboarding && !isAuthenticated}
      >
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      {/* Logged-in users */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <RootNavigator />
      </OnboardingProvider>
    </AuthProvider>
  );
}
