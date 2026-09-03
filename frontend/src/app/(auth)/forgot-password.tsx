import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Mail, ShoppingBag } from "lucide-react-native";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppInput } from "../../components/common/AppInput";
import { AppButton } from "../../components/common/AppButton";
import { theme } from "../../constants/theme";

const forgotSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordScreen() {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotForm>({
        resolver: zodResolver(forgotSchema),
        defaultValues: { email: "" },
        mode: "onBlur",
    });

    const onSubmit = async (values: ForgotForm) => {
        setServerError("");
        // TODO: wire up password-reset API call
        console.log("Reset requested for:", values.email);
        setSubmitted(true);
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                        <ArrowLeft size={22} color={theme.colors.text} />
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
                    <Text style={styles.title}>Forgot password?</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </Text>
                </View>

                {submitted ? (
                    <View style={styles.successBanner} accessibilityRole="alert">
                        <Text style={styles.successText}>
                            Check your inbox — a reset link is on its way.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.form}>
                        {serverError ? (
                            <View style={styles.errorBanner} accessibilityRole="alert">
                                <Text style={styles.errorBannerText}>{serverError}</Text>
                            </View>
                        ) : null}

                        <Controller
                            control={control}
                            name="email"
                            render={({ field }: { field: ControllerRenderProps<ForgotForm, "email"> }) => (
                                <AppInput
                                    label="Email address"
                                    placeholder="you@example.com"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    error={errors.email?.message}
                                    leftIcon={
                                        <Mail size={20} color={theme.colors.textMuted} />
                                    }
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    textContentType="emailAddress"
                                    returnKeyType="send"
                                    onSubmitEditing={handleSubmit(onSubmit)}
                                />
                            )}
                        />

                        <AppButton
                            title="Send reset link"
                            onPress={handleSubmit(onSubmit)}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            style={styles.submitButton}
                        />
                    </View>
                )}
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
    successBanner: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        borderRadius: theme.radius.md,
        backgroundColor: "#EBF8F0",
    },
    successText: {
        color: "#1A7F45",
        fontSize: 15,
        lineHeight: 22,
        fontWeight: "500",
    },
    submitButton: {
        width: "100%",
        marginTop: 8,
    },
});
