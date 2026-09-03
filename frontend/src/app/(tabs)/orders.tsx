import { StyleSheet, Text } from "react-native";
import { Screen } from "../../components/common/screen";
import { theme } from "../../constants/theme";

export default function OrdersScreen() {
    return (<Screen style={styles.container}> <Text style={styles.title}>My orders</Text> <Text style={styles.subtitle}>
        Your purchases will appear here. </Text> </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: theme.colors.text,
    },

    subtitle: {
        marginTop: 8,
        fontSize: 15,
        color: theme.colors.textSecondary,
    },
});
