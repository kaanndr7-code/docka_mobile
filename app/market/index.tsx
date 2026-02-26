import { StyleSheet, Text, View } from "react-native";

export default function MarketList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market</Text>
      <Text style={styles.subtitle}>Günlük ihtiyaçlarınızı seçin</Text>
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
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
  },
});
