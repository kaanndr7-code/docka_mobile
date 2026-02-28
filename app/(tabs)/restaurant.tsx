import { useDockaStore } from "@/src/store/appStore"; // Store eklendi
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react"; // useState eklendi
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F5F7F6";

const RESTAURANTS = [
  {
    id: "1",
    name: "Marina Seafood",
    cuisine: "Deniz Ürünleri",
    eta: "25-35 dk",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  },
  {
    id: "2",
    name: "Sunset Grill",
    cuisine: "Izgara & Steak",
    eta: "30-40 dk",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    id: "3",
    name: "Aegean Kitchen",
    cuisine: "Ege Mutfağı",
    eta: "20-30 dk",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

export default function RestaurantScreen() {
  const router = useRouter();
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

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.card}
      onPress={() => router.push(`/restaurant/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={styles.gradient}
        />

        <View style={styles.overlayContent}>
          <Text style={styles.overlayName}>{item.name}</Text>
          <Text style={styles.overlayCuisine}>{item.cuisine}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.etaPill}>
          <Text style={styles.etaText}>{item.eta}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yakındaki Restoranlar</Text>

      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={handleScroll} // Fonksiyon bağlandı
        scrollEventThrottle={16} // Akıcılık sağlandı
        contentContainerStyle={{ paddingBottom: 150 }} // Menü payı için artırıldı
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 24,
    marginTop: 40, // SafeArea benzeri bir boşluk için
  },
  card: {
    marginBottom: 28,
    backgroundColor: "white",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  imageContainer: {
    height: 210,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
  },
  overlayContent: {
    position: "absolute",
    bottom: 18,
    left: 20,
  },
  overlayName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  overlayCuisine: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  bottomRow: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  etaPill: {
    backgroundColor: "#0E3A5D10",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 50,
  },
  etaText: {
    fontSize: 12,
    fontWeight: "500",
    color: NAVY,
  },
});
