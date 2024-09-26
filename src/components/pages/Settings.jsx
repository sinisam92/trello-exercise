import ThemeSwitch from "../ThemeSwitch";
import ToggleSwitch from "../ToggleSwitch";

const Settings = () => {
  return (
    <div>
      <ThemeSwitch />
      <div className="border-b border-black ">
        <div className="md:w-3/4 mx-auto">
          <h3 className="pl-2 pt-2">Accessibility</h3>
          <div className="h-20 flex items-center justify-between">
            <h1 className="text-nowrap indent-5 font-semibold text-xl">
              Enable Animations
            </h1>
            <div className="flex-end mr-4">
              <ToggleSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
