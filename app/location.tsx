import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NAVY = "#0E3A5D";

export default function LocationScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Konum izni gerekli");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCoords(location.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={NAVY} />
        <Text>Konum alınıyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Konumunuz</Text>

      <Text>Lat: {coords.latitude}</Text>
      <Text>Lng: {coords.longitude}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/select-type")}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: NAVY,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
});
