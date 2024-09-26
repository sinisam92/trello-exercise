/**
 * Returns a dynamic font size based on the length of the string.
 *
 * @param {string} string - The string to check the length of.
 * @param {number} longString - The length of the string that is considered long.
 * @param {number} mediumString - The length of the string that is considered medium.
 */

const dynamicFontForLongStrings = (string, longString, mediumString) => {
  if (string.length > longString) {
    return "text-md";
  } else if (string.length > mediumString) {
    return "text-xl";
  } else {
    return "text-2xl";
  }
};

const changeTheme = (theme) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};

export { dynamicFontForLongStrings, changeTheme };
