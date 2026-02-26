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

export default function CartScreen() {
  const router = useRouter();
  const {
    cart,
    totalAmount,
    addToCart,
    decrementItem,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#0E3A5D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sepet</Text>
        <View style={{ width: 24 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Sepetin boş</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ padding: 20 }}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>
                    ₺{item.price} — x{item.quantity}
                  </Text>
                </View>

                <View style={styles.controls}>
                  <TouchableOpacity
                    style={styles.ctrlBtn}
                    onPress={() => decrementItem(item.id)}
                  >
                    <Ionicons name="remove" size={18} color="#0E3A5D" />
                  </TouchableOpacity>

                  <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={[styles.ctrlBtn, styles.addBtn]}
                    onPress={() =>
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                      })
                    }
                  >
                    <Ionicons name="add" size={18} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Ionicons name="trash" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.summary}>
            <Text style={styles.total}>Toplam: ₺{totalAmount}</Text>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => alert("Ödeme akışı eklenecek")}
            >
              <Text style={styles.checkoutText}>Sipariş Ver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
              <Text style={styles.clearText}>Sepeti Temizle</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FA" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E3A5D",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },

  item: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E3A5D",
  },

  price: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
  },

  ctrlBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0E3A5D",
    alignItems: "center",
    justifyContent: "center",
  },

  addBtn: {
    backgroundColor: "#0E3A5D",
    marginLeft: 6,
  },

  removeBtn: {
    marginLeft: 8,
    backgroundColor: "#E11D48",
    padding: 8,
    borderRadius: 8,
  },

  summary: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "white",
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E3A5D",
    marginBottom: 12,
  },

  checkoutBtn: {
    backgroundColor: "#0E3A5D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  checkoutText: {
    color: "white",
    fontWeight: "700",
  },

  clearBtn: {
    alignItems: "center",
    padding: 8,
  },

  clearText: {
    color: "#6B7280",
  },
});
