import { useCart } from "@/src/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F7F9FA";

export default function RestaurantDetail() {
  const router = useRouter();
  const { addToCart, totalItems, totalAmount } = useCart();

  const restaurant = {
    name: "Marina Seafood",
    cuisine: "Deniz Ürünleri",
    eta: "25-35 dk",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  };

  const menu = [
    {
      id: "levrek",
      title: "Izgara Levrek",
      desc: "Günlük taze balık",
      price: 480,
    },
    {
      id: "karides",
      title: "Karides Güveç",
      desc: "Tereyağlı özel sos",
      price: 420,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: OFF_WHITE }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
        >
          {/* HERO */}
          <View style={styles.heroContainer}>
            <Image source={{ uri: restaurant.image }} style={styles.hero} />

            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.65)"]}
              style={styles.gradient}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>{restaurant.name}</Text>
              <Text style={styles.heroSubtitle}>
                {restaurant.cuisine} · {restaurant.eta}
              </Text>
            </View>
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Menü</Text>

            {menu.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDesc}>{item.desc}</Text>
                  <Text style={styles.price}>₺{item.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() =>
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                    })
                  }
                >
                  <Ionicons name="add" size={18} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* BOTTOM CTA */}
        {totalItems > 0 && (
          <View style={styles.bottomWrapper}>
            <TouchableOpacity
              style={styles.bottomBar}
              activeOpacity={0.9}
              onPress={() => router.push("/cart")}
            >
              <Text style={styles.bottomText}>
                {totalItems} ürün · ₺{totalAmount}
              </Text>
              <Text style={styles.bottomSub}>Sepeti Gör</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    position: "relative",
  },

  hero: {
    width: "100%",
    height: 300,
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 140,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 50,
  },

  heroText: {
    position: "absolute",
    bottom: 28,
    left: 24,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },

  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 28,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  menuTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: NAVY,
  },

  menuDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginVertical: 6,
  },

  price: {
    fontSize: 15,
    fontWeight: "600",
    color: NAVY,
  },

  addButton: {
    backgroundColor: NAVY,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: OFF_WHITE,
    padding: 20,
  },

  bottomBar: {
    backgroundColor: NAVY,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  bottomText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomSub: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
    fontSize: 13,
  },
});
