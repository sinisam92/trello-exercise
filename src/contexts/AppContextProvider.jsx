import { AnimationProvider } from "./AnimationContext";
import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./SearchContext";
import { ThemeProvider } from "./ThemeContext";

import combineComponents from "../utils/combineComponents";

const providers = [
  AuthProvider,
  SearchProvider,
  ThemeProvider,
  AnimationProvider,
];

export const AppContextProvider = combineComponents(...providers);
