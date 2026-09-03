import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { theme } from "../../constants/theme";

interface OnboardingSlideProps {
    title: string;
    description: string;
    icon: React.ElementType;
}

export function OnboardingSlide({
    title,
    description,
    icon: Icon,
}: OnboardingSlideProps) {
    return (<View style={styles.container}> <View style={styles.illustrationOuter}> <View style={styles.illustrationInner}> <Icon
        size={76}
        strokeWidth={1.6}
        color={theme.colors.primary}
    /> </View> </View>


        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
            {description}
        </Text>
    </View>


    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 28,
    },

    illustrationOuter: {
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: theme.colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 52,
    },

    illustrationInner: {
        width: 172,
        height: 172,
        borderRadius: 86,
        backgroundColor: theme.colors.surface,
        alignItems: "center",
        justifyContent: "center",


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,

    },

    title: {
        fontSize: 30,
        lineHeight: 38,
        fontWeight: "800",
        color: theme.colors.text,
        textAlign: "center",
        letterSpacing: -0.6,
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        lineHeight: 25,
        color: theme.colors.textSecondary,
        textAlign: "center",
        maxWidth: 340,
    },
});
