import "tailwindcss/tailwind.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: "Dark", value: "#264653" },
        { name: "Light", value: "#fffdfd" },
        { name: "Purple", value: "#a8b1eb" },
      ],
      default: "Purple",
    },
  },
};

export default preview;
