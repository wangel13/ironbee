import cx from "classnames";
import React from "react";

type Props = Omit<React.ComponentProps<"button">, "className"> & {
  className?: string;
  variant?: "outlined" | "fill" | "link";
  color?: "secondary" | "primary";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { children, className, variant = "fill", color = "primary", ...props },
    ref
  ) => (
    <button
      ref={ref}
      {...props}
      className={cx(
        "inline-flex select-none items-center justify-center rounded-lg py-3 px-6 text font-medium drop-shadow",
        "focus:outline-none focus-visible:ring",
        "disabled:bg-gray-400 disabled:text-gray-600 disabled:drop-shadow-none",
        // Register all radix states
        "group",
        "radix-state-open:bg-red-400",
        "radix-state-on:bg-red-400",
        "radix-state-instant-open:bg-red-400",
        variant === "link" &&
          color === "primary" &&
          "bg-none drop-shadow-none text-red-500 hover:bg-none hover:text-red-600 active:bg-red-50",
        variant === "link" &&
          color === "secondary" &&
          "bg-none drop-shadow-none text-white hover:bg-none hover:text-red-50 active:bg-red-600",
        variant === "outlined" &&
          "border-2 font-normal border-red-500 bg-inherit drop-shadow-none text-black-900 disabled:border-gray-400 hover:bg-red-50 active:bg-red-100",
        variant === "fill" &&
          color === "primary" &&
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-600 active:drop-shadow-none",
        variant === "fill" &&
          color === "secondary" &&
          "bg-white text-red-500 hover:bg-red-50 active:bg-red-100 drop-shadow-none",
        className
      )}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
