import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const TextFormFields = ({ setValue }) => (
  <View className="mb-5">
    <Label nativeID="plainText">Text</Label>
    <Input
      id="plainText"
      onChangeText={(text) => setValue("plainText", text)}
      placeholder="Enter Text"
    />
  </View>
);

export default TextFormFields;
