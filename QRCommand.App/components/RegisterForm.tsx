import React, { useEffect } from "react";
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

export function RegisterForm() {
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { fetchData } = useAxios("http://165.22.124.130");

  const password = watch("password");

  const onSubmit = async (data: any) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetchData({
        url: "/register",
        method: "post",
        data: payload,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      Alert.alert(
        "Registration successful",
        "You have been registered and logged in."
      );
      router.replace("/(tabs)/qrCodes");
    } catch (error) {
      console.error("Registration failed:", error);

      // Check if the error message string contains '400'
      if (error.message && error.message.includes("400")) {
        Alert.alert(
          "Registration Error",
          "There was a problem with your registration. The email may already be taken or your data does not meet the validation requirements."
        );
      } else if (error.response && error.response.status === 401) {
        Alert.alert("Registration Error", "Invalid credentials provided.");
      } else {
        // Handle general errors
        Alert.alert(
          "Registration Error",
          `Failed to register: ${error.message}`
        );
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
    register("confirmPassword", {
      validate: (value) => value === password || "The passwords do not match",
    });
  }, [register, password]);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        contentContainerClassName="p-6 mx-auto w-full max-w-xl"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 12 }}
      >
        <H1 className="text-center mb-6">Register</H1>
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

          <View className="w-64 mb-5">
            <Label nativeID="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              onChangeText={(text) =>
                setValue("confirmPassword", text, { shouldValidate: true })
              }
              secureTextEntry={true}
              className="border border-gray-300 p-2 rounded-lg"
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
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
            Already have an account?{" "}
            <Text onPress={() => router.replace("/")} className="text-blue-500">
              Log in
            </Text>
          </Muted>
        </View>
      </ScrollView>
    </>
  );
}
