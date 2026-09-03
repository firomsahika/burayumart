import React, {
    useRef,
    useState,
} from "react";

import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import { useOnboarding } from "../../providers/OnboardingProvider";

import { Screen } from "../../components/common/screen";
import { AppButton } from "../../components/common/AppButton";
import { OnboardingSlide } from "../../components/onboarding/OnboardingSlide";
import { OnboardingPagination } from "../../components/onboarding/OnboardingPagination";

import { onboardingSlides } from "../../constants/onboarding";
import { theme } from "../../constants/theme";
import { markOnboardingComplete } from "../../lib/storage";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
    const flatListRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { completeOnboarding } = useOnboarding();

    const isLastSlide =
        currentIndex === onboardingSlides.length - 1;

    const handleScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;


        const index = Math.round(offsetX / width);

        if (
            index !== currentIndex &&
            index >= 0 &&
            index < onboardingSlides.length
        ) {
            setCurrentIndex(index);

            Haptics.selectionAsync();
        }


    };

    const handleNext = () => {
        if (isLastSlide) {
            finishOnboarding();
            return;
        }


        flatListRef.current?.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
        });


    };

    const finishOnboarding = async () => {
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        );


        await completeOnboarding();
        router.replace("/(auth)/login");


    };

    const handleSkip = () => {
        finishOnboarding();
    };

    return (<Screen style={styles.screen}> <View style={styles.header}> <View style={styles.brand}> <View style={styles.logo}> <Text style={styles.logoText}>B</Text> </View>


        <Text style={styles.brandName}>
            BurayuMart
        </Text>
    </View>

        {!isLastSlide && (
            <Text
                style={styles.skip}
                onPress={handleSkip}
            >
                Skip
            </Text>
        )}
    </View>

        <FlatList
            ref={flatListRef}
            data={onboardingSlides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
                <View style={styles.slide}>
                    <OnboardingSlide
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                    />
                </View>
            )}
        />

        <View style={styles.footer}>
            <OnboardingPagination
                total={onboardingSlides.length}
                activeIndex={currentIndex}
            />

            <AppButton
                title={isLastSlide ? "Get started" : "Continue"}
                onPress={handleNext}
                style={styles.button}
            />

            <Text style={styles.location}>
                Burayu · Oromia · Ethiopia
            </Text>
        </View>
    </Screen>


    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 18,
        paddingBottom: 20,
    },

    header: {
        height: 58,
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    brand: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    logo: {
        width: 36,
        height: 36,
        borderRadius: 11,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    logoText: {
        color: theme.colors.white,
        fontSize: 20,
        fontWeight: "800",
    },

    brandName: {
        color: theme.colors.text,
        fontSize: 17,
        fontWeight: "800",
        letterSpacing: -0.3,
    },

    skip: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontWeight: "600",
        paddingVertical: 10,
        paddingHorizontal: 4,
    },

    slide: {
        width,
        flex: 1,
        justifyContent: "center",
    },

    footer: {
        paddingHorizontal: 24,
        alignItems: "center",
        gap: 18,
    },

    button: {
        width: "100%",
    },

    location: {
        color: theme.colors.textMuted,
        fontSize: 12,
        fontWeight: "500",
    },
});
