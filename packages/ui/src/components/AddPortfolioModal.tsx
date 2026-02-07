import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type AddPortfolioModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (portfolioName: string) => void;
};

export function AddPortfolioModal({
    visible,
    onClose,
    onSave,
}: AddPortfolioModalProps) {
    const [portfolioName, setPortfolioName] = useState("");
    const [error, setError] = useState("");

    const handleSave = () => {
        const trimmedName = portfolioName.trim();
        if (!trimmedName) {
            setError("Portfolio name is required");
            return;
        }

        onSave(trimmedName);
        setPortfolioName("");
        setError("");
        onClose();
    };

    const handleClose = () => {
        setPortfolioName("");
        setError("");
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <Pressable
                    className="flex-1 items-center justify-center"
                    onPress={handleClose}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                >
                    <Pressable
                        onPress={(e) => e.stopPropagation()}
                        className="w-[90%] max-w-md"
                    >
                        <View className="bg-dark-200 rounded-3xl border border-white/10 p-6">
                            <Text className="text-white text-[22px] font-semibold mb-4">
                                Add Portfolio
                            </Text>

                            <Text className="text-light-200 text-[14px] mb-2">
                                Portfolio Name
                            </Text>

                            <TextInput
                                value={portfolioName}
                                onChangeText={(text) => {
                                    setPortfolioName(text);
                                    setError("");
                                }}
                                placeholder="Enter portfolio name"
                                placeholderTextColor="#A8B5DB"
                                className="bg-dark-300 text-white text-[16px] px-4 py-3 rounded-xl border border-white/10 mb-2"
                                autoFocus
                            />

                            {error ? (
                                <Text className="text-[#FF5A7A] text-[12px] mb-4">
                                    {error}
                                </Text>
                            ) : null}

                            <View className="flex-row gap-3 mt-4">
                                <Pressable
                                    onPress={handleClose}
                                    className="flex-1 bg-dark-300 py-3 rounded-xl border border-white/10"
                                >
                                    <Text className="text-light-200 text-[16px] font-semibold text-center">
                                        Cancel
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={handleSave}
                                    className="flex-1 bg-accent py-3 rounded-xl"
                                >
                                    <Text className="text-white text-[16px] font-semibold text-center">
                                        Save
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    );
}
