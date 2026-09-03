import React, { forwardRef } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import { theme } from "../../constants/theme";

interface AppInputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(
    (
        {
            label,
            error,
            leftIcon,
            rightIcon,
            style,
            ...props
        },
        ref
    ) => {
        return (
            <View style={styles.wrapper}>
                {label && <Text style={styles.label}>{label}</Text>}

                <View
                    style={[
                        styles.container,
                        error && styles.errorContainer,
                    ]}
                >
                    {leftIcon && (
                        <View style={styles.leftIcon}>{leftIcon}</View>
                    )}

                    <TextInput
                        ref={ref}
                        style={[styles.input, style]}
                        placeholderTextColor={theme.colors.textMuted}
                        selectionColor={theme.colors.primary}
                        autoCorrect={false}
                        {...props}
                    />

                    {rightIcon && (
                        <View style={styles.rightIcon}>{rightIcon}</View>
                    )}
                </View>

                {error && (
                    <Text
                        accessibilityRole="alert"
                        style={styles.errorText}
                    >
                        {error}
                    </Text>
                )}
            </View>
        );
    }
);

AppInput.displayName = "AppInput";

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        marginBottom: theme.spacing.lg,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.text,
        marginBottom: 8,
    },

    container: {
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        paddingHorizontal: 16,
    },

    errorContainer: {
        borderColor: theme.colors.error,
    },

    leftIcon: {
        marginRight: 10,
    },

    rightIcon: {
        marginLeft: 8,
    },

    input: {
        flex: 1,
        minHeight: 54,
        fontSize: 16,
        color: theme.colors.text,
        paddingVertical: 0,
    },

    errorText: {
        fontSize: 13,
        color: theme.colors.error,
        marginTop: 6,
    },
});