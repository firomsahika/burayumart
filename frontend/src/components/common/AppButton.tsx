import React from "react";
import {
ActivityIndicator,
Pressable,
StyleSheet,
Text,
ViewStyle,
} from "react-native";

import { theme } from "../../constants/theme";

interface AppButtonProps {
title: string;
onPress: () => void;
loading?: boolean;
disabled?: boolean;
variant?: "primary" | "secondary" | "outline";
style?: ViewStyle;
}

export function AppButton({
title,
onPress,
loading = false,
disabled = false,
variant = "primary",
style,
}: AppButtonProps) {
const isDisabled = disabled || loading;

return (
<Pressable
disabled={isDisabled}
onPress={onPress}
style={({ pressed }) => [
styles.base,
    variant === "primary" && styles.primary,
    variant === "secondary" && styles.secondary,
    variant === "outline" && styles.outline,

    pressed && !isDisabled && styles.pressed,
    isDisabled && styles.disabled,

    style,
  ]}
>
  {loading ? (
    <ActivityIndicator
      color={
        variant === "primary"
          ? theme.colors.white
          : theme.colors.primary
      }
    />
  ) : (
    <Text
      style={[
        styles.text,
        variant === "primary"
          ? styles.primaryText
          : styles.secondaryText,
      ]}
    >
      {title}
    </Text>
  )}
</Pressable>


);
}

const styles = StyleSheet.create({
base: {
height: 56,
borderRadius: theme.radius.lg,
alignItems: "center",
justifyContent: "center",
paddingHorizontal: theme.spacing.xl,
},

primary: {
backgroundColor: theme.colors.primary,
},

secondary: {
backgroundColor: theme.colors.primaryLight,
},

outline: {
backgroundColor: theme.colors.surface,
borderWidth: 1,
borderColor: theme.colors.border,
},

pressed: {
transform: [{ scale: 0.98 }],
},

disabled: {
opacity: 0.5,
},

text: {
fontSize: 16,
fontWeight: "700",
},

primaryText: {
color: theme.colors.white,
},

secondaryText: {
color: theme.colors.primary,
},
});
