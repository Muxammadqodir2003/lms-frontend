import { create } from "zustand";

type Store = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const useSectionModalStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
