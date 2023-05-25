import React from "react";
import { RED_COLOR_HEX } from "../constants";

interface Props {
  children: string;
  style?: React.CSSProperties;
}
const SectionTitle = ({ children, style }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        color: RED_COLOR_HEX,
        fontWeight: "bold",
        fontSize: "14px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SectionTitle;
