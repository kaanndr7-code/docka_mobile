import { create } from "zustand";

interface DockaState {
  orderType: string | null;
  location: any;
  boatName: string;
  phone: string;
  setOrderType: (type: string) => void;
  setLocation: (loc: any) => void;
  setBoatName: (name: string) => void;
  setPhone: (phone: string) => void;
}

export const useDockaStore = create<DockaState>((set) => ({
  orderType: null,
  location: null,
  boatName: "",
  phone: "",
  setOrderType: (type) => set({ orderType: type }),
  setLocation: (loc) => set({ location: loc }),
  setBoatName: (name) => set({ boatName: name }),
  setPhone: (phone) => set({ phone }),
}));
