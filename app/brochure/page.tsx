import Brochure from "@/components/Brochure/Brochure";

const getData = async (Component: any) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(<Component />);
  return staticMarkup;
};

const STATIC_COMPONENT = () => {
  const test = "aaaa";

  return (
    <div
      style={{
        background: "white",
        width: "21cm",
        height: "29.7cm",
        display: "block",
        boxSizing: "border-box",
      }}
    >
      <img
        src="./asd.png"
        style={{
          position: "absolute",
          minWidth: "100%",
          minHeight: "100%",
          display: "block",
          height: "100%",
          width: "100%",
        }}
      />
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
      <div style={{ backgroundImage: "url(/asd.png)" }}>
        <h1>Heading 1 with {test}</h1>
        <h2 style={{ backgroundColor: "pink" }}>Heading 2</h2>
        ...
      </div>
    </div>
  );
};

export default async function BrochurePage() {
  const html = await getData(STATIC_COMPONENT);

  return (
    <>
      {/* <STATIC_COMPONENT /> */}
      <Brochure html={html} />
    </>
  );
}
