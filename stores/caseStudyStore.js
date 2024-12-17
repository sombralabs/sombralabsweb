import { create } from "zustand";
import caseStudies from "@/data/case-studies";

const useCaseStudyStore = create((set) => ({
  studies: caseStudies,
  activeStudy: 0,
  activePopup: null,
  setActiveStudy: (study) => set({ activeStudy: study }),
  setActivePopup: (popup) => set({ activePopup: popup }),
}));

export default useCaseStudyStore;
