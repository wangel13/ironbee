"use client";

import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { Button } from "../HookForm/Button";
import { Input } from "../HookForm/Input";
import LoadingIcon from "../LoadingIcon";
import { ReactSelect } from "../HookForm/ReactSelect";
import map from "lodash/map";
import reduce from "lodash/reduce";
import get from "lodash/get";
import keyBy from "lodash/keyBy";
import { Accordion } from "../Accordion";
import { Equipment } from "./components/Equipment/Equipment";

type Inputs = {
  equipment: any;
};

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

class Calculator3000 {
  industryKeys: any;
  equipmentsKeys: any;
  areaKeys: any;
  legalFormsKeys: any;
  data: any;
  patentsKeys: any;

  constructor(
    data: any,
    industryKeys: any,
    equipmentsKeys: any,
    areaKeys: any,
    legalFormsKeys: any,
    patentsKeys: any
  ) {
    this.data = data;
    this.industryKeys = industryKeys;
    this.equipmentsKeys = equipmentsKeys;
    this.areaKeys = areaKeys;
    this.legalFormsKeys = legalFormsKeys;
    this.patentsKeys = patentsKeys;
  }

  calcEquipment() {
    const equipment = this.data?.equipment;

    const equipmentPrice = reduce(
      equipment,
      (acc, item) => {
        const equipmentId = get(item, "type.value");
        const equipmentCount = get(item, "count", 0);
        const equipmentPrice = get(
          this.equipmentsKeys,
          [equipmentId, "avgCost"],
          0
        );
        return acc + equipmentCount * equipmentPrice;
      },
      0
    );
    return equipmentPrice;
  }

  calcAreaBuildingCost() {
    const areaBuildingCost = 100000;
    const areaBuildingSize = get(this.data, "areaBuildingSize", 0);

    const areaCost = areaBuildingCost * areaBuildingSize;
    return areaCost;
  }

  calcRentalAreaCost() {
    const area = get(this.areaKeys, this.data?.area?.value);
    const areaRentalSize = get(this.data, "areaRentalSize", 0);

    const areaCost = get(area, "avgCost", 0) * areaRentalSize;
    return areaCost;
  }

  // ИМЕЕТ СМЫСЛ РАЗДЕЛИТЬ - СМ. БРОШЮУРУ
  calcWorkersTaxes() {
    // Считаем расходы на сотрудников
    let workersSalary = this.calcWorkersSalary();
    // Налоги
    const workersTaxes = workersSalary * (0.22 + 0.051);
    return workersTaxes;
  }

  calcWorkersSalary() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);
    const workersCount = get(this.data, "workersCount", 0);

    // Считаем расходы на сотрудников
    let workersSalary = workersCount * industry?.avgSalary * 12;
    return workersSalary;
  }

  calcStateDuty() {
    const legalFormId = this.data?.legalForm?.value;
    const legalForm = get(this.legalFormsKeys, legalFormId);
    return get(legalForm, "stateDuty", 0);
  }

  calcBuhAvgCost() {
    const usn = this.data?.usn;
    const legalFormId = this.data?.legalForm?.value;
    const legalForm = get(this.legalFormsKeys, legalFormId);

    if (usn) {
      return get(legalForm, "usnBuhAvgCost", 0) * 12;
    }
    if (!usn) {
      return get(legalForm, "osnBuhAvgCost", 0) * 12;
    }

    return 0;
  }

  calcAvgTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgTaxes", 0);
  }

  calcAvgIncomeTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgIncomeTaxes", 0);
  }

  calcAvgPropertyTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgPropertyTaxes", 0);
  }

  calcAvgLandTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgLandTaxes", 0);
  }

  calcAvgTransportTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgTransportTaxes", 0);
  }

  calcAvgOtherTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgOtherTaxes", 0);
  }

  calcPatents() {
    const patents = this.data?.patents;

    const patentsCost = reduce(
      patents,
      (acc, { value }) => {
        const cost = get(this.patentsKeys, [value, "cost"], 0);
        return acc + cost;
      },
      0
    );

    return patentsCost;
  }

  calcTotal() {
    return (
      this.calcWorkersSalary() +
      this.calcWorkersTaxes() +
      this.calcEquipment() +
      this.calcRentalAreaCost() +
      this.calcAreaBuildingCost() +
      this.calcStateDuty() +
      this.calcBuhAvgCost() +
      this.calcAvgTaxes() +
      this.calcAvgIncomeTaxes() +
      this.calcAvgPropertyTaxes() +
      this.calcAvgLandTaxes() +
      this.calcAvgTransportTaxes() +
      this.calcAvgOtherTaxes() +
      this.calcPatents()
    );
  }
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
  const { trigger, isMutating } = useSWRMutation("/api/project", sendRequest, {
    onSuccess: () => {
      toast.success("Проект успешно создан");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => trigger(data);

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

  const equipmentsKeys = useMemo(() => keyBy(equipments, "id"), [equipments]);
  const industryKeys = useMemo(() => keyBy(industries, "id"), [industries]);
  const areaKeys = useMemo(() => keyBy(areas, "id"), [areas]);
  const legalFormsKeys = useMemo(() => keyBy(legalForms, "id"), [legalForms]);
  const patentsKeys = useMemo(() => keyBy(patents, "id"), [patents]);

  const equipmentValue = methods.watch("equipment", []);
  const allValues = methods.watch();

  const calculator = new Calculator3000(
    allValues,
    industryKeys,
    equipmentsKeys,
    areaKeys,
    legalFormsKeys,
    patentsKeys
  );

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

        <Accordion
          items={[
            {
              header: "Оборудование",
              count: equipmentValue.length,
              content: (
                <div className="">
                  <Equipment
                    equipmentOptions={equipmentsOptions}
                    equipmentsKeys={equipmentsKeys}
                  />
                </div>
              ),
              // disabled: true, МОЖНО БЛОКИРОВАТЬ ПОКА НЕ ВЫБРАНА ОТРАСЛЬ, ЧТОБЫ НЕ БЫЛО NaN
            },
            {
              header: "Затраты на покупку земли",
              content: (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <ReactSelect
                    id="area"
                    options={areasOptions}
                    label="Район"
                    helperText={"в этом районе будет производство"}
                    rules={{
                      required: "Обязательное поле",
                    }}
                  />
                  <Input
                    id="areaRentalSize"
                    label="Сколько площади необходимо, м2"
                    type="number"
                    validation={{
                      required: "Обязательное поле",
                    }}
                  />
                </div>
              ),
            },
            {
              header: "Затраты на капитальное строительство",
              content: (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <Input
                    id="areaBuildingSize"
                    label="Объем капитального строительства, м2"
                    type="number"
                    validation={{
                      required: "Обязательное поле",
                    }}
                  />
                </div>
              ),
            },
            {
              header: "Затраты на персонал",
              content: (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <Input
                    id="workersCount"
                    label="Кол-во сотрудников"
                    type="number"
                    validation={{
                      required: "Обязательное поле",
                    }}
                    helperText={String(calculator.calcWorkersSalary())}
                  />
                </div>
              ),
            },
            {
              header: "Патенты",
              content: <div className=""></div>,
            },
            {
              header: "Услуги",
              content: <div className=""></div>,
            },
            {
              header: "Налоги",
              content: <div className=""></div>,
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
