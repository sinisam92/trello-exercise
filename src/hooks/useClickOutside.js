import { useEffect } from "react";

const useClickOutside = (refs, callback) => {
  const handleClickOutside = (event) => {
    const clickedOutside = refs.every(
      (ref) => ref.current && !ref.current.contains(event.target)
    );
    if (clickedOutside) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs]);
};

export default useClickOutside;
