import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Page, StyleSheet, Font, pdf } from "@react-pdf/renderer";
import Html from "react-pdf-html";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/fonts/Roboto-Light.ttf",
    },
    {
      src: "/fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Roboto-Medium.ttf",
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
    </Page>
  </Document>
);

const useGeneratePDFDocument = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (html: string) => {
    setIsGenerating(true);
    const blob = await pdf(<MyDoc html={html} />).toBlob();
    saveAs(blob, "Отчет о затратах.pdf");
    setIsGenerating(false);
  };

  return { generate, isGenerating };
};

export default useGeneratePDFDocument;
