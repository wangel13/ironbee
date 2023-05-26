import React, { ReactElement } from "react";

interface Props {
  children: ReactElement | ReactElement[];
  iconLink: string;
  style?: React.CSSProperties;
}
const BigSection = ({ children, iconLink, style }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "self-start",
        width: "100%",
        ...style,
      }}
    >
      <div
        style={{
          flexBasis: "10%",
          paddingRight: "10px",
        }}
      >
        <img src={iconLink} alt="" style={{ imageRendering: "pixelated" }} />
      </div>
      <div
        style={{
          fontSize: "14px",
          wordWrap: "break-word",
          flexBasis: "90%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BigSection;
