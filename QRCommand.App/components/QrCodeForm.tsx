import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import useAxios from "~/hooks/useAxios";
import * as ToastPrimitive from "~/components/primitives/toast";
import { Portal } from "~/components/primitives/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./ui/button";
import { H1 } from "./ui/typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import EmailFormFields from "./forms/EmailFormFields";
import SmsFormFields from "./forms/SmsFormFields";
import WifiFormFields from "./forms/WifiFormFields";
import { Option } from "./primitives/select";

export function QrCodeForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      isPublic: true,
    },
  });
  const [selectedType, setSelectedType] = useState("text");
  const [isPublic, setIsPublic] = useState(true);
  const { fetchData } = useAxios("http://10.0.2.2:5083");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const onSubmit = async (data) => {
    const typeSpecificEndpoint = `/api/QRCodeGenerator/create/${selectedType.toLowerCase()}`;

    const requestData = { ...data };
    delete requestData.title;
    delete requestData.description;
    delete requestData.isPublic;
    delete requestData.content;

    try {
      // First API Call to generate QR Code
      const qrResponse = await fetchData({
        url: typeSpecificEndpoint,
        method: "post",
        data: requestData,
      });

      console.log(qrResponse);
      if (qrResponse && !qrResponse.error) {
        const saveResponse = await fetchData({
          url: "/api/qrcodes",
          method: "post",
          data: {
            title: data.title,
            description: data.description,
            content: qrResponse,
            isPublic: data.isPublic,
            type: selectedType,
          },
        });

        if (saveResponse && !saveResponse.error) {
          setToastMessage("QR Code created successfully!");
          setOpen(true);
        } else {
          throw new Error("Failed to save QR Code.");
        }
      } else {
        console.log(qrResponse);
        throw new Error("Failed to generate QR Code.");
      }
    } catch (error) {
      setToastMessage(`Operation failed: ${error.message}`);
      setOpen(true);
    }
  };

  useEffect(() => {
    register("title");
    register("description");
    register("content");
    setValue("isPublic", isPublic);
  }, [register, isPublic, selectedType]);

  const handleSelectChange = (dropdown: Option) => {
    setSelectedType(dropdown.value);
  };

  return (
    <>
      {open && (
        <Portal name="qr-form-toast">
          <View
            style={{ bottom: insets.bottom + 4 }}
            className="absolute w-full px-4"
          >
            <ToastPrimitive.Root
              open={open}
              onOpenChange={setOpen}
              className="bg-secondary border p-4 rounded-xl justify-between"
            >
              <ToastPrimitive.Title className="text-lg">
                {toastMessage}
              </ToastPrimitive.Title>
              <ToastPrimitive.Close className="px-4 py-2 border">
                <Text>Close</Text>
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          </View>
        </Portal>
      )}
      <ScrollView
        contentContainerStyle={{ padding: 20, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <H1 className="mb-3">Create QR Code</H1>

        <View className="mb-5">
          <Label nativeID="type">Type</Label>
          <Select
            id="type"
            defaultValue={{ value: "text", label: "Text" }}
            onValueChange={(dropdown) => handleSelectChange(dropdown)}
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Select a Type"
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-[250px]">
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem label="Text" value="text">
                  Text
                </SelectItem>
                <SelectItem label="Wifi" value="wifi">
                  Wifi
                </SelectItem>
                <SelectItem label="SMS" value="sms">
                  SMS
                </SelectItem>
                <SelectItem label="URL" value="url">
                  URL
                </SelectItem>
                <SelectItem label="Bookmark" value="bookmark">
                  Bookmark
                </SelectItem>
                <SelectItem label="Email" value="email">
                  Email
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>

        <View className="mb-5">
          <Label nativeID="title">Title</Label>
          <Input
            id="title"
            onChangeText={(text) => setValue("title", text)}
            placeholder="Enter title"
          />
        </View>
        <View className="mb-5">
          <Label nativeID="description">Description</Label>
          <Input
            id="description"
            onChangeText={(text) => setValue("description", text)}
            placeholder="Enter description"
          />
        </View>

        {selectedType === "wifi" && (
          <WifiFormFields setValue={setValue} getValues={getValues} />
        )}
        {selectedType === "email" && <EmailFormFields setValue={setValue} />}
        {selectedType === "sms" && <SmsFormFields setValue={setValue} />}

        <View className="mb-5 flex-row items-center justify-between">
          <Label nativeID="isPublic">Is Public?</Label>
          <Switch
            checked={isPublic}
            onCheckedChange={setIsPublic}
            nativeID="isPublic-switch"
          />
        </View>
        <Button
          onPress={handleSubmit(onSubmit)}
          className="bg-green-500 text-white py-2 rounded-lg"
        >
          <Text>Submit</Text>
        </Button>
      </ScrollView>
    </>
  );
}
