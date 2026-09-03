import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";

import { Screen } from "../../components/common/screen";
import { colors } from "../../constants/colors";

export default function WelcomeScreen() {
    return (<Screen style={styles.container}> <View style={styles.content}> <View style={styles.logoContainer}> <Text style={styles.logo}>B</Text> </View>

        <Text style={styles.title}>
            Your local marketplace.
        </Text>

        <Text style={styles.description}>
            Discover products from sellers around Burayu,
            shop with confidence, and sell what you have.
        </Text>
    </View>

        <View style={styles.bottom}>
            <Text style={styles.location}>
                Burayu, Oromia
            </Text>

            <View style={styles.button}>
                <Text
                    style={styles.buttonText}
                    onPress={() => router.push("/(onboarding)/discover")}
                >
                    Get started
                </Text>

                <ArrowRight
                    size={20}
                    color={colors.onPrimary}
                />
            </View>
        </View>
    </Screen>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        justifyContent: "space-between",
    },

    content: {
        flex: 1,
        justifyContent: "center",
    },

    logoContainer: {
        width: 72,
        height: 72,
        borderRadius: 22,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },

    logo: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.onPrimary,
    },

    title: {
        fontSize: 36,
        lineHeight: 44,
        fontWeight: "800",
        color: colors.text,
        maxWidth: 340,
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        lineHeight: 25,
        color: colors.textSecondary,
        maxWidth: 340,
    },

    bottom: {
        gap: 14,
    },

    location: {
        fontSize: 13,
        color: colors.textSecondary,
        textAlign: "center",
    },

    button: {
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    buttonText: {
        color: colors.onPrimary,
        fontSize: 16,
        fontWeight: "700",
    },
});
