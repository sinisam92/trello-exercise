import React from "react";
import { useAnimation } from "../../contexts/AnimationContext";

const ToggleSwitch = () => {
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();

  const handleOnChange = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  return (
    <>
      <h3 className="pl-2 pt-2">Accessibility</h3>
      <div className="h-20 flex items-center justify-between">
        <h1 className="text-nowrap indent-5 font-semibold text-xl">
          Enable Animations
        </h1>
        <div className="flex-end mr-4"></div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id="switch"
            type="checkbox"
            className="peer sr-only"
            checked={animationsEnabled}
            onChange={handleOnChange}
          />
          <label htmlFor="switch" className="hidden"></label>
          <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-primary after:transition-all after:content-[''] peer-checked:bg-secundary peer-checked:after:translate-x-full peer-checked:after:border-secundary peer-focus:ring-secundary"></div>
        </label>
      </div>
    </>
  );
};

export default ToggleSwitch;
