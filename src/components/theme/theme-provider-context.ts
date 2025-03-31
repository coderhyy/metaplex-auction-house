import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

const initialState: ThemeProviderState = {
  setTheme: () => null,
  theme: "system",
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
