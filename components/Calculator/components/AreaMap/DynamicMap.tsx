import dynamic from "next/dynamic";

const AreaMap = dynamic(() => import("../AreaMap/AreaMap"), { ssr: false });

export default function DynamicMap(props: any) {
  return <AreaMap {...props} />;
}
