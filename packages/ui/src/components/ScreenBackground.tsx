import React from "react";
import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenBackgroundProps = {
    children: React.ReactNode;
    backgroundImage?: any;
};

export function ScreenBackground({ children, backgroundImage }: ScreenBackgroundProps) {
    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={{ flex: 1, backgroundColor: "#030014" }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "rgba(3,0,20,0.78)" }}>
                    {children}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
