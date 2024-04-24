import * as React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { QrCodeForm } from "~/components/QrCodeForm";

export default function Screen() {
  // const insets = useSafeAreaInsets();
  // const contentInsets = {
  //   top: insets.top,
  //   bottom: insets.bottom,
  //   left: 12,
  //   right: 12,
  // };
  return (
    //   <View className="flex-1 justify-center items-center p-6 gap-12">
    //   <Select defaultValue={{ value: "text", label: "Text" }}>
    //   <SelectTrigger className="w-[250px]">
    //     <SelectValue
    //       className="text-foreground text-sm native:text-lg"
    //       placeholder="Select a Type"
    //     />
    //   </SelectTrigger>
    //   <SelectContent insets={contentInsets} className="w-[250px]">
    //     <SelectGroup>
    //       <SelectLabel>Type</SelectLabel>
    //       <SelectItem label="Text" value="text">
    //         Text
    //       </SelectItem>
    //       <SelectItem label="Wifi" value="wifi">
    //         Wifi
    //       </SelectItem>
    //       <SelectItem label="SMS" value="sms">
    //         SMS
    //       </SelectItem>
    //       <SelectItem label="URL" value="url">
    //         URL
    //       </SelectItem>
    //       <SelectItem label="Bookmark" value="bookmark">
    //         Bookmark
    //       </SelectItem>
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>

    //     <AlertDialog>
    //       <AlertDialogTrigger asChild>
    //         <Button variant="outline">
    //           <Text>Show Alert Dialog</Text>
    //         </Button>
    //       </AlertDialogTrigger>
    //       <AlertDialogContent>
    //         <AlertDialogHeader>
    //           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //           <AlertDialogDescription>
    //             This action cannot be undone. This will permanently delete your
    //             account and remove your data from our servers.
    //           </AlertDialogDescription>
    //         </AlertDialogHeader>
    //         <AlertDialogFooter>
    //           <AlertDialogCancel>
    //             <Text>Cancel</Text>
    //           </AlertDialogCancel>
    //           <AlertDialogAction>
    //             <Text>Continue</Text>
    //           </AlertDialogAction>
    //         </AlertDialogFooter>
    //       </AlertDialogContent>
    //     </AlertDialog>
    //   </View>
    <QrCodeForm />
  );
}
