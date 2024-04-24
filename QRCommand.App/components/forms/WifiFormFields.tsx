import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Switch } from "../ui/switch";
import { View } from "react-native";
import { Label } from "../ui/label";

const WifiFormFields = ({ setValue, getValues }) => {
  // State for the isWPA switch
  const [isWPA, setIsWPA] = useState(getValues("isWPA") || false);

  return (
    <>
      <View className="mb-5">
        <Label nativeID="ssid">SSID</Label>
        <Input
          id="ssid"
          onChangeText={(text) => setValue("ssid", text)}
          placeholder="Enter SSID"
        />
      </View>
      <View className="mb-5">
        <Label nativeID="password">Password</Label>
        <Input
          id="password"
          onChangeText={(text) => setValue("password", text)}
          placeholder="Enter Password"
        />
      </View>
      <View className="mb-5 flex-row items-center justify-between">
        <Label nativeID="isWPA">Is WPA</Label>
        <Switch
          id="isWPA"
          checked={isWPA}
          onCheckedChange={(checked) => {
            setIsWPA(checked);
            setValue("isWPA", checked); // Ensuring the form state is updated as well
          }}
        />
      </View>
    </>
  );
};

export default WifiFormFields;
