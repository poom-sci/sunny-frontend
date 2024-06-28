import { create } from "zustand";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
  theme: "light",
  setTheme: (theme) =>
    set((state) => {
      // console.log(theme,state)
      return { theme: theme };
    })
}));


export default useThemeStore;
