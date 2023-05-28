"use client";
import { find, map, toNumber } from "lodash";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ReactSelect } from "../HookForm/ReactSelect";
import { Input } from "../HookForm/Input";
import { Button } from "../HookForm/Button";
import LoadingIcon from "../LoadingIcon";

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.put(url, arg);
}

interface Props {
  industries: any;
}
const EditNormativesForm = ({ industries }: Props) => {
  const industriesOptions = useMemo(
    () =>
      map(industries, (industry) => ({
        value: industry.id,
        label: industry.name,
      })),
    [industries]
  );

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      industry: industriesOptions[0],
      avgWorkers: 0,
      avgSalary: 0,
      avgTaxes: 0,
      avgIncomeTaxes: 0,
      avgPropertyTaxes: 0,
      avgLandTaxes: 0,
      avgNDFL: 0,
      avgTransportTaxes: 0,
      avgOtherTaxes: 0,
    },
  });

  const currentIndustry = methods.watch("industry");
  const currentIndustryValues = useMemo(
    () =>
      find(
        industries,
        //@ts-ignore
        (industries) => industries?.id === currentIndustry?.value
      ),
    [currentIndustry, industries]
  );

  useEffect(() => {
    if (currentIndustry?.value) {
      methods.setValue("avgWorkers", currentIndustryValues?.avgWorkers);
      methods.setValue("avgSalary", currentIndustryValues?.avgSalary);
      methods.setValue("avgTaxes", currentIndustryValues?.avgTaxes);
      methods.setValue("avgIncomeTaxes", currentIndustryValues?.avgIncomeTaxes);
      methods.setValue(
        "avgPropertyTaxes",
        currentIndustryValues?.avgPropertyTaxes
      );
      methods.setValue("avgLandTaxes", currentIndustryValues?.avgLandTaxes);
      methods.setValue("avgNDFL", currentIndustryValues?.avgNDFL);
      methods.setValue(
        "avgTransportTaxes",
        currentIndustryValues?.avgTransportTaxes
      );
      methods.setValue("avgOtherTaxes", currentIndustryValues?.avgOtherTaxes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndustry?.value]);

  const { trigger, isMutating } = useSWRMutation(
    `/api/industry/${currentIndustry?.value}`,
    sendRequest,
    {
      onSuccess: () => {
        toast.success("Нормативные значения успешно сохранены");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSubmit = async (data: any) => {
    trigger({
      avgWorkers: toNumber(data.avgWorkers),
      avgSalary: toNumber(data.avgSalary),
      avgTaxes: toNumber(data.avgTaxes),
      avgIncomeTaxes: toNumber(data.avgIncomeTaxes),
      avgPropertyTaxes: toNumber(data.avgPropertyTaxes),
      avgLandTaxes: toNumber(data.avgLandTaxes),
      avgNDFL: toNumber(data.avgNDFL),
      avgTransportTaxes: toNumber(data.avgTransportTaxes),
      avgOtherTaxes: toNumber(data.avgOtherTaxes),
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-20 gap-4">
          <ReactSelect
            id="industry"
            options={industriesOptions}
            label="Отрасль производства"
            helperText={"для какой отрасли скорректировать значения"}
            rules={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-20 gap-4">
          <Input
            id="avgWorkers"
            label="Среднесписочная численность персонала"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
          <Input
            id="avgSalary"
            label="Средняя з.п. сотрудников"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
          <Input
            id="avgTaxes"
            label="Среднее значение налогов, уплаченных в бюджет Москвы"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-20 gap-4">
          <Input
            id="avgIncomeTaxes"
            label="Налог на прибыль"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
          <Input
            id="avgPropertyTaxes"
            label="Налог на имущество"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
          <Input
            id="avgLandTaxes"
            label="Налог на землю"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-20 gap-4">
          <Input
            id="avgNDFL"
            label="НДФЛ"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
          <Input
            id="avgTransportTaxes"
            label="Транспортный налог"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
          <Input
            id="avgOtherTaxes"
            label="Прочие налоги"
            type="number"
            validation={{
              min: 0,
              required: "Обязательное поле",
            }}
          />
        </div>
        <div className="pt-4">
          <Button
            className="w-full"
            variant="fill"
            disabled={isMutating || !methods.formState.isValid}
          >
            {isMutating ? (
              <>
                <LoadingIcon /> Загрузка...
              </>
            ) : (
              <p>Сохранить</p>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditNormativesForm;
