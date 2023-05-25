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
  family: "Ubuntu",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
  },
  page: {
    width: "100%",
    height: "100%",
    border: "none",
    margin: 0,
    padding: 0,
    fontFamily: "Ubuntu",
  },
});

const MyDoc = ({ html }: { html: any }) => (
  <Document style={styles.page}>
    <Page size="A4" style={styles.page}>
      <Html style={styles.page}>{html}</Html>
      <Html style={styles.page}>{html}</Html>
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
            fileName="somename.pdf"
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
