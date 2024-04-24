import { useState } from "react";
import { View, Text } from "react-native";
import { LoginForm } from "~/components/LoginForm";
import { Input } from "~/components/ui/input";

export default function Tab() {
  const [value, setValue] = useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <LoginForm />
    </View>
  );
}
