import Brochure from "@/components/Brochure/Brochure";

const getData = async (component: any) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
  return staticMarkup;
};

const STATIC_COMPONENT = (
  <html>
    <body>
      <style>
        {`
      .heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }`}
      </style>
      <h1>Heading 1</h1>
      <h2 style={{ backgroundColor: "pink" }}>Heading 2</h2>
      ...
    </body>
  </html>
);

export default async function BrochurePage() {
  const html = await getData(STATIC_COMPONENT);

  return <Brochure html={html} />;
}
