import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#0E3A5D";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={100} color={NAVY} />
      </View>

      <Text style={styles.title}>Docka'ya Hoş Geldiniz</Text>
      <Text style={styles.subtitle}>
        Siparişlerinizi takip etmek, adreslerinizi kaydetmek için giriş yapın.
      </Text>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Giriş Yap / Kayıt Ol</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconContainer: { marginBottom: 24, opacity: 0.8 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  loginBtn: {
    backgroundColor: NAVY,
    paddingVertical: 16,
    width: "100%",
    borderRadius: 14,
    alignItems: "center",
  },
  loginText: { color: "white", fontSize: 16, fontWeight: "600" },
});
