import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import useAxios from "~/hooks/useAxios";
import { Portal } from "~/components/primitives/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { H1, Muted } from "./ui/typography";
import { useAuth } from "~/hooks/useAuth";
import { router } from "expo-router";

export function LoginForm() {
  const isAuthenticated = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/(tabs)/qrCodes");
    }
  }, [isAuthenticated, loggedIn]);
  const scrollRef = React.useRef<ScrollView>(null);
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

  const { fetchData } = useAxios("http://165.22.124.130");

  const onSubmit = async (data: any) => {
    try {
      const response = await fetchData({
        url: "/login",
        method: "post",
        data: data,
      });

      if (response && !response.error) {
        const { tokenType, accessToken, expiresIn, refreshToken } = response;
        await AsyncStorage.multiSet([
          ["tokenType", tokenType],
          ["accessToken", accessToken],
          ["expiresIn", JSON.stringify(expiresIn)],
          ["refreshToken", refreshToken],
        ]);
        Alert.alert("Login successful", "You have been logged in.");
        setLoggedIn(true);
        router.replace("/(tabs)/qrCodes");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        Alert.alert("Login Error", "Credentials are incorrect.");
      } else {
        Alert.alert("Login Error", `Failed to log in: ${error.message}`);
      }
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
      <ScrollView
        ref={scrollRef}
        contentContainerClassName="p-6 mx-auto w-full max-w-xl"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 12 }}
      >
        <H1 className="text-center mb-6">Login</H1>
        <View className="flex-1 justify-center p-5 gap-">
          <View className="w-64 mb-5">
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

          <View className="w-64 mb-5">
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

          <Muted className="text-center mt-4">
            Don't have an account?{" "}
            <Text
              onPress={() => router.replace("/register")}
              className="text-blue-500"
            >
              Register
            </Text>
          </Muted>
        </View>
      </ScrollView>
    </>
  );
}
