import React, { ReactElement } from "react";

interface Props {
  children: number | string;
  title: string;
  iconLink: string;
  style?: React.CSSProperties;
  isBigTitle?: boolean;
}
const Section = ({
  children,
  title,
  iconLink,
  style,
  isBigTitle = false,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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
          fontWeight: "bold",
          fontSize: "12px",
          flexBasis: `${isBigTitle ? "60%" : "30%"}`,
          paddingRight: "10px",
        }}
      >
        {title}:
      </div>
      <div
        style={{
          fontSize: "12px",
          wordWrap: "break-word",
          flexBasis: `${isBigTitle ? "30%" : "60%"}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;
