import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { Alert, View } from "react-native";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import useAxios from "~/hooks/useAxios";

const QrCodeEditForm = ({ data, onRefresh }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { fetchData } = useAxios("http://165.22.124.130");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setIsPublic(data.isPublic);
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      content: data.content,
      isPublic: isPublic,
      type: data.type,
    };
    try {
      const response = await fetchData({
        url: `/api/QrCodes/${data.id}`,
        method: "PUT",
        data: payload,
      });
      console.log("response", response);
      if (!response.error) {
        Alert.alert("Success", "QR code updated successfully.");
        if (onRefresh) onRefresh();
      } else {
        Alert.alert("Error", "Failed to update QR code.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      Alert.alert("Error", `Failed to update QR code: ${error.message}`);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Card</DialogTitle>
      </DialogHeader>
      <View className="mb-5">
        <Label nativeID="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValue("title", text);
          }}
          placeholder="Enter title"
        />
      </View>
      <View className="mb-5">
        <Label nativeID="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setValue("description", text);
          }}
          placeholder="Enter description"
        />
      </View>
      <View className="mb-5 flex-row items-center justify-between">
        <Label nativeID="isPublic">Is Public?</Label>

        <Switch
          checked={isPublic}
          onCheckedChange={setIsPublic}
          nativeID="isPublic-switch"
        />
      </View>
      <DialogFooter>
        <DialogClose asChild>
          <Button onPress={handleSubmit(onSubmit)}>
            <Text>OK</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default QrCodeEditForm;
