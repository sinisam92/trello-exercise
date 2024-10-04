import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { PiWarningFill, PiInfoFill } from "react-icons/pi";
import { MdError } from "react-icons/md";

const ALERT_ICONS = {
  warning: <PiWarningFill className="shrink-0 text-yellow-700 w-[50px] h-[50px]" />,
  info: <PiInfoFill className="shrink-0 text-blue-700 w-[50px] h-[50px]" />,
  error: <MdError className="shrink-0 text-red-700 w-[50px] h-[50px]" />,
};
const AlertBanner = ({ children, theme, icon }) => {
  const alertClasses = twMerge(
    "flex p-4 rounded-lg items-center space-x-2",
    theme === "warning" && "bg-yellow-300",
    theme === "info" && "bg-blue-300",
    theme === "error" && "bg-red-300"
  );

  return (
    <div className={alertClasses}>
      {icon || ALERT_ICONS[theme]}
      <div>{children}</div>
    </div>
  );
};

AlertBanner.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(["warning", "info", "error"]),
  dataTestId: PropTypes.string,
  dataTest: PropTypes.string,
  icon: PropTypes.node,
};

export default AlertBanner;
