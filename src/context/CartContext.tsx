import { createContext, ReactNode, useContext, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: { id: string; title: string; price: number }) => void;
  decrementItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: { id: string; title: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decrementItem = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decrementItem,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
