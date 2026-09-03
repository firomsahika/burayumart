import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    Bell,
    Search,
    ShoppingCart,
} from "lucide-react-native";

import { Screen } from "../../components/common/screen";
import { theme } from "../../constants/theme";

export default function HomeScreen() {
    return (<Screen> <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
    > <View style={styles.header}> <View> <Text style={styles.greeting}>
        Good morning 👋 </Text>


        <Text style={styles.name}>
            Welcome to BurayuMart
        </Text>
    </View>

            <View style={styles.actions}>
                <View style={styles.iconButton}>
                    <Bell
                        size={21}
                        color={theme.colors.text}
                    />
                </View>

                <View style={styles.iconButton}>
                    <ShoppingCart
                        size={21}
                        color={theme.colors.text}
                    />
                </View>
            </View>
        </View>

        <View style={styles.search}>
            <Search
                size={20}
                color={theme.colors.textMuted}
            />

            <Text style={styles.searchText}>
                Search products...
            </Text>
        </View>

        <View style={styles.banner}>
            <Text style={styles.bannerSmall}>
                BURAYUMART
            </Text>

            <Text style={styles.bannerTitle}>
                Shop local.
                {"\n"}
                Discover more.
            </Text>

            <Text style={styles.bannerDescription}>
                Products from sellers around you.
            </Text>
        </View>

        <Text style={styles.sectionTitle}>
            Popular near you
        </Text>

        <Text style={styles.placeholder}>
            Product catalog coming next...
        </Text>
    </ScrollView>
    </Screen>


    );
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
    },

    greeting: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginBottom: 3,
    },

    name: {
        fontSize: 20,
        fontWeight: "800",
        color: theme.colors.text,
    },

    actions: {
        flexDirection: "row",
        gap: 8,
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: theme.colors.surface,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    search: {
        height: 52,
        borderRadius: 15,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        gap: 10,
        marginBottom: 22,
    },

    searchText: {
        color: theme.colors.textMuted,
        fontSize: 14,
    },

    banner: {
        borderRadius: 22,
        backgroundColor: theme.colors.primary,
        padding: 24,
        minHeight: 190,
        justifyContent: "center",
        marginBottom: 28,
    },

    bannerSmall: {
        color: "#B8DCEB",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.5,
        marginBottom: 8,
    },

    bannerTitle: {
        color: theme.colors.white,
        fontSize: 28,
        lineHeight: 33,
        fontWeight: "800",
        letterSpacing: -0.5,
        marginBottom: 10,
    },

    bannerDescription: {
        color: "#E5F3F8",
        fontSize: 14,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: theme.colors.text,
        marginBottom: 12,
    },

    placeholder: {
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
});
