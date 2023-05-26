import { ReactElement } from "react";
import BrochureClientLink from "./BrochureClientLink";
import BrochureHTML from "./BrochureHTML/BrochureHTML";

const getData = async (Component: any) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(<Component />);
  return staticMarkup;
};

export default async function BrochurePDFGenerator() {
  const html = await getData(BrochureHTML);

  return (
    <>
      <BrochureClientLink html={html} />
    </>
  );
}
