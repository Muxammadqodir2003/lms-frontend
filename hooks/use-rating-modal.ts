import { create } from "zustand";

type RatingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useRatingModal = create<RatingModalProps>((set) => ({
  open: false,
  onOpenChange: (open: boolean) => set({ open }),
}));
