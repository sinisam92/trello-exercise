import combineComponents from "../utils/combineComponents";
import { AnimationProvider } from "./AnimationContext";
import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./SearchContext";
import { ThemeProvider } from "./ThemeContext";

const providers = [
  AuthProvider,
  SearchProvider,
  ThemeProvider,
  AnimationProvider,
];

export const AppContextProvider = combineComponents(...providers);
