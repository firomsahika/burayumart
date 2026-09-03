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
import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShoppingBag,
} from "lucide-react-native";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppInput } from "../../components/common/AppInput";
import { AppButton } from "../../components/common/AppButton";
import { theme } from "../../constants/theme";
import { authClient } from "../../lib/auth-client";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const passwordRef = useRef<TextInput>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (values: LoginForm) => {
        setServerError("");

        await Haptics.impactAsync(
            Haptics.ImpactFeedbackStyle.Light
        );

        const { error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
            rememberMe: true,
        });

        if (error) {
            await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );

            setServerError(
                error.message || "Unable to sign in. Please try again."
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
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        style={styles.backButton}
                    >
                        <ArrowLeft
                            size={22}
                            color={theme.colors.text}
                        />
                    </Pressable>

                    <View style={styles.brandMark}>
                        <ShoppingBag
                            size={20}
                            color={theme.colors.white}
                            strokeWidth={2.2}
                        />
                    </View>
                </View>

                <View style={styles.heading}>
                    <Text style={styles.title}>
                        Welcome back
                    </Text>

                    <Text style={styles.subtitle}>
                        Sign in to continue shopping and selling
                        on BurayuMart.
                    </Text>
                </View>

                {serverError ? (
                    <View
                        style={styles.errorBanner}
                        accessibilityRole="alert"
                    >
                        <Text style={styles.errorBannerText}>
                            {serverError}
                        </Text>
                    </View>
                ) : null}

                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }: { field: ControllerRenderProps<LoginForm, "email"> }) => (
                            <AppInput
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
                        render={({ field }: { field: ControllerRenderProps<LoginForm, "password"> }) => (
                            <AppInput
                                ref={passwordRef}
                                label="Password"
                                placeholder="Enter your password"
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
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        hitSlop={10}
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
                                autoComplete="password"
                                textContentType="password"
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit(onSubmit)}
                            />
                        )}
                    />

                    <Pressable
                        onPress={() =>
                            router.push("/(auth)/forgot-password")
                        }
                        style={styles.forgotButton}
                        accessibilityRole="button"
                    >
                        <Text style={styles.forgotText}>
                            Forgot password?
                        </Text>
                    </Pressable>

                    <AppButton
                        title="Sign in"
                        onPress={handleSubmit(onSubmit)}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        style={styles.submitButton}
                    />
                </View>

                <View style={styles.dividerRow}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>
                        OR
                    </Text>
                    <View style={styles.divider} />
                </View>

                <Pressable
                    onPress={() => {
                        // Google OAuth will be wired after
                        // email/password authentication is verified.
                    }}
                    style={styles.googleButton}
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Google"
                >
                    <Text style={styles.googleG}>G</Text>
                    <Text style={styles.googleText}>
                        Continue with Google
                    </Text>
                </Pressable>

                <View style={styles.signupRow}>
                    <Text style={styles.signupPrompt}>
                        Don't have an account?
                    </Text>

                    <Pressable
                        onPress={() =>
                            router.push("/(auth)/register")
                        }
                        accessibilityRole="link"
                    >
                        <Text style={styles.signupLink}>
                            Create account
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

    brandMark: {
        width: 42,
        height: 42,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
    },

    heading: {
        marginTop: 42,
        marginBottom: 32,
    },

    title: {
        fontSize: 32,
        lineHeight: 39,
        fontWeight: "800",
        letterSpacing: -0.8,
        color: theme.colors.text,
    },

    subtitle: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 24,
        color: theme.colors.textSecondary,
        maxWidth: 350,
    },

    form: {
        width: "100%",
    },

    errorBanner: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: theme.radius.md,
        backgroundColor: "#FDECEC",
        marginBottom: 18,
    },

    errorBannerText: {
        color: theme.colors.error,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "500",
    },

    forgotButton: {
        alignSelf: "flex-end",
        marginTop: -4,
        marginBottom: 20,
    },

    forgotText: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },

    submitButton: {
        width: "100%",
    },

    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 26,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.border,
    },

    dividerText: {
        marginHorizontal: 14,
        fontSize: 12,
        fontWeight: "700",
        color: theme.colors.textMuted,
    },

    googleButton: {
        height: 56,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    googleG: {
        fontSize: 20,
        fontWeight: "800",
        marginRight: 10,
        color: "#4285F4",
    },

    googleText: {
        fontSize: 15,
        fontWeight: "700",
        color: theme.colors.text,
    },

    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
        paddingTop: 32,
    },

    signupPrompt: {
        color: theme.colors.textSecondary,
        fontSize: 14,
    },

    signupLink: {
        marginLeft: 5,
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: "800",
    },
});