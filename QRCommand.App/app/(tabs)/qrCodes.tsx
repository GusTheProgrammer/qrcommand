import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import LogoutButton from "~/components/LogoutButton";
import { QrCodeCard } from "~/components/QrCodeCard";
import { H1 } from "~/components/ui/typography";
import { useAuth } from "~/hooks/useAuth";
import useAxios from "~/hooks/useAxios";

export default function qrCodes() {
  const { fetchData, response, loading, error } = useAxios(
    "http://10.0.2.2:5083"
  );
  const [refreshing, setRefreshing] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
    fetchData({ url: "/api/qrcodes", method: "get" });
  }, [isAuthenticated]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData({ url: "/api/qrcodes", method: "get" }).then(() =>
      setRefreshing(false)
    );
  }, []);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center gap-5 p-2 bg-secondary/30">
        <ActivityIndicator size="large" />
      </View>
    );

  if (error) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 justify-center items-center gap-5 p-2 bg-secondary/30">
          <H1>Error: {error.message}</H1>
        </View>
      </ScrollView>
    );
  }

  if (response && response.length === 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-1 justify-center items-center gap-5 p-2 bg-secondary/30">
          <H1>No QR codes found.</H1>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LogOut />

      {response &&
        response.map((item, index) => (
          <QrCodeCard key={item.id || index} data={item} />
        ))}
    </ScrollView>
  );
}
