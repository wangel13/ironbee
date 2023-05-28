import LoadingIcon from "@/components/LoadingIcon";
import dynamic from "next/dynamic";

const AreaMap = dynamic(() => import("../AreaMap/AreaMap"), {
  ssr: false,
  loading: () => <div>Загрузка...</div>,
});

export default function DynamicMap(props: any) {
  return (
    <div className={props?.className}>
      <AreaMap {...props} />
    </div>
  );
}
