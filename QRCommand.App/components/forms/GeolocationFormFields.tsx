import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const GeolocationFormFields = ({ setValue }) => (
  <>
    <View className="mb-5">
      <Label nativeID="latitude">Latitude</Label>
      <Input
        id="latitude"
        onChangeText={(text) => setValue("latitude", text)}
        placeholder="Enter Latitude"
      />
    </View>
    <View className="mb-5">
      <Label nativeID="longitude">Longitude</Label>
      <Input
        id="longitude"
        onChangeText={(text) => setValue("longitude", text)}
        placeholder="Enter Longitude"
      />
    </View>
  </>
);

export default GeolocationFormFields;
