import { create } from "zustand";

// --- TİPLER (INTERFACES) ---

// 1. Sepetteki ürünün veri tipi
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// 2. Sipariş (Order) Veri Tipi (Checkout sayfasındaki hata için eklendi)
export interface Order {
  id: string;
  date: string;
  items: any[];
  totalAmount: number;
  status: string;
  type: string;
}

// --- STATE ARAYÜZÜ ---
interface DockaState {
  // Menü Görünürlüğü
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;

  // Sepet İşlemleri
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Checkout (Kullanıcı & Tekne) Bilgileri
  boatName: string;
  setBoatName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;

  // Sipariş Yönetimi
  orderType: string;
  setOrderType: (type: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

// --- ZUSTAND STORE OLUŞTURMA ---
export const useDockaStore = create<DockaState>((set, get) => ({
  // 1. Menü Görünürlüğü
  isTabBarVisible: true,
  setTabBarVisible: (visible) => set({ isTabBarVisible: visible }),

  // 2. Sepet İşlemleri
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((c) => c.id === item.id);
      if (existingItem) {
        // Ürün zaten varsa miktarını artır
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
          ),
        };
      }
      // Ürün yoksa 1 adet olarak ekle
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const existingItem = state.cart.find((c) => c.id === id);
      if (existingItem && existingItem.quantity > 1) {
        // Miktar 1'den büyükse azalt
        return {
          cart: state.cart.map((c) =>
            c.id === id ? { ...c, quantity: c.quantity - 1 } : c,
          ),
        };
      }
      // Miktar 1 ise ürünü sepetten tamamen çıkar
      return { cart: state.cart.filter((c) => c.id !== id) };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },

  // 3. Checkout (Kullanıcı & Tekne) Bilgileri
  boatName: "",
  setBoatName: (name) => set({ boatName: name }),

  phone: "",
  setPhone: (phone) => set({ phone: phone }),

  // 4. Sipariş Yönetimi
  orderType: "restaurant", // Varsayılan değer
  setOrderType: (type) => set({ orderType: type }),

  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}));
