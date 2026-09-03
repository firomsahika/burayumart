import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

import { authClient } from "../lib/auth-client";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message);
      }

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout failed:", error);

      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );

      throw error;
    }
  };

  return {
    logout,
  };
}