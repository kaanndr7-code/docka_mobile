import { useDockaStore } from "@/src/store/appStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
const OFF_WHITE = "#F5F7F6";

// Örnek Market Kategorileri
const CATEGORIES = [
  { id: "1", name: "Meyve & Sebze", icon: "leaf-outline", color: "#10B981" },
  {
    id: "2",
    name: "Atıştırmalık",
    icon: "ice-cream-outline",
    color: "#F59E0B",
  },
  { id: "3", name: "İçecek", icon: "water-outline", color: "#3B82F6" },
  { id: "4", name: "Süt & Kahvaltı", icon: "egg-outline", color: "#6366F1" },
  { id: "5", name: "Temizlik", icon: "shiny-outline", color: "#EC4899" },
  { id: "6", name: "Kişisel Bakım", icon: "flask-outline", color: "#8B5CF6" },
];

export default function MarketScreen() {
  const setTabBarVisible = useDockaStore((state) => state.setTabBarVisible);
  const [lastOffset, setLastOffset] = useState(0);

  // Kaydırma Kontrolü
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset <= 0) {
      setTabBarVisible(true);
      return;
    }

    if (Math.abs(currentOffset - lastOffset) < 10) return;

    if (currentOffset > lastOffset) {
      setTabBarVisible(false); // Aşağı kayıyor -> Gizle
    } else {
      setTabBarVisible(true); // Yukarı kayıyor -> Göster
    }
    setLastOffset(currentOffset);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: OFF_WHITE }}
      edges={["top"]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Market</Text>
        <Text style={styles.subtitle}>
          İhtiyaçların dakikalar içinde teknende
        </Text>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
            >
              <View
                style={[styles.iconBox, { backgroundColor: item.color + "15" }]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={32}
                  color={item.color}
                />
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Kampanya Alanı */}
        <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9}>
          <View>
            <Text style={styles.promoTitle}>Hızlı Teslimat</Text>
            <Text style={styles.promoText}>
              Tüm market ürünlerinde 15 dk'da kapındayız.
            </Text>
          </View>
          <Ionicons name="flash" size={40} color="white" opacity={0.3} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 28,
    paddingVertical: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150, // Menü payı
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "31%", // Yan yana 3 kategori
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    paddingHorizontal: 4,
  },
  promoBanner: {
    marginTop: 10,
    backgroundColor: NAVY,
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  promoText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
});
