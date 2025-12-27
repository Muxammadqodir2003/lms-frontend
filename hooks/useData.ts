import { create } from "zustand";

type Store = {
  data: { email: string; password: string } | null;
  setData: (data: { email: string; password: string }) => void;
};

export const useData = create<Store>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
