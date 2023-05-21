import { ReactSelect } from "@/components/HookForm/ReactSelect";
import { Input } from "@/components/HookForm/Input";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/HookForm/Button";

interface Props {
  index: number;
  remove: (i: number) => void;
  equipmentOptions: any;
  equipmentsKeys: any;
}

export const EquipmentItem = ({
  index,
  remove,
  equipmentOptions,
  equipmentsKeys,
}: Props) => {
  const { watch } = useFormContext();
  const equipmentOption = watch(`equipment.${index}.type`);
  const count = watch(`equipment.${index}.count`);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
      <ReactSelect
        id={`equipment.${index}.type`}
        options={equipmentOptions}
        label="Оборудование"
        helperText={""}
        rules={{
          required: "Обязательное поле",
        }}
      />
      <div className="flex ">
        <Input
          id={`equipment.${index}.count`}
          label="Количество"
          type="number"
          helperText={`${
            equipmentsKeys[equipmentOption?.value]?.avgCost * count
          }`}
          validation={{
            required: "Обязательное поле",
          }}
        />
        <Button
          className="mt-8 ml-4"
          onClick={() => remove(index)}
          type="button"
          variant="link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};
