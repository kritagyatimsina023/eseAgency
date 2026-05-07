import { create } from "zustand";

export const useToggle = create((set) => ({
  openNav: false,
  setOpenNav: (value) => set({ openNav: value }),
}));
