import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";

export function AuthLoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <View style={styles.logoInner} />
        </View>
      </View>

      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  logoInner: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },

  loader: {
    marginTop: 24,
  },
});
