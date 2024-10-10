import { Header } from "../components/Header";
import { fn } from "@storybook/test";
import { withReactContext } from "storybook-react-context";
import { AuthProvider } from "../contexts/AuthContext";
// import { useAuth } from "../contexts/AuthContext";


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
  },
};

export const Default = {
  parameters: {
    reactContext: {
      context: AuthProvider,
      contextValue: {  isAuthenticated: true },
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