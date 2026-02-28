import { create } from "zustand";

// Sepetteki ürünün veri tipi
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface DockaState {
  // ... (Mevcut olan location, orderType, isTabBarVisible state'leriniz burada kalsın)
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;

  // YENİ EKLENEN SEPET STATE'LERİ
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useDockaStore = create<DockaState>((set, get) => ({
  // ... (Mevcut başlangıç değerleriniz burada kalsın)
  isTabBarVisible: true,
  setTabBarVisible: (visible) => set({ isTabBarVisible: visible }),

  // SEPET İŞLEMLERİ
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
}));
