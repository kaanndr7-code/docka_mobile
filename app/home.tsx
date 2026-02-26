import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { type } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Göcek Marina</Text>
        <Text style={styles.sub}>
          Teslimat tipi: {type === "restaurant" ? "Restoran" : "Market"}
        </Text>
      </View>

      {/* LOCATION CARD */}
      <View style={styles.infoCard}>
        <Ionicons name="location-outline" size={22} color="#0E3A5D" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.cardTitle}>Konum</Text>
          <Text style={styles.cardSubtitle}>37.0369, 27.4241</Text>
        </View>
      </View>

      {/* BOAT CARD */}
      <View style={styles.infoCard}>
        <Ionicons name="boat-outline" size={22} color="#0E3A5D" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.cardTitle}>Tekne</Text>
          <Text style={styles.cardSubtitle}>MY Serenity</Text>
        </View>
      </View>

      {/* ACTION BUTTON */}
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryText}>
          {type === "restaurant" ? "Restoranları Gör" : "Market Ürünlerini Gör"}
        </Text>
      </TouchableOpacity>

      {/* CAMPAIGN CARD */}
      <View style={styles.campaign}>
        <Text style={styles.campaignTitle}>Günün Özel Avantajı</Text>
        <Text style={styles.campaignSub}>
          Marina içi siparişlerde ücretsiz teslimat.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  header: {
    marginBottom: 40,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "600",
    color: "#0E3A5D",
  },
  sub: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7A90",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cardTitle: {
    fontSize: 14,
    color: "#6B7A90",
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0E3A5D",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#0E3A5D",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  campaign: {
    marginTop: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#EAF8F7",
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0E3A5D",
  },
  campaignSub: {
    marginTop: 6,
    fontSize: 14,
    color: "#4F647A",
  },
});
