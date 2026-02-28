import { useCart } from "@/src/context/CartContext";
import { Order, useDockaStore } from "@/src/store/appStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F5F7F6";
const GRAY_BG = "#F3F4F6";

export default function CheckoutScreen() {
  const router = useRouter();

  // Sepet ve Store Bağlantıları (Senin yazdığın orijinal mantık)
  const { cart, totalAmount, clearCart } = useCart();
  const { boatName, phone, orderType, setBoatName, setPhone, addOrder } =
    useDockaStore();

  // Lokal Form State'leri
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [note, setNote] = useState(""); // Sipariş notu
  const [isCharter, setIsCharter] = useState(false);

  const deliveryFee = 0; // Teslimat ücreti (Ücretsiz)
  const finalTotal = totalAmount + deliveryFee;

  // Sipariş Onay Fonksiyonu
  const handleConfirmOrder = () => {
    if (!boatName.trim() || !phone.trim()) {
      Alert.alert(
        "Eksik Bilgi",
        "Siparişinizi getirebilmemiz için lütfen Tekne Adı ve Telefon Numaranızı giriniz.",
      );
      return;
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      date: new Date().toLocaleString("tr-TR"),
      items: cart,
      totalAmount: finalTotal,
      status: "Hazırlanıyor",
      type: orderType,
    };

    addOrder(newOrder);
    clearCart();

    // İşlem başarılıysa success sayfasına gönder (Yoksa ana sayfaya dönebilirsin)
    router.push("/success");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER VE İLERLEME ÇUBUĞU */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={26} color={NAVY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Siparişi Tamamla</Text>
          <View style={{ width: 26 }} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.activeDot]} />
            <Text style={styles.progressTextActive}>Konum</Text>
          </View>
          <View style={[styles.progressLine, styles.activeLine]} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.activeDot]} />
            <Text style={styles.progressTextActive}>Detaylar</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressDot} />
            <Text style={styles.progressText}>Özet</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* KİŞİSEL BİLGİLER */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={20} color={NAVY} />
              <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Ad</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Örn: Kaan"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Soyad</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Örn: Doğru"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* İLETİŞİM NUMARASI */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="call-outline" size={20} color={NAVY} />
              <Text style={styles.sectionTitle}>İletişim Numarası</Text>
            </View>

            <Text style={styles.inputLabel}>Telefon Numarası</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryFlag}>🇹🇷</Text>
                <Text style={styles.countryPrefix}>+90</Text>
                <Ionicons
                  name="caret-down"
                  size={12}
                  color="#4B5563"
                  style={{ marginLeft: 4 }}
                />
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="501 363 17 46"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* KİRALIK TEKNE TOGGLE */}
          <View style={[styles.section, styles.toggleRow]}>
            <Text style={styles.toggleLabel}>
              Charter (Kiralık) müşterisiyim
            </Text>
            <Switch
              value={isCharter}
              onValueChange={setIsCharter}
              trackColor={{ false: "#D1D5DB", true: NAVY }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          {/* TEKNE BİLGİLERİ & NOT */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="boat-outline" size={20} color={NAVY} />
              <Text style={styles.sectionTitle}>Tekne Bilgileri</Text>
            </View>

            <Text style={styles.inputLabel}>Tekne Adı</Text>
            <TextInput
              style={styles.input}
              value={boatName}
              onChangeText={setBoatName}
              placeholder="Örn: MY Serenity"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.inputLabel}>Sipariş Notu (İsteğe Bağlı)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={note}
              onChangeText={setNote}
              placeholder="Tekne özellikleri, bayrak rengi veya yaklaşırken aranma talebi..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* ÖDEME ÖZETİ (Senin yazdığın bölümün premium hali) */}
          <View style={styles.receiptBox}>
            <Text style={styles.receiptTitle}>Ödeme Özeti</Text>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Ara Toplam</Text>
              <Text style={styles.receiptValue}>₺{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Teslimat Ücreti</Text>
              <Text style={styles.receiptValue}>₺{deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.receiptRow, styles.receiptTotalRow]}>
              <Text style={styles.receiptTotalLabel}>Toplam Tutar</Text>
              <Text style={styles.receiptTotalValue}>
                ₺{finalTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* STICKY ONAYLA BUTONU */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.9}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.submitBtnText}>Siparişi Onayla</Text>
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
  container: { flex: 1, backgroundColor: "white" },

  // Header
  headerContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: NAVY },

  // Progress Bar
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  progressStep: { alignItems: "center", width: 70 },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
    marginBottom: 6,
  },
  activeDot: { backgroundColor: NAVY, transform: [{ scale: 1.2 }] },
  progressText: { fontSize: 11, color: "#9CA3AF", textAlign: "center" },
  progressTextActive: {
    fontSize: 11,
    color: NAVY,
    fontWeight: "600",
    textAlign: "center",
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#D1D5DB",
    marginHorizontal: -10,
    marginBottom: 16,
  },
  activeLine: { backgroundColor: NAVY },

  // Content
  scrollContent: { padding: 24, paddingBottom: 120 },
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginLeft: 8,
  },

  // Inputs
  inputLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: GRAY_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
    marginBottom: 12,
  },
  textArea: { height: 90, borderRadius: 20, paddingTop: 14 },

  // Phone Input
  phoneInputContainer: {
    flexDirection: "row",
    backgroundColor: GRAY_BG,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  countryFlag: { fontSize: 18, marginRight: 4 },
  countryPrefix: { fontSize: 15, fontWeight: "600", color: "#1F2937" },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "600",
  },

  // Toggles
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: { fontSize: 15, fontWeight: "500", color: "#1F2937" },

  // Receipt / Summary Box
  receiptBox: {
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 16,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  receiptLabel: { fontSize: 14, color: "#6B7280" },
  receiptValue: { fontSize: 14, fontWeight: "600", color: NAVY },
  receiptTotalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
    marginTop: 4,
    marginBottom: 0,
  },
  receiptTotalLabel: { fontSize: 16, fontWeight: "700", color: NAVY },
  receiptTotalValue: { fontSize: 18, fontWeight: "800", color: "#10B981" },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: NAVY,
    borderRadius: 20,
    padding: 8,
    paddingLeft: 24,
  },
  submitBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
  checkoutPriceBg: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  checkoutPriceText: { color: NAVY, fontSize: 15, fontWeight: "800" },
});
