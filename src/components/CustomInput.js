import React from "react";
import classNames from "classnames";

const CustomInput = ({ className, ...rest }) => {
  return (
    <input
      className={classNames(
        "shadow",
        "border",
        "rounded-lg",
        "w-full",
        "py-3",
        "px-3",
        "text-gray-700",
        "focus:outline-none",
        "focus:shadow-outline",
        className
      )}
      {...rest}
    />
  );
};

export default CustomInput;
