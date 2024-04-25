import * as React from "react";
import { View, Image, Alert } from "react-native";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Menu, PenIcon, TrashIcon } from "./Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAxios from "~/hooks/useAxios";
import QrCodeEditForm from "./QrCodeEditForm";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { DownloadIcon } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export function QrCodeCard({ data, onRefresh }) {
  const { id, title, description, content, type, isPublic } = data;
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const { fetchData } = useAxios("http://165.22.124.130");
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const typeColorMap = {
    email: "bg-indigo-500",
    url: "bg-gray-600",
    text: "bg-red-500",
    wifi: "bg-orange-500",
    sms: "bg-yellow-500",
    geolocation: "bg-green-500",
    whatsapp: "bg-teal-500",
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this QR code?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const response = await fetchData({
              url: `/api/QrCodes/${id}`,
              method: "DELETE",
            });
            if (!response.error) {
              Alert.alert("Success", "QR code deleted successfully.");
              onRefresh();
            } else {
              Alert.alert("Error", "Failed to delete QR code.");
            }
          },
        },
      ]
    );
  };

  const handleDownload = async (base64String) => {
    const filename = `QRCode_${new Date().toISOString()}.png`;
    const filePath = FileSystem.documentDirectory + filename;

    try {
      const base64Data = base64String.includes("base64,")
        ? base64String.split("base64,")[1]
        : base64String;

      await FileSystem.writeAsStringAsync(filePath, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await saveFile(filePath);
    } catch (error) {
      console.error("Download failed: ", error);
      Alert.alert("Download Error", "Failed to download the QR code.");
    }
  };

  const saveFile = async (fileUri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync("Download");
        if (album == null) {
          await MediaLibrary.createAlbumAsync("Download", asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        Alert.alert(
          "Save successful",
          "QR code has been saved to your photos."
        );
      } else {
        Alert.alert(
          "Permissions needed",
          "Please allow access to the camera roll."
        );
      }
    } catch (error) {
      console.error("Saving to gallery failed: ", error);
      Alert.alert("Save Error", "Failed to save QR code to gallery.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-5 p-2 bg-secondary/30">
      <Card className="w-full max-w-sm p-2 rounded-l">
        <CardHeader className="flex-row justify-between items-center">
          <View>
            <CardTitle className="text-lg font-bold">
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </CardTitle>
            <Tooltip delayDuration={150}>
              <TooltipTrigger className="pb-0.5 active:opacity-50">
                <Text className="line-clamp-1">
                  {description.charAt(0).toUpperCase() + description.slice(1)}
                </Text>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                insets={contentInsets}
                className="py-2 px-4 shadow"
              >
                <Text className="native:text-lg">{description}</Text>
              </TooltipContent>
            </Tooltip>
          </View>
          <DropdownMenu
            open={open}
            onOpenChange={(newVal) => {
              setOpen(newVal);
              if (!newVal) {
                setOpenSub(false);
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Menu
                  className="text-foreground"
                  size={20}
                  strokeWidth={1.25}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-lg rounded-md p-2">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-48">
                        <View className="flex-row items-center justify-between w-full">
                          <Text>Edit Profile</Text>
                          <PenIcon
                            className="text-foreground"
                            size={15}
                            strokeWidth={1.25}
                            color="red"
                          />
                        </View>
                      </Button>
                    </DialogTrigger>
                    <QrCodeEditForm data={data} onRefresh={onRefresh} />
                  </Dialog>
                </DropdownMenuItem>

                {isPublic && (
                  <DropdownMenuItem>
                    <Button
                      variant="outline"
                      onPress={() => handleDownload(data.content)}
                      className="w-48"
                    >
                      <View className="flex-row items-center justify-between w-full">
                        <Text>Download</Text>
                        <DownloadIcon
                          className="text-foreground"
                          size={15}
                          strokeWidth={1.25}
                          color={"#000"}
                        />
                      </View>
                    </Button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="w-48"
                    onPress={handleDelete}
                  >
                    <View className="flex-row items-center justify-between w-full">
                      <Text>Delete</Text>
                      <TrashIcon
                        className="text-foreground text-red-500"
                        size={15}
                        strokeWidth={1.25}
                      />
                    </View>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="items-center">
          <Image
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${content}` }}
          />
        </CardContent>
        <CardFooter className="flex-row justify-between items-center gap-3">
          <Badge className={`${typeColorMap[type] || "bg-gray-500"} uppercase`}>
            <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          </Badge>

          <View className="flex-row gap-3">
            {isPublic ? (
              <Badge className="bg-blue-500">
                <Text>Public</Text>
              </Badge>
            ) : (
              <Badge className="bg-purple-500">
                <Text>Private</Text>
              </Badge>
            )}
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
