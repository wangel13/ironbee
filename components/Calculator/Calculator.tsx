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
import { formatCurrency, formatPriceRange } from "@/lib/formatCurrency";
import { Calculator3000 } from "./calculator";
import toNumber from "lodash/toNumber";
import find from "lodash/find";
import { useRouter } from "next/navigation";
import DynamicMap from "./components/AreaMap/DynamicMap";
import CreateBrochureButton from "../Brochure/CreateBrochureButton";
import { Alert } from "../Alert";

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

async function sendUpdateRequest(url: string, { arg }: { arg: unknown }) {
  return axios.put(url, arg);
}

const mapDataToForm = (data: any, dicts: any) => {
  if (!data) {
    return {
      industry: dicts.industriesOptions[0],
      legalForm: dicts.legalFormsOptions[0],
      area: dicts.areasOptions[0],
      areaSize: 0,
      patents: [],
      equipment: [],
      areaBuildingSize: 0,
      workersCount: 0,
    };
  }

  return {
    industry: find(dicts.industriesOptions, { value: data.industryId }),
    legalForm: find(dicts.legalFormsOptions, { value: data.legalFormId }),
    area: find(dicts.areasOptions, { value: data.areaId }),
    areaSize: data.areaRentalSize || 0,
    patents: map(data?.patent, ({ id, name }) => ({ label: name, value: id })),
    equipment: map(data.projectsOnEquipment, ({ count, equipmentId }) => ({
      count,
      type: find(dicts.equipmentsOptions, { value: equipmentId }),
    })),
    areaBuildingSize: data.areaBuildingSize || 0,
    workersCount: data.workers || 0,
  };
};

interface CalculatorProps {
  equipments: any;
  industries: any;
  areas: any;
  patents: any;
  legalForms: any;
  project?: any;
}

const Calculator = ({
  equipments,
  industries,
  areas,
  patents,
  legalForms,
  project,
}: CalculatorProps) => {
  const isUpdating = !!project;
  const { data: session, status } = useSession();
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation("/api/project", sendRequest, {
    onSuccess: (resp) => {
      toast.success("Проект успешно сохранен");
      router.push(`/projects/${resp?.data?.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { trigger: triggerUpdate, isMutating: isMutatingUpdate } =
    useSWRMutation(`/api/project/${project?.id}`, sendUpdateRequest, {
      onSuccess: () => {
        toast.success("Проект успешно сохранен");
        // router.push("/projects/my");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
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

  const defaultValues = useMemo(
    () =>
      mapDataToForm(project, {
        industriesOptions,
        legalFormsOptions,
        equipmentsOptions,
        areasOptions,
        patentsOptions,
      }),
    [
      areasOptions,
      equipmentsOptions,
      industriesOptions,
      legalFormsOptions,
      patentsOptions,
      project,
    ]
  );

  const methods = useForm({
    mode: "onChange",
    defaultValues,
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
    const requestData = {
      // Use quest user if not registered
      authorId: session?.user?.id || 1,
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
      equipment: map(data?.equipment, ({ count, type: { value } }) => ({
        count: toNumber(count),
        id: value,
      })),
      patents: map(data?.patents, ({ value }) => toNumber(value)),
    };

    if (isUpdating) {
      triggerUpdate(requestData);
    } else {
      trigger(requestData);
    }
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
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-4">
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
              <Alert
                severity="info"
                title="Расчеты включают в себя запуск и 1 год операционной
                деятельности"
              ></Alert>
            </div>
            <div>
              <div>Административный округ Москвы</div>
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
                header: "Затраты на персонал",
                count: formatPriceRange(
                  calculator.calcWorkersSalary() + calculator.calcWorkersTaxes()
                ),
                content: (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                    <Input
                      id="workersCount"
                      label="Кол-во сотрудников"
                      type="number"
                      validation={{
                        min: 0,
                        max: {
                          value: 10000,
                          message: "Максимум 10 000 сотрудников",
                        },
                        required: "Обязательное поле",
                      }}
                      helperText={`в том числе страховые взносы ${formatPriceRange(
                        calculator.calcWorkersTaxes()
                      )}`}
                    />
                  </div>
                ),
              },
              {
                header: "Затраты на аренду земли",
                count: formatPriceRange(calculator.calcAreaCost()),

                content: (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                    <Input
                      id="areaSize"
                      label="Сколько площади необходимо, м²"
                      type="number"
                      validation={{
                        min: 0,
                        max: {
                          value: 10000000,
                          message: "Максимум 1 000 000, м²",
                        },
                        required: "Обязательное поле",
                      }}
                      helperText={`аренда земли у государства`}
                      // helperText={`в том числе налоги ${formatCurrency(
                      //   calculator.calcAreaTaxes()
                      // )}`}
                    />
                  </div>
                ),
              },
              {
                header: "Затраты на капитальное строительство",
                count: formatPriceRange(
                  calculator.calcAreaBuildingCost() +
                    calculator.calcAreaBuildingTaxes()
                ),
                content: (
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                    <Input
                      id="areaBuildingSize"
                      label="Объем капитального строительства, м²"
                      type="number"
                      validation={{
                        min: 0,
                        max: {
                          value: 10000000,
                          message: "Максимум 1 000 000, м²",
                        },
                        required: "Обязательное поле",
                      }}
                      helperText={`в том числе налоги ${formatPriceRange(
                        calculator.calcAreaBuildingTaxes()
                      )}`}
                    />
                  </div>
                ),
              },
              {
                header: "Оборудование",
                count: formatPriceRange(calculator.calcEquipment()),
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
                header: "Налоги",
                count: formatPriceRange(
                  calculator.calcStateDuty() +
                    calculator.calcAvgTransportTaxes() +
                    calculator.calcAvgIncomeTaxes() +
                    // calculator.calcAvgTaxes() +
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
                        {formatPriceRange(calculator.calcAvgTransportTaxes())}
                      </div>
                    </div>
                    <div className="flex gap-3 justify-between">
                      <div>Средние подоходные налоги по отрасли</div>
                      <div className="border-dotted border-b-2 flex-1"></div>
                      <div>
                        {formatPriceRange(calculator.calcAvgIncomeTaxes())}
                      </div>
                    </div>
                    {/* <div className="flex gap-3 justify-between">
                      <div>Средние налоги по отрасли</div>
                      <div className="border-dotted border-b-2 flex-1"></div>
                      <div>{formatPriceRange(calculator.calcAvgTaxes())}</div>
                    </div> */}
                    <div className="flex gap-3 justify-between">
                      <div>Средние другие налоги по отрасли</div>
                      <div className="border-dotted border-b-2 flex-1"></div>
                      <div>
                        {formatPriceRange(calculator.calcAvgOtherTaxes())}
                      </div>
                    </div>
                  </div>
                ),
              },
              ...(allValues.legalForm?.label === "ИП"
                ? [
                    {
                      header: "Патенты",
                      count: formatPriceRange(calculator.calcPatents()),
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
                count: formatPriceRange(calculator.calcBuhAvgCost()),
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

          <div className="mt-4 grid justify-items-end">
            <div className="bg-lime-500 text-white rounded-lg text-right font-semibold text-2xl py-4 px-8">
              {formatPriceRange(calculator.calcTotal())}
            </div>
          </div>

          {isUpdating && (
            <div className="mt-4 ">
              <Alert severity="info" title="Информация">
                Вы можете поделится проектом, скопировав адрес из адресной
                строки
              </Alert>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            {isUpdating ? (
              <Button
                className="w-full"
                variant="fill"
                disabled={isMutatingUpdate || !methods?.formState?.isValid}
              >
                {isMutatingUpdate ? (
                  <>
                    <LoadingIcon /> Загрузка...
                  </>
                ) : (
                  <>Сохранить</>
                )}
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="fill"
                disabled={isMutating || !methods?.formState?.isValid}
              >
                {isMutating ? (
                  <>
                    <LoadingIcon /> Загрузка...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                      />
                    </svg>
                    Сохранить
                  </>
                )}
              </Button>
            )}
            <CreateBrochureButton calculator={calculator} />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Calculator;
