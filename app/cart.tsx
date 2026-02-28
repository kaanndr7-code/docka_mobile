import { useCart } from "@/src/context/CartContext";
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
const OFF_WHITE = "#F5F7F6";

export default function CartScreen() {
  const router = useRouter();
  const { cart, totalAmount, addToCart, decrementItem, clearCart } = useCart();

  // Örnek teslimat ücreti (İsterseniz bunu state'ten de alabilirsiniz)
  const deliveryFee = totalAmount > 0 ? 50 : 0;
  const finalTotal = totalAmount + deliveryFee;

  // --- BOŞ SEPET EKRANI ---
  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="close" size={28} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sepetim</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconBg}>
            <Ionicons
              name="cart-outline"
              size={60}
              color={NAVY}
              opacity={0.5}
            />
          </View>
          <Text style={styles.emptyTitle}>Sepetiniz Boş</Text>
          <Text style={styles.emptySubtitle}>
            Tekneniz için harika lezzetler ve ürünler keşfetmeye hemen başlayın.
          </Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.shopBtnText}>Alışverişe Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- DOLU SEPET EKRANI ---
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-down" size={28} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sepetim</Text>
        <TouchableOpacity onPress={clearCart}>
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* ÜRÜN LİSTESİ VE FİŞ */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemLeft}>
              <View style={styles.itemImagePlaceholder}>
                <Ionicons name="cube-outline" size={24} color="#9CA3AF" />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemPrice}>₺{item.price.toFixed(2)}</Text>
              </View>
            </View>

            {/* Premium Miktar Kontrolcüsü */}
            <View style={styles.quantityController}>
              <TouchableOpacity
                style={styles.qBtn}
                onPress={() => decrementItem(item.id)}
              >
                <Ionicons
                  name={item.quantity === 1 ? "trash-outline" : "remove"}
                  size={18}
                  color={item.quantity === 1 ? "#EF4444" : NAVY}
                />
              </TouchableOpacity>
              <Text style={styles.qText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qBtn}
                onPress={() =>
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                  })
                }
              >
                <Ionicons name="add" size={18} color={NAVY} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.receiptBox}>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Ara Toplam</Text>
              <Text style={styles.receiptValue}>₺{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Botla Teslimat</Text>
              <Text style={styles.receiptValue}>₺{deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.receiptRow, styles.receiptTotalRow]}>
              <Text style={styles.receiptTotalLabel}>Ödenecek Tutar</Text>
              <Text style={styles.receiptTotalValue}>
                ₺{finalTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />

      {/* SİPARİŞİ TAMAMLA BUTONU (Sticky Footer) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.9}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutBtnText}>Sipariş Ver</Text>
          <View style={styles.checkoutPriceBg}>
            <Text style={styles.checkoutPriceText}>
              ₺{finalTotal.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: OFF_WHITE },
  emptyContainer: { flex: 1, backgroundColor: "white" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: NAVY },

  // Boş Sepet Stilleri
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIconBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: OFF_WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  shopBtn: {
    backgroundColor: NAVY,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  shopBtnText: { color: "white", fontSize: 16, fontWeight: "700" },

  // Dolu Sepet Listesi
  listContent: { padding: 20, paddingBottom: 120 }, // Footer payı
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  itemImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: OFF_WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemDetails: { flex: 1, paddingRight: 10 },
  itemName: { fontSize: 15, fontWeight: "600", color: NAVY, marginBottom: 4 },
  itemPrice: { fontSize: 14, fontWeight: "700", color: "#10B981" },

  // Miktar Kontrolcüsü (Yatay Kapsül Tasarımı)
  quantityController: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: OFF_WHITE,
    borderRadius: 12,
    padding: 4,
  },
  qBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  qText: {
    width: 32,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: NAVY,
  },

  // Fiş / Makbuz Stilleri
  receiptBox: {
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  receiptLabel: { fontSize: 15, color: "#6B7280" },
  receiptValue: { fontSize: 15, fontWeight: "600", color: NAVY },
  receiptTotalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
    marginBottom: 0,
  },
  receiptTotalLabel: { fontSize: 16, fontWeight: "700", color: NAVY },
  receiptTotalValue: { fontSize: 18, fontWeight: "800", color: "#10B981" },

  // Alt Footer ve Sipariş Ver Butonu
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32, // iOS için ekstra boşluk
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: NAVY,
    borderRadius: 20,
    padding: 8,
    paddingLeft: 24,
  },
  checkoutBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
  checkoutPriceBg: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  checkoutPriceText: { color: NAVY, fontSize: 15, fontWeight: "800" },
});
