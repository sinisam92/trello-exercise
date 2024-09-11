import { Header } from "./Header";
import { fn } from "@storybook/test";
import { withReactContext } from "storybook-react-context";
import { AuthProvider } from "../contexts/AuthContext";


export default {
  title: "Components/Header",
  component: Header,
  decorators: [withReactContext],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onClick: fn(),
    onMenuClick: fn(),
    onBellClick: fn(),
    onSearchClick: fn(),
  },
};

export const Default = {
  parameters: {
    reactContext: {
      context: AuthProvider,
      contextValue: {  isAuthenticated: true, login: () => {}, logout: () => {} },
    }},
  args: {
    hasNotification: false,
  },
};

// export const hasNotification = {
//   parameters: {
//   reactContext: {
//     context: AuthProvider,
//     contextValue: { isAuthenticated: true },
//   }},
//   args: {
//     hasNotification: true,
//   },
// };
