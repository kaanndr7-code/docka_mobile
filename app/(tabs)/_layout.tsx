import { useDockaStore } from "@/src/store/appStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const NAVY = "#0B3C5D";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname(); // Hangi sekmede olduğumuzu anlamak için
  const isTabBarVisible = useDockaStore((state) => state.isTabBarVisible);

  // Animasyon Ayarı: Görünürse 0 (yerinde), değilse 150 (aşağı kaymış)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(isTabBarVisible ? 0 : 150, {
            damping: 15,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  // Yardımcı Buton Bileşeni (Kodu temiz tutmak için)
  const TabButton = ({ name, icon, focusedIcon, route }: any) => {
    const isFocused = pathname.includes(route);
    return (
      <TouchableOpacity
        onPress={() => router.push(route)}
        style={styles.tabBtn}
      >
        <Ionicons
          name={isFocused ? focusedIcon : icon}
          size={26}
          color={isFocused ? NAVY : "#94A3B8"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="restaurant" options={{ href: null }} />
        <Tabs.Screen name="market" options={{ href: null }} />
        <Tabs.Screen name="explore" options={{ href: null }} />
      </Tabs>

      {/* İŞTE O YÜZEN VE ANİMASYONLU KAPSÜL */}
      <Animated.View style={[styles.tabBarContainer, animatedStyle]}>
        <TabButton route="/home" icon="home-outline" focusedIcon="home" />

        <TouchableOpacity
          style={styles.centerButtonContainer}
          onPress={() => router.push("/location")}
        >
          <View style={styles.centerButtonInner}>
            <Ionicons name="boat" size={30} color="white" />
          </View>
        </TouchableOpacity>

        <TabButton
          route="/profile"
          icon="person-outline"
          focusedIcon="person"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 30,
    left: width * 0.075,
    right: width * 0.075,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  tabBtn: { flex: 1, alignItems: "center", justifyContent: "center" },
  centerButtonContainer: {
    top: -20,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonInner: {
    backgroundColor: NAVY,
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#F8FAFC",
    elevation: 8,
  },
});
