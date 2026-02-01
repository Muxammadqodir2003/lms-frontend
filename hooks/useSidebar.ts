import { create } from "zustand";

type UseSidebarStore = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useSidebarStore = create<UseSidebarStore>((set) => ({
  open: false,
  onOpenChange: (open: boolean) => set({ open }),
}));
