import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import useAxios from "~/hooks/useAxios";
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
import { router } from "expo-router";
import TextFormFields from "./forms/TextFormFields";
import GeolocationFormFields from "./forms/GeolocationFormFields";
import WhatsAppFormFields from "./forms/WhatsAppFormFields";
import UrlFormFields from "./forms/UrlFormFields";

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
  const { fetchData } = useAxios("http://165.22.124.130");
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const onSubmit = async (data) => {
    const isTextType = selectedType.toLowerCase() === "text";
    const typeSpecificEndpoint = isTextType
      ? `/api/qrcodegenerator/create` // Specific endpoint for 'text' type
      : `/api/QRCodeGenerator/create/${selectedType.toLowerCase()}`;

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
          Alert.alert("Success", "QR Code created successfully.");
          router.replace("/(tabs)/qrCodes");
        } else {
          throw new Error("Failed to save QR Code.");
        }
      } else {
        console.log(qrResponse);
        throw new Error("Failed to generate QR Code.");
      }
    } catch (error) {
      Alert.alert("Error", `Operation failed: ${error.message}`);
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
            <SelectContent insets={contentInsets} className="w-[250px] ">
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
                <SelectItem label="Email" value="email">
                  Email
                </SelectItem>
                <SelectItem label="WhatAapp" value="whatsapp">
                  WhatsApp
                </SelectItem>
                <SelectItem label="Geolocation" value="geolocation">
                  Geolocation
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>

        <View className="mb-5">
          <Label nativeID="title">Qr Code Title</Label>
          <Input
            id="title"
            onChangeText={(text) => setValue("title", text)}
            placeholder="Enter title"
          />
        </View>
        <View className="mb-5">
          <Label nativeID="description">QR Code Description</Label>
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
        {selectedType === "url" && <UrlFormFields setValue={setValue} />}
        {selectedType === "geolocation" && (
          <GeolocationFormFields setValue={setValue} />
        )}
        {selectedType === "whatsapp" && (
          <WhatsAppFormFields setValue={setValue} />
        )}
        {selectedType === "text" && <TextFormFields setValue={setValue} />}

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
