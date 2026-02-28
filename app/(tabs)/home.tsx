import { useDockaStore } from "@/src/store/appStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react"; // useState eklendi
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#0E3A5D";

export default function HomeScreen() {
  const router = useRouter();
  const { orderType, boatName, setTabBarVisible } = useDockaStore();
  const [lastOffset, setLastOffset] = useState(0);

  // Kaydırma Kontrolü
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    // Sayfanın en tepesindeyken menü her zaman görünsün
    if (currentOffset <= 0) {
      setTabBarVisible(true);
      return;
    }

    // Hassasiyet: 10 pikselden az hareketleri görmezden gel
    if (Math.abs(currentOffset - lastOffset) < 10) return;

    if (currentOffset > lastOffset) {
      // Aşağı kayıyor -> Menüyü gizle
      setTabBarVisible(false);
    } else {
      // Yukarı kayıyor -> Menüyü göster
      setTabBarVisible(true);
    }
    setLastOffset(currentOffset);
  };

  const isRestaurant = orderType === "restaurant";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      {/* EN ÜST: ADRES BARI */}
      <View style={styles.topHeader}>
        <View style={styles.addressSelector}>
          <Text style={styles.addressLabel}>
            {boatName || "Teslimat Noktası Seç"}
          </Text>
          <Ionicons name="chevron-down" size={16} color={NAVY} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push("/orders")}>
            <Ionicons name="receipt-outline" size={24} color={NAVY} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* DEV KAMPANYA BANNERI */}
        <View style={styles.mainBanner}>
          <Text style={styles.bannerTitle}>Denizcilere Özel</Text>
          <Text style={styles.bannerSub}>
            İlk siparişinizde teslimat botu ücretsiz!
          </Text>
        </View>

        {/* KATEGORİ GRID ALANI */}
        <View style={styles.gridWrapper}>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() =>
              router.push(
                isRestaurant ? "/(tabs)/restaurant" : "/(tabs)/market",
              )
            }
          >
            <View
              style={[styles.categoryIconBg, { backgroundColor: "#FEF3C7" }]}
            >
              <Ionicons name="restaurant" size={32} color="#D97706" />
            </View>
            <Text style={styles.categoryText}>
              {isRestaurant ? "Tüm Restoranlar" : "Tüm Market"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() => router.push("/orders")}
          >
            <View
              style={[styles.categoryIconBg, { backgroundColor: "#E0E7FF" }]}
            >
              <Ionicons name="reload" size={32} color="#4F46E5" />
            </View>
            <Text style={styles.categoryText}>Geçmiş Siparişlerim</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox}>
            <View
              style={[styles.categoryIconBg, { backgroundColor: "#D1FAE5" }]}
            >
              <Ionicons name="star" size={32} color="#059669" />
            </View>
            <Text style={styles.categoryText}>Yıldızlı Mekanlar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryBox}>
            <View
              style={[styles.categoryIconBg, { backgroundColor: "#FCE7F3" }]}
            >
              <Ionicons name="pricetag" size={32} color="#DB2777" />
            </View>
            <Text style={styles.categoryText}>Fırsatlar</Text>
          </TouchableOpacity>
        </View>

        {/* LİSTEYE GEÇİŞ BUTONU */}
        <TouchableOpacity
          style={styles.listButton}
          onPress={() =>
            router.push(isRestaurant ? "/(tabs)/restaurant" : "/(tabs)/market")
          }
        >
          <Text style={styles.listButtonText}>
            {isRestaurant ? "Restoranları Keşfet" : "Market Reyonları"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  addressSelector: { flexDirection: "row", alignItems: "center", gap: 6 },
  addressLabel: { fontSize: 14, fontWeight: "700", color: NAVY },
  headerIcons: { flexDirection: "row", gap: 16 },
  container: { padding: 20, paddingBottom: 150 }, // Tab barın üzerine gelmemesi için artırıldı
  mainBanner: {
    backgroundColor: NAVY,
    borderRadius: 20,
    padding: 24,
    height: 160,
    justifyContent: "center",
    marginBottom: 24,
  },
  bannerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  bannerSub: { color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 20 },
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
  },
  categoryBox: { width: "23%", alignItems: "center" },
  categoryIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4B5563",
    textAlign: "center",
  },
  listButton: {
    flexDirection: "row",
    backgroundColor: NAVY,
    marginTop: 40,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  listButtonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
