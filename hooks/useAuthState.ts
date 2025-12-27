import { create } from "zustand";

type Store = {
  state: "login" | "register" | "verify" | "recovery";
  setState: (state: "login" | "register" | "verify" | "recovery") => void;
};

export const useAuthState = create<Store>((set) => ({
  state: "login",
  setState: (state) => set({ state }),
}));
