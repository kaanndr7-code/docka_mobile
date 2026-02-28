import { useDockaStore } from "@/src/store/appStore";
import { Ionicons } from "@expo/vector-icons";
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
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#0E3A5D";

export default function LocationAndSelectScreen() {
  const router = useRouter();
  const setLocation = useDockaStore((state) => state.setLocation);
  const setOrderType = useDockaStore((state) => state.setOrderType);
  const locationState = useDockaStore((state) => state.location);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location.coords);
      setLoading(false);
    })();
  }, []);

  const handleSelect = (type: "restaurant" | "market") => {
    setOrderType(type);
    router.replace("/(tabs)/home");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={NAVY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* GETİR STİLİ EN ÜST ADRES BARI */}
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <TouchableOpacity style={styles.topAddressBar}>
          <Text style={styles.addressLabel}>Teslimat Adresi Seç</Text>
          <Ionicons name="chevron-down" size={18} color={NAVY} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* ÜST YARIM: HARİTA */}
      <View style={styles.mapContainer}>
        {locationState ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: locationState.latitude,
              longitude: locationState.longitude,
              latitudeDelta: 0.01, // Haritayı yaklaştırdık (Zoom)
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={locationState}
              title="Tekneniz"
              pinColor="blue"
            />
          </MapView>
        ) : (
          <View style={styles.center}>
            <Text>Konum alınamadı.</Text>
          </View>
        )}
      </View>

      {/* ALT YARIM: SEÇİM KARTLARI (Birebir Getir Tasarımı) */}
      <View style={styles.bottomSheet}>
        <Text style={styles.greeting}>Denizde bi' mutluluk!</Text>
        <Text style={styles.subGreeting}>
          Siparişini şimdi ver, teknene kadar getirelim.
        </Text>

        <View style={styles.gridContainer}>
          {/* RESTORAN KARTI */}
          <TouchableOpacity
            style={styles.gridCard}
            activeOpacity={0.9}
            onPress={() => handleSelect("restaurant")}
          >
            <Text style={styles.cardBrand}>
              docka<Text style={{ color: "#EAB308" }}>restoran</Text>
            </Text>
            <Text style={styles.cardDesc}>
              Sıcak lezzetler{"\n"}dakikalar içinde
            </Text>

            <View style={styles.cardImageContainer}>
              <Ionicons name="restaurant" size={48} color="#EAB308" />
            </View>
          </TouchableOpacity>

          {/* MARKET KARTI */}
          <TouchableOpacity
            style={styles.gridCard}
            activeOpacity={0.9}
            onPress={() => handleSelect("market")}
          >
            <Text style={styles.cardBrand}>
              docka<Text style={{ color: "#10B981" }}>market</Text>
            </Text>
            <Text style={styles.cardDesc}>
              Temel ihtiyaçlar{"\n"}uygun fiyatlarla
            </Text>

            <View style={styles.cardImageContainer}>
              <Ionicons name="basket" size={48} color="#10B981" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Üst Adres Barı Stilleri
  safeArea: {
    backgroundColor: "white",
    zIndex: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topAddressBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginRight: 6,
  },

  // Harita Stilleri
  mapContainer: { flex: 0.5 },
  map: { width: "100%", height: "100%" },

  // Alt Grid ve Metin Stilleri
  bottomSheet: {
    flex: 0.5,
    backgroundColor: "white",
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },

  gridContainer: { flexDirection: "row", gap: 12 },
  gridCard: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Hafif gri arka plan
    borderRadius: 16,
    padding: 16,
    height: 180,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardBrand: { fontSize: 22, fontWeight: "900", color: NAVY, marginBottom: 8 },
  cardDesc: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
    lineHeight: 18,
  },

  // Sağ alt köşeye tam oturan yuvarlak ikon tasarımı
  cardImageContainer: {
    position: "absolute",
    bottom: -15,
    right: -15,
    width: 90,
    height: 90,
    backgroundColor: "white",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
