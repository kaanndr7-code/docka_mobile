import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.brand}>Docka</Text>

        <Text style={styles.title}>
          Teknenize Zahmetsiz{"\n"}Premium Teslimat
        </Text>

        <Text style={styles.subtitle}>
          Seçkin restoranlar ve market ürünleri, doğrudan bulunduğunuz koya
          teslim edilir.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => router.push("/select-type")}
      >
        <Text style={styles.buttonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
}

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F5F7F6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 32,
    justifyContent: "space-between",
    paddingTop: 120,
    paddingBottom: 60,
  },
  content: {
    gap: 24,
  },
  brand: {
    fontSize: 18,
    fontWeight: "600",
    color: NAVY,
    letterSpacing: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: NAVY,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  button: {
    backgroundColor: NAVY,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
