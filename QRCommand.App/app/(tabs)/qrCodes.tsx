import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { QrCodeCard } from "~/components/QrCodeCard";
import { H1 } from "~/components/ui/typography";
import useAxios from "~/hooks/useAxios";

export default function qrCodes() {
  const { fetchData, response, loading, error } = useAxios(
    "http://10.0.2.2:5083"
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData({ url: "/api/qrcodes", method: "get" });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData({ url: "/api/qrcodes", method: "get" }).then(() =>
      setRefreshing(false)
    );
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <H1>Error: {error.message}</H1>;
      </ScrollView>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {response &&
        response.map((item, index) => (
          <QrCodeCard
            key={item.id || index} // Preferably use a unique ID if available
            data={item}
          />
        ))}
    </ScrollView>
  );
}
