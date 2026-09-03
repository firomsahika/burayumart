import { StyleSheet, Text } from "react-native";
import { Screen } from "../../components/common/screen";
import { theme } from "../../constants/theme";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";

export default function ProfileScreen() {
  
  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.replace("/(auth)/login");
  };

    return (<Screen style={styles.container}> <Text style={styles.title}>Profile</Text> <Text style={styles.subtitle}>
        Manage your account and selling activity. </Text> </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: theme.colors.text,
    },

    subtitle: {
        marginTop: 8,
        fontSize: 15,
        color: theme.colors.textSecondary,
    },
});
