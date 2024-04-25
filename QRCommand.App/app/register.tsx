import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { LoginForm } from "~/components/LoginForm";
import { RegisterForm } from "~/components/RegisterForm";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Input } from "~/components/ui/input";
import { H4 } from "~/components/ui/typography";

export default function Register() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Register",
          headerStyle: { backgroundColor: "#22c55d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          headerTitle: () => <H4 className="text-muted"> Register</H4>,

          headerRight: () => <ThemeToggle />,
        }}
      />
      <RegisterForm />
    </View>
  );
}
