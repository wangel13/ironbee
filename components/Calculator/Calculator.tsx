"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { Button } from "../HookForm/Button";
import { Input } from "../HookForm/Input";
import LoadingIcon from "../LoadingIcon";
import { ReactSelect } from "../HookForm/ReactSelect";
import map from "lodash/map";
import keyBy from "lodash/keyBy";
import { Accordion } from "../Accordion";
import { Equipment } from "./components/Equipment/Equipment";
import { formatCurrency } from "@/lib/formatCurrency";
import { Calculator3000 } from "./calculator";
import toNumber from "lodash/toNumber";
import { useRouter } from "next/navigation";
import DynamicMap from "./components/AreaMap/DynamicMap";

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

// function calculate(
//   formData: any,
//   industryKeys: any,
//   equipmentsKeys: any,
//   areaKeys: any
// ) {
//   const industryId = formData?.industry?.value;
//   const equipment = formData?.equipment;
//   const areaRentalSize = get(formData, "areaRentalSize", 0);
//   const area = get(areaKeys, formData?.area?.value);
//   const industry = get(industryKeys, industryId);

//   // Считаем расходы на сотрудников
//   const workersCount = get(formData, "workersCount", 0);
//   let workersSalary = workersCount * industry?.avgSalary;
//   // Налоги
//   const workersTaxes = workersSalary * (0.22 + 0.051);

//   const equipmentPrice = reduce(
//     equipment,
//     (acc, item) => {
//       const equipmentId = get(item, "type.value");
//       const equipmentCount = get(item, "count", 0);
//       const equipmentPrice = get(equipmentsKeys, [equipmentId, "avgCost"], 0);
//       return acc + equipmentCount * equipmentPrice;
//     },
//     0
//   );

//   const areaCost = get(area, "avgCost", 0) * areaRentalSize;

//   return workersTaxes + workersSalary + equipmentPrice + areaCost;
// }

interface CalculatorProps {
  equipments: any;
  industries: any;
  areas: any;
  patents: any;
  legalForms: any;
}

const Calculator = ({
  equipments,
  industries,
  areas,
  patents,
  legalForms,
}: CalculatorProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation("/api/project", sendRequest, {
    onSuccess: () => {
      toast.success("Проект успешно сохранен");
      router.push("/projects");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const industriesOptions = useMemo(
    () =>
      map(industries, (industry) => ({
        value: industry.id,
        label: industry.name,
      })),
    [industries]
  );

  const legalFormsOptions = useMemo(
    () =>
      map(legalForms, (legalForm) => ({
        value: legalForm.id,
        label: legalForm.name,
      })),
    [legalForms]
  );

  const equipmentsOptions = useMemo(
    () =>
      map(equipments, (equipment) => ({
        value: equipment.id,
        label: equipment.name,
      })),
    [equipments]
  );

  const areasOptions = useMemo(
    () =>
      map(areas, (area) => ({
        value: area.id,
        label: area.name,
      })),
    [areas]
  );

  const patentsOptions = useMemo(
    () =>
      map(patents, (patent) => ({
        value: patent.id,
        label: patent.name,
      })),
    [patents]
  );

  const equipmentsKeys = useMemo(() => keyBy(equipments, "id"), [equipments]);
  const industryKeys = useMemo(() => keyBy(industries, "id"), [industries]);
  const areaKeys = useMemo(() => keyBy(areas, "id"), [areas]);
  const legalFormsKeys = useMemo(() => keyBy(legalForms, "id"), [legalForms]);
  const patentsKeys = useMemo(() => keyBy(patents, "id"), [patents]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      industry: industriesOptions[0],
      legalForm: legalFormsOptions[0],
      area: areasOptions[0],
      areaSize: 0,
      patents: [],
      equipment: [],
      areaBuildingSize: 0,
      workersCount: 0,
    },
  });

  const allValues = methods.watch();

  useEffect(() => {
    methods.resetField("patents");
  }, [allValues.legalForm, methods]);

  const calculator = new Calculator3000(
    allValues,
    industryKeys,
    equipmentsKeys,
    areaKeys,
    legalFormsKeys,
    patentsKeys
  );

  const onSubmit = async (data: any) => {
    trigger({
      authorId: session?.user?.id,
      minCost: calculator.calcTotal(),
      maxCost: calculator.calcTotal(),
      workers: toNumber(data?.workersCount),
      areaBuildingSize: toNumber(data?.areaBuildingSize),
      // TODO:
      usn: true,
      costAreaBuildingSize: 100000,
      areaRentalSize: toNumber(data?.areaSize),
      legalFormId: data?.legalForm?.value,
      areaId: data?.area?.value,
      industryId: data?.industry?.value,
    });
  };

  // const onSubmit: SubmitHandler<Inputs> = () =>
  //   trigger({
  //     authorId: 1,
  //     minCost: 1,
  //     maxCost: 1,
  //     workers: 1,
  //     areaBuildingSize: 1,
  //     usn: true,
  //     costAreaBuildingSize: 1,
  //     areaRentalSize: 1,
  //     legalFormId: 1,
  //     areaId: 1,
  //     industryId: 102,
  //   });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
          <div className="flex flex-col gap-4">
            <ReactSelect
              id="industry"
              options={industriesOptions}
              label="Отрасль производства"
              helperText={"в какой сфере будет ваше предприятие"}
              rules={{
                required: "Обязательное поле",
              }}
            />
            <ReactSelect
              id="legalForm"
              options={legalFormsOptions}
              label="Форма организации предприятия"
              helperText={"от неё зависят некоторые параметры"}
              rules={{
                required: "Обязательное поле",
              }}
            />
          </div>
          <div>
            <div>Администаривный округ (выберете на карте)</div>
            <DynamicMap
              className="h-96 w-full my-2"
              areasOptions={areasOptions}
            />
            <ReactSelect
              id="area"
              options={areasOptions}
              helperText={"в этом АО будет производство"}
              rules={{
                required: "Обязательное поле",
              }}
            />
          </div>
        </div>

        <Accordion
          items={[
            {
              header: "Оборудование",
              count: formatCurrency(calculator.calcEquipment()),
              content: (
                <div className="">
                  <Equipment
                    calculator={calculator}
                    equipmentOptions={equipmentsOptions}
                    equipmentsKeys={equipmentsKeys}
                  />
                </div>
              ),
              // disabled: true, МОЖНО БЛОКИРОВАТЬ ПОКА НЕ ВЫБРАНА ОТРАСЛЬ, ЧТОБЫ НЕ БЫЛО NaN
            },
            {
              header: "Затраты на покупку земли",
              count: formatCurrency(
                calculator.calcAreaTaxes() + calculator.calcAreaCost()
              ),

              content: (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <Input
                    id="areaSize"
                    label="Сколько площади необходимо, м2"
                    type="number"
                    validation={{
                      max: {
                        value: 10000000,
                        message: "Максимум 1 000 000, м2",
                      },
                      required: "Обязательное поле",
                    }}
                    helperText={`в том числе налоги ${formatCurrency(
                      calculator.calcAreaTaxes()
                    )}`}
                  />
                </div>
              ),
            },
            {
              header: "Затраты на капитальное строительство",
              count: formatCurrency(
                calculator.calcAreaBuildingCost() +
                  calculator.calcAreaBuildingTaxes()
              ),
              content: (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <Input
                    id="areaBuildingSize"
                    label="Объем капитального строительства, м2"
                    type="number"
                    validation={{
                      max: {
                        value: 10000000,
                        message: "Максимум 1 000 000, м2",
                      },
                      required: "Обязательное поле",
                    }}
                    helperText={`в том числе налоги ${formatCurrency(
                      calculator.calcAreaBuildingTaxes()
                    )}`}
                  />
                </div>
              ),
            },
            {
              header: "Затраты на персонал",
              count: formatCurrency(
                calculator.calcWorkersSalary() + calculator.calcWorkersTaxes()
              ),
              content: (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <Input
                    id="workersCount"
                    label="Кол-во сотрудников"
                    type="number"
                    validation={{
                      max: {
                        value: 10000,
                        message: "Максимум 10 000 сотрудников",
                      },
                      required: "Обязательное поле",
                    }}
                    helperText={`в том числе налоги ${formatCurrency(
                      calculator.calcWorkersTaxes()
                    )}`}
                  />
                </div>
              ),
            },
            ...(allValues.legalForm?.label === "ИП"
              ? [
                  {
                    header: "Патенты",
                    count: formatCurrency(calculator.calcPatents()),
                    content: (
                      <div className="">
                        <ReactSelect
                          id="patents"
                          isMulti
                          options={patentsOptions}
                          label="Необходимые патенты для вашего предприятия"
                          helperText={""}
                          // rules={{
                          //   required: "Обязательное поле",
                          // }}
                        />
                      </div>
                    ),
                  },
                ]
              : []),
            {
              header: "Услуги",
              count: formatCurrency(calculator.calcBuhAvgCost()),
              content: (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 justify-between">
                    <div>Услуги бухгалтера</div>
                    <div className="border-dotted border-b-2 flex-1"></div>
                    <div>{formatCurrency(calculator.calcBuhAvgCost())}</div>
                  </div>
                </div>
              ),
            },
            {
              header: "Налоги",
              count: formatCurrency(
                calculator.calcStateDuty() +
                  calculator.calcAvgTransportTaxes() +
                  calculator.calcAvgIncomeTaxes() +
                  calculator.calcAvgTaxes() +
                  calculator.calcAvgOtherTaxes()
              ),
              content: (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 justify-between">
                    <div>Госпошлина</div>
                    <div className="border-dotted border-b-2 flex-1"></div>
                    <div>{formatCurrency(calculator.calcStateDuty())}</div>
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div>Средние транспортные налоги по отрасли</div>
                    <div className="border-dotted border-b-2 flex-1"></div>
                    <div>
                      {formatCurrency(calculator.calcAvgTransportTaxes())}
                    </div>
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div>Средние подоходные налоги по отрасли</div>
                    <div className="border-dotted border-b-2 flex-1"></div>
                    <div>{formatCurrency(calculator.calcAvgIncomeTaxes())}</div>
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div>Средние налоги по отрасли</div>
                    <div className="border-dotted border-b-2 flex-1"></div>
                    <div>{formatCurrency(calculator.calcAvgTaxes())}</div>
                  </div>
                  <div className="flex gap-3 justify-between">
                    <div>Средние другие налоги по отрасли</div>
                    <div className="border-dotted border-b-2 flex-1"></div>
                    <div>{formatCurrency(calculator.calcAvgOtherTaxes())}</div>
                  </div>
                </div>
              ),
            },
            // {
            //   header: "Запуск производства",
            //   content: <div className=""></div>,
            // },
            // {
            //   header: "Операционная работа",
            //   content: <div className=""></div>,
            // },
          ]}
        />

        <div className="grid justify-items-end">
          <div className="bg-lime-500 text-white rounded-lg text-right font-semibold text-2xl p-4">
            {formatCurrency(calculator.calcTotal())}
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" variant="fill" disabled={isMutating}>
            {isMutating ? (
              <>
                <LoadingIcon /> Загрузка
              </>
            ) : (
              <p>Расчет</p>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Calculator;
