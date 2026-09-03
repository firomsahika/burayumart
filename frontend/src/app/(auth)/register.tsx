import React, { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { AppButton } from "@/components/common/AppButton";
import {
    ArrowLeft,
    Check,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    UserRound,
} from "lucide-react-native";
import { Controller, useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppInput } from "../../components/common/AppInput";
import { theme } from "../../constants/theme";
import { authClient } from "../../lib/auth-client";

const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Enter your full name"),

        email: z
            .string()
            .trim()
            .email("Enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z
            .string()
            .min(1, "Confirm your password"),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [serverError, setServerError] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (values: RegisterForm) => {
        setServerError("");

        await Haptics.impactAsync(
            Haptics.ImpactFeedbackStyle.Light
        );

        const { error } = await authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
        });

        if (error) {
            await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );

            setServerError(
                error.message ||
                "Unable to create your account. Please try again."
            );

            return;
        }

        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );

        router.replace("/(tabs)");
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={
                Platform.OS === "ios" ? "padding" : "height"
            }
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <ArrowLeft
                            size={22}
                            color={theme.colors.text}
                        />
                    </Pressable>

                    <View style={styles.stepBadge}>
                        <Check
                            size={16}
                            color={theme.colors.primary}
                        />
                        <Text style={styles.stepText}>
                            Join BurayuMart
                        </Text>
                    </View>
                </View>

                <View style={styles.heading}>
                    <Text style={styles.title}>
                        Create your account
                    </Text>

                    <Text style={styles.subtitle}>
                        Shop nearby products or start selling to
                        customers across Burayu.
                    </Text>
                </View>

                {serverError ? (
                    <View
                        style={styles.errorBanner}
                        accessibilityRole="alert"
                    >
                        <Text style={styles.errorText}>
                            {serverError}
                        </Text>
                    </View>
                ) : null}

                <Controller
                    control={control}
                    name="name"
                    render={({ field }: { field: ControllerRenderProps<RegisterForm, "name"> }) => (
                        <AppInput
                            label="Full name"
                            placeholder="Your full name"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.name?.message}
                            leftIcon={
                                <UserRound
                                    size={20}
                                    color={theme.colors.textMuted}
                                />
                            }
                            autoCapitalize="words"
                            autoComplete="name"
                            textContentType="name"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailRef.current?.focus()
                            }
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field }: { field: ControllerRenderProps<RegisterForm, "email"> }) => (
                        <AppInput
                            ref={emailRef}
                            label="Email address"
                            placeholder="you@example.com"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.email?.message}
                            leftIcon={
                                <Mail
                                    size={20}
                                    color={theme.colors.textMuted}
                                />
                            }
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordRef.current?.focus()
                            }
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field }: { field: ControllerRenderProps<RegisterForm, "password"> }) => (
                        <AppInput
                            ref={passwordRef}
                            label="Password"
                            placeholder="At least 8 characters"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.password?.message}
                            leftIcon={
                                <LockKeyhole
                                    size={20}
                                    color={theme.colors.textMuted}
                                />
                            }
                            rightIcon={
                                <Pressable
                                    onPress={() =>
                                        setShowPassword((current) => !current)
                                    }
                                    hitSlop={10}
                                    accessibilityRole="button"
                                    accessibilityLabel={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={21}
                                            color={theme.colors.textMuted}
                                        />
                                    ) : (
                                        <Eye
                                            size={21}
                                            color={theme.colors.textMuted}
                                        />
                                    )}
                                </Pressable>
                            }
                            secureTextEntry={!showPassword}
                            autoComplete="new-password"
                            textContentType="newPassword"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                confirmPasswordRef.current?.focus()
                            }
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }: { field: ControllerRenderProps<RegisterForm, "confirmPassword"> }) => (
                        <AppInput
                            ref={confirmPasswordRef}
                            label="Confirm password"
                            placeholder="Enter your password again"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.confirmPassword?.message}
                            leftIcon={
                                <LockKeyhole
                                    size={20}
                                    color={theme.colors.textMuted}
                                />
                            }
                            rightIcon={
                                <Pressable
                                    onPress={() =>
                                        setShowConfirmPassword(
                                            (current) => !current
                                        )
                                    }
                                    hitSlop={10}
                                    accessibilityRole="button"
                                    accessibilityLabel={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff
                                            size={21}
                                            color={theme.colors.textMuted}
                                        />
                                    ) : (
                                        <Eye
                                            size={21}
                                            color={theme.colors.textMuted}
                                        />
                                    )}
                                </Pressable>
                            }
                            secureTextEntry={!showConfirmPassword}
                            autoComplete="new-password"
                            textContentType="newPassword"
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit(onSubmit)}
                        />
                    )}
                />

                <Text style={styles.terms}>
                    By creating an account, you agree to our terms
                    and acknowledge our privacy policy.
                </Text>

                <AppButton
                    title="Create account"
                    onPress={handleSubmit(onSubmit)}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={styles.button}
                />

                <View style={styles.loginRow}>
                    <Text style={styles.loginPrompt}>
                        Already have an account?
                    </Text>

                    <Pressable
                        onPress={() =>
                            router.replace("/(auth)/login")
                        }
                        accessibilityRole="link"
                    >
                        <Text style={styles.loginLink}>
                            Sign in
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: Platform.OS === "ios" ? 18 : 24,
        paddingBottom: 36,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    stepBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primaryLight,
    },

    stepText: {
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: "700",
    },

    heading: {
        marginTop: 36,
        marginBottom: 28,
    },

    title: {
        fontSize: 31,
        lineHeight: 38,
        fontWeight: "800",
        letterSpacing: -0.8,
        color: theme.colors.text,
    },

    subtitle: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 24,
        color: theme.colors.textSecondary,
    },

    errorBanner: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: theme.radius.md,
        backgroundColor: "#FDECEC",
        marginBottom: 18,
    },

    errorText: {
        color: theme.colors.error,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "500",
    },

    terms: {
        fontSize: 12,
        lineHeight: 18,
        color: theme.colors.textMuted,
        marginTop: -2,
        marginBottom: 20,
    },

    button: {
        width: "100%",
    },

    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 26,
    },

    loginPrompt: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },

    loginLink: {
        marginLeft: 5,
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: "800",
    },
});
