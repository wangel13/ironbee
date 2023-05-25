import React from "react";
import { A4List } from "../components/A4List";

export const TitleList = () => {
  return (
    <A4List hideBackground hideLogo>
      <div
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        <img
          src="./brochure/departImage.png"
          alt=""
          style={{
            position: "absolute",
            imageRendering: "pixelated",
            height: "32px",
            top: "16px",
            left: "40px",
          }}
        />
        <div
          style={{ padding: "20px", paddingTop: "80px", paddingBottom: "80px" }}
        >
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>ОТЧЕТ</span>
          <br></br>
          <span style={{ fontSize: "20px" }}>
            О ВОЗМОЖНЫХ ЗАТРАТАХ НА ЗАПУСК ПРОМЫШЛЕННОГО ПРОИЗВОДСТВА В ГОРОДЕ
            МОСКВЕ
          </span>
        </div>
        <img
          src="./brochure/landingImage.jpg"
          alt=""
          style={{
            minWidth: "100%",
            display: "block",
            width: "100%",
          }}
        />
      </div>
    </A4List>
  );
};
