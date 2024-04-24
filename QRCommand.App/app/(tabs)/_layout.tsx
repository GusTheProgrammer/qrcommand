import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Plus, QrCode } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="qrCodes"
        options={{
          title: "QR Codes ",
          headerShown: false,
          tabBarIcon: ({ color }) => <QrCode size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="qrCodeForm"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color }) => <Plus size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
