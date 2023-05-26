import BrochurePDFGenerator from "@/components/Brochure/BrochurePDFGenerator";

export default async function BrochurePage() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <BrochurePDFGenerator />
    </>
  );
}
