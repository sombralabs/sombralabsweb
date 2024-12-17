import { create } from "zustand";

const useNavLinksStore = create((set) => ({
  isMovingUser: false,
  setIsMovingUser: (bool) => set({ isMovingUser: bool }),

  position: 0,
  setPosition: (pos) => set({ position: pos }),
}));

export default useNavLinksStore;
