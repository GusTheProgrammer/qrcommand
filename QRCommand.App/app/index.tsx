import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { LoginForm } from "~/components/LoginForm";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Input } from "~/components/ui/input";
import { H4 } from "~/components/ui/typography";

export default function Homepage() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "#22c55d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          headerTitle: () => <H4 className="text-muted"> Login</H4>,

          headerRight: () => <ThemeToggle />,
        }}
      />
      <LoginForm />
    </View>
  );
}
