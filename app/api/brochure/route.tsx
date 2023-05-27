import { NextResponse } from "next/server";
import BrochureHTML from "@/components/Brochure/BrochureHTML/BrochureHTML";

const getData = async (Component: any, data: any) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(
    <Component data={data} />
  );
  return staticMarkup;
};

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const html = await getData(BrochureHTML, data);
    return NextResponse.json({ html });
  } catch (e) {
    return NextResponse.json(
      { error: "", message: "Не удалось скачать html" },
      { status: 403 }
    );
  }
}
