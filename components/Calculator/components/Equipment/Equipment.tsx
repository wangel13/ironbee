import { Button } from "@/components/HookForm/Button";
import { useFieldArray } from "react-hook-form";
import { EquipmentItem } from "./EquipmentItem";

interface Props {
  equipmentOptions: any;
  equipmentsKeys: any;
}

export const Equipment = ({ equipmentOptions, equipmentsKeys }: Props) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "equipment",
    }
  );

  const handleAppend = () => {
    // e.preventDefault()
    append({
      count: 0,
    });
  };

  return (
    <div className={"flex flex-col gap-8"}>
      {fields.map((field, index) => (
        <EquipmentItem
          key={field.id}
          index={index}
          remove={remove}
          equipmentOptions={equipmentOptions}
          equipmentsKeys={equipmentsKeys}
        />
      ))}
      <div className="text-center">
        <Button onClick={handleAppend} type="button" variant="link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Добавить
        </Button>
      </div>
    </div>
  );
};
