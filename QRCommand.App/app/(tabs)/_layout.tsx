import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { QrCode } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qrCodes"
        options={{
          title: "QR Codes ",
          headerShown: false,
          tabBarIcon: ({ color }) => <QrCode size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
