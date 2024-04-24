import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SmsFormFields = ({ setValue }) => (
  <>
    <View className="mb-5">
      <Label nativeID="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        onChangeText={(text) => setValue("phoneNumber", text)}
        placeholder="Enter Phone Number"
      />
    </View>
    <View className="mb-5">
      <Label nativeID="message">Message</Label>
      <Input
        id="message"
        onChangeText={(text) => setValue("message", text)}
        placeholder="Enter Message"
      />
    </View>
  </>
);

export default SmsFormFields;
