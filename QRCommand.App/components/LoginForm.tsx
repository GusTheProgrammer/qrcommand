import React from "react";
import { ScrollView, View } from "react-native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import useAxios from "~/hooks/useAxios";
import * as ToastPrimitive from "~/components/primitives/toast";
import { Portal } from "~/components/primitives/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { H1, Muted } from "./ui/typography";

export function LoginForm() {
  const scrollRef = React.useRef<ScrollView>(null);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { fetchData } = useAxios("http://10.0.2.2:5083");

  const onSubmit = async (data: any) => {
    try {
      const response = await fetchData({
        url: "/login",
        method: "post",
        data: data,
      });

      console.log("###### API response:", response); // Debug: Check the API response

      if (response && !response.error) {
        const { tokenType, accessToken, expiresIn, refreshToken } = response;
        await AsyncStorage.multiSet([
          ["tokenType", tokenType],
          ["accessToken", accessToken],
          ["expiresIn", JSON.stringify(expiresIn)],
          ["refreshToken", refreshToken],
        ]);
        setToastMessage("Login successful!");
        setOpen(true);
        console.log("Login successful and tokens stored.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setToastMessage("Credentials are incorrect.");
      } else {
        setToastMessage(`Failed to log in. ${error.message}`);
      }
      setOpen(true);
    }
  };

  React.useEffect(() => {
    register("email", {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    });
    register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    });
  }, [register]);

  return (
    <>
      {open && (
        <Portal name="toast-example">
          <View
            style={{ bottom: insets.bottom + 4 }}
            className="px-4 absolute w-full"
          >
            <ToastPrimitive.Root
              type="foreground"
              open={open}
              onOpenChange={setOpen}
              className="opacity-95 bg-secondary border-border flex-row justify-between items-center p-4 rounded-xl"
            >
              <ToastPrimitive.Title className="text-foreground text-lg">
                {toastMessage}
              </ToastPrimitive.Title>
              <ToastPrimitive.Close className="border border-primary px-4 py-2">
                <Text className="text-foreground">Close</Text>
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          </View>
        </Portal>
      )}
      <ScrollView
        ref={scrollRef}
        contentContainerClassName="p-6 mx-auto w-full max-w-xl"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 12 }}
      >
        <H1 className="text-center mb-6">Login</H1>
        <View className="flex-1 justify-center p-5 gap-">
          <View className="w-64">
            <Label nativeID="email">Email</Label>

            <Input
              id="email"
              placeholder="Email"
              onChangeText={(text) =>
                setValue("email", text, { shouldValidate: true })
              }
              keyboardType="email-address"
              className="border border-gray-300 p-2 rounded-lg"
            />
            {errors.email && (
              <Muted className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </Muted>
            )}
          </View>

          <View className="w-64">
            <Label nativeID="password">Password</Label>
            <Input
              id="password"
              placeholder="Password"
              onChangeText={(text) =>
                setValue("password", text, { shouldValidate: true })
              }
              secureTextEntry={true}
              className="border border-gray-300 p-2 rounded-lg"
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            className="mt-4 bg-green-500 text-white py-2 rounded-lg"
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
