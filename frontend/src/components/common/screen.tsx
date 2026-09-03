import React from "react";
import {
SafeAreaView,
StyleSheet,
ViewStyle,
} from "react-native";
import { colors } from "../../constants/colors";

interface ScreenProps {
children: React.ReactNode;
style?: ViewStyle;
}

export function Screen({ children, style }: ScreenProps) {
return (
<SafeAreaView style={[styles.container, style]}>
{children} </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: colors.background,
},
});
