import { useState, useEffect } from "react";

export const CheckBox = ({ nextSlide }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isChecked) {
        nextSlide();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isChecked, nextSlide]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="checkBox">
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={`checkbox ${isChecked ? "checkBoxAct" : "checkBoxDisact"}`}
      ></input>
      <label htmlFor="switch">Autoplay</label>
    </div>
  );
};
