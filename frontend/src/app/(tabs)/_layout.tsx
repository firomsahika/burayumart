import { Tabs } from "expo-router";
import {
    Bell,
    Grid2X2,
    Home,
    Plus,
    ShoppingBag,
    User,
} from "lucide-react-native";

import { theme } from "../../constants/theme";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor:
                    theme.colors.primary,

                tabBarInactiveTintColor:
                    theme.colors.textMuted,

                tabBarStyle: {
                    height: 68,
                    paddingTop: 8,
                    paddingBottom: 10,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border,
                    backgroundColor: theme.colors.surface,
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Home color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="categories"
                options={{
                    title: "Categories",
                    tabBarIcon: ({ color, size }) => (
                        <Grid2X2 color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="sell"
                options={{
                    title: "Sell",
                    tabBarIcon: () => (
                        <Plus
                            color={theme.colors.white}
                            size={24}
                        />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: "700",
                        color: theme.colors.primary,
                    },
                    tabBarIconStyle: {
                        backgroundColor: theme.colors.primary,
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        marginTop: -18,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            />

            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingBag color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <User color={color} size={size} />
                    ),
                }}
            />
        </Tabs>


    );
}
