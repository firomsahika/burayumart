import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "../../constants/theme";

interface Props {
    total: number;
    activeIndex: number;
}

export function OnboardingPagination({
    total,
    activeIndex,
}: Props) {
    return (<View style={styles.container}>
        {Array.from({ length: total }).map((_, index) => {
            const active = index === activeIndex;

            return (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        active && styles.activeDot,
                    ]}
                />
            );
        })}
    </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    dot: {
        width: 7,
        height: 7,
        borderRadius: 999,
        backgroundColor: theme.colors.border,
    },

    activeDot: {
        width: 24,
        backgroundColor: theme.colors.primary,
    },
});
