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
import { useColorScheme } from "~/lib/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAxios from "~/hooks/useAxios";

export function QrCodeCard({ data }) {
  const { id, title, description, content, type, isPublic } = data;
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const { fetchData } = useAxios("http://10.0.2.2:5083");
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
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
            } else {
              Alert.alert("Error", "Failed to delete QR code.");
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 justify-center items-center gap-5 p-2 bg-secondary/30">
      <Card className="w-full max-w-sm p-4 rounded-l">
        <CardHeader className="flex-row justify-between items-center">
          <View>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <Tooltip delayDuration={150}>
              <TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
                <Text className="line-clamp-1">{description}</Text>
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
              if (!newVal) {
                setOpenSub(false);
              }
              setOpen(newVal);
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
                  <Text>Edit</Text>
                  <DropdownMenuShortcut>
                    <PenIcon
                      className="text-foreground"
                      size={15}
                      strokeWidth={1.25}
                      color="red"
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onPress={handleDelete}>
                  <Text>Delete</Text>
                  <DropdownMenuShortcut>
                    <TrashIcon
                      className="text-foreground text-red-500"
                      size={15}
                      strokeWidth={1.25}
                    />
                  </DropdownMenuShortcut>
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
        <CardFooter className="flex-row justify-end gap-3">
          {isPublic === true ? (
            <Badge className="bg-blue-500">
              <Text>Public</Text>
            </Badge>
          ) : (
            <Badge className="bg-purple-500">
              <Text>Private</Text>
            </Badge>
          )}

          <Badge className="bg-green-500">
            <Text>{type}</Text>
          </Badge>
        </CardFooter>
      </Card>
    </View>
  );
}
