import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const EmailFormFields = ({ setValue }) => (
  <>
    <View className="mb-5">
      <Label nativeID="email">Email</Label>
      <Input
        id="email"
        onChangeText={(text) => setValue("email", text)}
        placeholder="Enter email"
      />
    </View>
    <View className="mb-5">
      <Label nativeID="subject">Subject</Label>
      <Input
        id="subject"
        onChangeText={(text) => setValue("subject", text)}
        placeholder="Enter Subject"
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

export default EmailFormFields;
