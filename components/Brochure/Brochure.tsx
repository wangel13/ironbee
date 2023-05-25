"use client";

import React, { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "./fonts/Roboto-Light.ttf",
    },
    {
      src: "./fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "./fonts/Roboto-Medium.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
  },
});

const MyDoc = ({ html }: { html: any }) => (
  <Document style={styles.page}>
    <Page size="A4">
      <Html>{html}</Html>
      ук
    </Page>
  </Document>
);

const Brochure = ({ html }: { html: any }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div>
          <PDFDownloadLink
            document={<MyDoc html={html} />}
            fileName="Отчет о затратах.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Brochure;
