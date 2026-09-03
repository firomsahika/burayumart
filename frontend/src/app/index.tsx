import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Redirect } from "expo-router";

import { theme } from "../constants/theme";
import { hasSeenOnboarding } from "../lib/storage";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [seenOnboarding, setSeenOnboarding] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const seen = await hasSeenOnboarding();
        setSeenOnboarding(seen);

      } finally {
        setLoading(false);
      }
    }

    checkOnboarding();


  }, []);

  if (loading) {
    return (<View style={styles.splash}> <View style={styles.logo}> <Text style={styles.logoText}>B</Text> </View>


      <Text style={styles.brand}>
        BurayuMart
      </Text>

      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={styles.loader}
      />
    </View>
    );

  }

  if (!seenOnboarding) {
    return (<Redirect href="/(onboarding)" />
    );
  }

  return (<Redirect href="/(auth)/login" />
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 82,
    height: 82,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: theme.colors.white,
    fontSize: 44,
    fontWeight: "800",
  },

  brand: {
    marginTop: 18,
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },

  loader: {
    marginTop: 22,
  },
});
