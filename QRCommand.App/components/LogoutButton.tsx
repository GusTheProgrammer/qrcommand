import React from "react";
import { View, Button, Alert, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { cn } from "~/lib/utils";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Clear all items stored in AsyncStorage (or specify keys to remove specific items)
      await AsyncStorage.clear();

      Alert.alert("Logout Successful", "You have been logged out.");
      // Redirect user to home page
      router.replace("/");
    } catch (error) {
      // Handle errors here if any
      Alert.alert("Logout Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <Pressable
      onPress={handleLogout}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            "flex-1 aspect-square pt-0.5 justify-center items-start web:px-5",
            pressed && "opacity-70"
          )}
        >
          <LogOut
            className="text-foreground"
            color="red"
            size={20}
            strokeWidth={1.25}
          />
        </View>
      )}
    </Pressable>
  );
};

export default LogoutButton;
