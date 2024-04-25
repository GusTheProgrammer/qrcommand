import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const UrlFormFields = ({ setValue }) => (
  <View className="mb-5">
    <Label nativeID="url">URL</Label>
    <Input
      id="url"
      onChangeText={(text) => setValue("url", text)}
      placeholder="Enter URL"
    />
  </View>
);

export default UrlFormFields;
