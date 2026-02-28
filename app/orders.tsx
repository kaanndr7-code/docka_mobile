import { useDockaStore } from "@/src/store/appStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F7F9FA";

export default function OrdersScreen() {
  const router = useRouter();
  const orders = useDockaStore((state) => state.orders);

  // Sipariş durumuna göre renk döndüren yardımcı fonksiyon
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hazırlanıyor":
        return { bg: "#FEF3C7", text: "#D97706" }; // Turuncu/Sarı
      case "Yola Çıktı":
        return { bg: "#DBEAFE", text: "#2563EB" }; // Mavi
      case "Teslim Edildi":
        return { bg: "#D1FAE5", text: "#059669" }; // Yeşil
      default:
        return { bg: "#F3F4F6", text: "#4B5563" }; // Gri
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: OFF_WHITE }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Siparişlerim</Text>
        <View style={{ width: 24 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={48} color="#D1D5DB" />
          <Text style={styles.emptyText}>Henüz siparişiniz bulunmuyor</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => {
            const colors = getStatusColor(item.status);
            return (
              <View style={styles.orderCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.orderId}>Sipariş #{item.id}</Text>
                  <View
                    style={[styles.statusBadge, { backgroundColor: colors.bg }]}
                  >
                    <Text style={[styles.statusText, { color: colors.text }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.orderDate}>{item.date}</Text>

                <View style={styles.itemsList}>
                  {item.items.map((product, index) => (
                    <Text key={index} style={styles.productItem}>
                      {product.quantity}x {product.title}
                    </Text>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.totalText}>Toplam Tutar</Text>
                  <Text style={styles.totalPrice}>₺{item.totalAmount}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: NAVY },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 12, fontSize: 16, color: "#6B7280" },
  orderCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orderId: { fontSize: 16, fontWeight: "700", color: NAVY },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: "600" },
  orderDate: { fontSize: 13, color: "#6B7280", marginBottom: 16 },
  itemsList: { marginBottom: 16 },
  productItem: { fontSize: 14, color: "#4B5563", marginBottom: 4 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  totalText: { fontSize: 14, color: "#6B7280" },
  totalPrice: { fontSize: 16, fontWeight: "700", color: NAVY },
});
