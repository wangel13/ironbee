import React from "react";
import { RED_COLOR_HEX } from "../constants";

interface Props {
  style?: React.CSSProperties;
}
const SectionDivider = ({ style }: Props) => {
  return (
    <div
      style={{
        border: "none",
        borderTop: "1px dotted black",
        borderColor: RED_COLOR_HEX,
        ...style,
      }}
    />
  );
};

export default SectionDivider;
