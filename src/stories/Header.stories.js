import { Header } from './Header';
import { fn } from '@storybook/test';

export default {
  title: 'Components/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onClick: fn(),
    onMenuClick: fn(),
    onBellClick: fn(),
    onSearchClick: fn(),
  },
};

// export const LoggedIn = {
//   args: {
//     username: 'Jane Doe'
     
//   },
// };

// export const LoggedOut = {};
export const Default = {
  args: {
    hasNotification: false,
  },
};

export const hasNotification = {
  args: {
    hasNotification: true,
  },
};
