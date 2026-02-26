import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SelectType() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nasıl devam etmek istersiniz?</Text>
        <Text style={styles.subtitle}>Teknenize hızlı ve premium teslimat</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/location",
              params: { type: "restaurant" },
            })
          }
        >
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <Ionicons name="restaurant-outline" size={22} color={NAVY} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Restoran</Text>
              <Text style={styles.cardDesc}>
                Yakındaki restoranlardan sipariş verin
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() =>
            router.push({ pathname: "/location", params: { type: "market" } })
          }
        >
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <Ionicons name="basket-outline" size={22} color={NAVY} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Market</Text>
              <Text style={styles.cardDesc}>
                Günlük ihtiyaçlarınızı tekneye getirelim
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F5F7F6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  header: {
    marginBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 20,
  },
  card: {
    paddingVertical: 26,
    paddingHorizontal: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
  },
});
