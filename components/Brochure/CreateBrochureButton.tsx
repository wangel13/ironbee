"use client";

import React from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../HookForm/Button";
import { Calculator3000 } from "../Calculator/calculator";
import { useFormContext } from "react-hook-form";
import useGeneratePDFDocument from "./useGeneratePDFDocument";
import LoadingIcon from "../LoadingIcon";
import { get } from "lodash";
import { getFromToValue } from "@/lib/getFromToValue";

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

interface Props {
  calculator: Calculator3000;
}

const CreateBrochureButton = ({ calculator }: Props) => {
  const { watch, formState } = useFormContext();
  const allValues = watch();

  const { generate, isGenerating } = useGeneratePDFDocument();
  const { trigger, isMutating } = useSWRMutation<any>(
    `/api/brochure`,
    sendRequest,
    {
      onSuccess: (data) => {
        const html = data?.data?.html;
        generate(html);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  function handleClick() {
    // Подготовка данных для вставки в PDF

    const industryName = get(allValues, "industry.label", "");
    const legalFormName = get(allValues, "legalForm.label", "");
    const workersCount = get(allValues, "workersCount", 0);
    const areaName = get(allValues, "area.label", "");

    const totalCosts = calculator.calcTotal();
    const [totalCostsFrom, totalCostsTo] = getFromToValue(totalCosts);

    // Персонал
    const workersSalaryCosts = calculator.calcWorkersSalary();
    const [workersSalaryCostsFrom, workersSalaryCostsTo] =
      getFromToValue(workersSalaryCosts);

    const workersMedTaxesCosts = calculator.calcWorkersMedTaxes();
    const [workersMedTaxesCostsFrom, workersMedTaxesCostsTo] =
      getFromToValue(workersMedTaxesCosts);

    const workersPensionTaxesCosts = calculator.calcWorkersPensionTaxes();
    const [workersPensionTaxesFrom, workersPensionTaxesTo] = getFromToValue(
      workersPensionTaxesCosts
    );

    const workersTotalCosts =
      workersSalaryCosts + workersMedTaxesCosts + workersPensionTaxesCosts;
    const [workersTotalCostsFrom, workersTotalCostsTo] =
      getFromToValue(workersTotalCosts);

    // Аренда строительство и оборудование
    const areaSize = get(allValues, "areaSize", "");
    const areaCosts = calculator.calcAreaCost();
    // const areaTaxes = calculator.calcAreaTaxes();
    const areaCostsWithTaxes = areaCosts + 0;
    const [areaCostsWithTaxesFrom, areaCostsWithTaxesTo] =
      getFromToValue(areaCostsWithTaxes);

    const areaBuildingSize = get(allValues, "areaBuildingSize", "");
    const areaBuildingCosts = calculator.calcAreaBuildingCost();
    const areaBuildingTaxes = calculator.calcAreaBuildingTaxes();
    const areaBuildingCostsWithTaxes = areaBuildingCosts + areaBuildingTaxes;
    const [areaBuildingCostsWithTaxesFrom, areaBuildingCostsWithTaxesTo] =
      getFromToValue(areaBuildingCostsWithTaxes);

    const equipmentCosts = calculator.calcEquipment();
    const [equipmentCostsFrom, equipmentCostsTo] =
      getFromToValue(equipmentCosts);

    const totalAreaEquipmentCostFrom =
      areaCostsWithTaxesFrom +
      areaBuildingCostsWithTaxesFrom +
      equipmentCostsFrom;

    const totalAreaEquipmentCostTo =
      areaCostsWithTaxesTo + areaBuildingCostsWithTaxesTo + equipmentCostsTo;

    // Налоги и Патенты
    const transportTaxes = calculator.calcAvgTransportTaxes();
    const [transportTaxesFrom, transportTaxesTo] =
      getFromToValue(transportTaxes);

    const incomeTaxes = calculator.calcAvgIncomeTaxes();
    const [incomeTaxesFrom, incomeTaxesTo] = getFromToValue(incomeTaxes);

    // const landTaxes = calculator.calcAvgLandTaxes();
    // const [landTaxesFrom, landTaxesTo] = getFromToValue(landTaxes);

    const otherTaxes = calculator.calcAvgOtherTaxes();
    const [otherTaxesFrom, otherTaxesTo] = getFromToValue(otherTaxes);

    // const propertyTaxes = calculator.calcAvgPropertyTaxes();
    // const [propertyTaxesFrom, propertyTaxesTo] = getFromToValue(propertyTaxes);

    const totalTaxes = transportTaxes + incomeTaxes + otherTaxes;
    const [totalTaxesFrom, totalTaxesTo] = getFromToValue(totalTaxes);

    const patentsCount = get(allValues, "patents.length", 0);

    const patentCosts = calculator.calcPatents();
    const [patentCostsFrom, patentCostsTo] = getFromToValue(patentCosts);

    const stateDutyCosts = calculator.calcStateDuty();

    const totalTaxesPatentsCostFrom =
      patentCostsFrom + totalTaxesFrom + stateDutyCosts;
    const totalTaxesPatentsCostTo =
      patentCostsTo + totalTaxesTo + stateDutyCosts;

    // Услуги
    const buhCosts = calculator.calcBuhAvgCost();
    const [buhCostsFrom, buhCostsTo] = getFromToValue(buhCosts);

    trigger({
      industryName,
      legalFormName,
      workersCount,
      areaName,
      totalCostsFrom,
      totalCostsTo,

      // Персонал
      workersSalaryCostsFrom,
      workersSalaryCostsTo,
      workersMedTaxesCostsFrom,
      workersMedTaxesCostsTo,
      workersPensionTaxesFrom,
      workersPensionTaxesTo,
      workersTotalCostsFrom,
      workersTotalCostsTo,

      // Аренда Кап. строительство и оборудование
      areaSize,
      areaCostsWithTaxesFrom,
      areaCostsWithTaxesTo,
      areaBuildingSize,
      areaBuildingCostsWithTaxesFrom,
      areaBuildingCostsWithTaxesTo,
      equipmentCostsFrom,
      equipmentCostsTo,
      totalAreaEquipmentCostFrom,
      totalAreaEquipmentCostTo,

      // Налоги и Патенты
      totalTaxesPatentsCostFrom,
      totalTaxesPatentsCostTo,

      transportTaxesFrom,
      transportTaxesTo,
      incomeTaxesFrom,
      incomeTaxesTo,

      otherTaxesFrom,
      otherTaxesTo,

      patentsCount,
      patentCostsFrom,
      patentCostsTo,

      stateDutyCosts,
      // Услуги
      buhCostsFrom,
      buhCostsTo,
    } as any);
  }

  return (
    <Button
      className="w-full"
      variant="fill"
      disabled={isMutating || isGenerating || !formState.isValid}
      type="button"
      onClick={handleClick}
    >
      {isMutating || isGenerating ? (
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          Скачать PDF
        </>
      )}
    </Button>
  );
};

export default CreateBrochureButton;
