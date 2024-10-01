import { AnimationProvider } from "./AnimationContext";
import { AuthProvider } from "./AuthContext";
import { SearchProvider } from "./SearchContext";
import { ThemeProvider } from "./ThemeContext";
import { UsersProvider } from "./UsersContext";

import combineComponents from "../utils/combineComponents";

const providers = [
  AuthProvider,
  SearchProvider,
  UsersProvider,
  ThemeProvider,
  AnimationProvider,
];

export const AppContextProvider = combineComponents(...providers);
