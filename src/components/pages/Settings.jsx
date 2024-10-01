import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import ToggleSwitch from "../ToggleSwitch";

const Settings = () => {
  return (
    <div>
      <div className="border-b border-black ">
        <div className="md:w-3/4 mx-auto">
          <ThemeSwitch />
        </div>
      </div>
      <div className="border-b border-black ">
        <div className="md:w-3/4 mx-auto">
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
};

export default Settings;
