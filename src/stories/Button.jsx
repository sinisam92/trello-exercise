import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

//TODO: move this to components folder
/**
 * Primary UI component for user interaction
 */
export const Button = ({ variation, size, label, extraClasses, ...props }) => {
/**
   * The mode of the button based on the primary prop
   * swithces the color of the button and hover effect
   */
const mode = {
  primary: "text-white bg-primary cursor-pointer hover:bg-primaryHover",
  disabled: "bg-disabled border-0 text-white cursor-not-allowed",
  white: "border border-black text-primary cursor-pointer hover:bg-primary hover:text-white",
};

/**
 * The size of the button based on the size prop
 */
const sizeClasses = {
  xs: "text-xs px-2 py-1 w-fit",
  s: "text-base px-6 py-4 w-fit",
  m: "text-md px-12 py-4",
  full: "text-lg px-32 py-8 w-full",
};

/**
 * This make classes overridable easier and more readable and easily maintainable
 */
const classes = twMerge(
  "font-bold rounded-lg inline-block leading-3 tracking-wider transition-colors duration-300",
  sizeClasses[size],
  mode[variation],
  extraClasses
);
  return (
    <button
      type="button"
      className={classes}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  variation: PropTypes.oneOf(["primary", "disabled", "white"]),
  size: PropTypes.oneOf(['xs', 's', 'm', 'full']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// Button.defaultProps = {
//   primary: "primary",
//   size: 'm',
//   onClick: undefined,
// };
