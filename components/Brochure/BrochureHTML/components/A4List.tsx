import React, { ReactElement } from "react";

interface Props {
  children: ReactElement | ReactElement[];
  hideBackground?: boolean;
  hideLogo?: boolean;
  headerText?: string;
  footerText?: string;
}
export const A4List = ({
  children,
  hideBackground = false,
  hideLogo = false,
  headerText = "",
  footerText = "",
}: Props) => {
  return (
    <>
      <div
        style={{
          background: "white",
          width: "21cm",
          height: "29.7cm",
          display: "block",
          boxSizing: "border-box",
        }}
      >
        {/* Подложка */}
        <img
          src="/brochure/layout.png"
          alt=""
          style={{
            position: "absolute",
            minWidth: "100%",
            minHeight: "100%",
            display: "block",
            height: "100%",
            width: "100%",
          }}
        />

        {/* Лого */}
        {hideLogo ? (
          <></>
        ) : (
          <img
            src="/brochure/departImageShort.png"
            alt=""
            style={{
              position: "absolute",
              imageRendering: "pixelated",
              height: "32px",
              top: "16px",
              left: "40px",
            }}
          />
        )}

        {/* Заголовк старницы */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            paddingRight: "40px",
            width: "100%",
            textAlign: "right",
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {headerText}
        </div>

        <div
          style={
            hideBackground
              ? {}
              : {
                  background: "white",
                  height: "100%",
                  marginLeft: "40px",
                  marginRight: "40px",
                  marginTop: "60px",
                  padding: "30px",
                }
          }
        >
          {children}
        </div>
        {footerText ? (
          <div
            style={{
              paddingTop: "10px",
              paddingLeft: "40px",
              paddingRight: "40px",
              fontSize: "8px",
              textAlign: "justify",
              color: "white",
            }}
          >
            {footerText}
          </div>
        ) : (
          <></>
        )}
        <div style={{ marginBottom: "60px" }}></div>
      </div>
    </>
  );
};
