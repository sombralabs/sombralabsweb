import { create } from "zustand";

const useStateStore = create((set) => ({
  introDone: false,
  setIntroDone: (bool) => set({ introDone: bool }),

  flashOn: true,
  toggleFlash: (bool = undefined) =>
    set((state) => ({ flashOn: bool === undefined ? !state.flashOn : bool })),

  step: 0,
  setStep: (step) => set({ step }),

  direction: 1,
  setDirection: (direction) => set({ direction }),
}));

export default useStateStore;
