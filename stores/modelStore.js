import { create } from "zustand";

const useModelStore = create((set) => ({
  currentModel: 0,
  setCurrentModel: (model) => set({ currentModel: model }),
}));

export default useModelStore;
