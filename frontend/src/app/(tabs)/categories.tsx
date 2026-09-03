import { StyleSheet, Text } from "react-native";
import { Screen } from "../../components/common/screen";
import { theme } from "../../constants/theme";

export default function CategoriesScreen() {
    return (<Screen style={styles.container}> <Text style={styles.title}>Categories</Text> <Text style={styles.subtitle}>
        Explore products by category. </Text> </Screen>
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
