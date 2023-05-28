import React from "react";
import { IntroList, OverallList, TitleList, WorkersList } from "./lists";
import { ServicesList } from "./lists/ServicesList";
import { TaxesList } from "./lists/TaxesList";
import { AreaAndEquipmentList } from "./lists/AreaAndEquipmentList";
import { FinalWordsList } from "./lists/FinalWordsList";
import { ResourcesList } from "./lists/ResourcesList";

interface Props {
  data: {
    industryName: string;
    legalFormName: string;
    workersCount: number;
    areaName: string;
    totalCostsFrom: number;
    totalCostsTo: number;

    workersSalaryCostsFrom: number;
    workersSalaryCostsTo: number;
    workersMedTaxesCostsFrom: number;
    workersMedTaxesCostsTo: number;
    workersPensionTaxesFrom: number;
    workersPensionTaxesTo: number;
    workersTotalCostsFrom: number;
    workersTotalCostsTo: number;

    areaSize: number;
    areaCostsWithTaxesFrom: number;
    areaCostsWithTaxesTo: number;
    areaBuildingSize: number;
    areaBuildingCostsWithTaxesFrom: number;
    areaBuildingCostsWithTaxesTo: number;
    equipmentCostsFrom: number;
    equipmentCostsTo: number;
    totalAreaEquipmentCostFrom: number;
    totalAreaEquipmentCostTo: number;

    totalTaxesPatentsCostFrom: number;
    totalTaxesPatentsCostTo: number;

    transportTaxesFrom: number;
    transportTaxesTo: number;
    incomeTaxesFrom: number;
    incomeTaxesTo: number;
    landTaxesFrom: number;
    landTaxesTo: number;
    otherTaxesFrom: number;
    otherTaxesTo: number;
    propertyTaxesFrom: number;
    propertyTaxesTo: number;

    stateDutyCosts: number;

    patentsCount: number;
    patentCostsFrom: number;
    patentCostsTo: number;

    buhCostsFrom: number;
    buhCostsTo: number;
  };
}
const BrochureHTML = ({ data }: Props) => {
  const {
    industryName,
    legalFormName,
    workersCount,
    areaName,
    totalCostsFrom,
    totalCostsTo,

    // workersSalaryCostsFrom,
    // workersSalaryCostsTo,
    workersMedTaxesCostsFrom,
    workersMedTaxesCostsTo,
    workersPensionTaxesFrom,
    workersPensionTaxesTo,
    workersTotalCostsFrom,
    workersTotalCostsTo,

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

    totalTaxesPatentsCostFrom,
    totalTaxesPatentsCostTo,

    transportTaxesFrom,
    transportTaxesTo,
    incomeTaxesFrom,
    incomeTaxesTo,
    landTaxesFrom,
    landTaxesTo,
    otherTaxesFrom,
    otherTaxesTo,
    propertyTaxesFrom,
    propertyTaxesTo,

    patentsCount,
    patentCostsFrom,
    patentCostsTo,

    stateDutyCosts,

    buhCostsFrom,
    buhCostsTo,
  } = data || {};

  return (
    <>
      <TitleList />
      <IntroList />
      <OverallList
        industryName={industryName}
        legalFormName={legalFormName}
        workersCount={workersCount}
        areaName={areaName}
        totalCostsFrom={totalCostsFrom}
        totalCostsTo={totalCostsTo}
        workersTotalCostsFrom={workersTotalCostsFrom}
        workersTotalCostsTo={workersTotalCostsTo}
        buhCostsFrom={buhCostsFrom}
        buhCostsTo={buhCostsTo}
        totalTaxesPatentsCostFrom={totalTaxesPatentsCostFrom}
        totalTaxesPatentsCostTo={totalTaxesPatentsCostTo}
        totalAreaEquipmentCostFrom={totalAreaEquipmentCostFrom}
        totalAreaEquipmentCostTo={totalAreaEquipmentCostTo}
      />
      <WorkersList
        workersCount={workersCount}
        workersMedTaxesCostsFrom={workersMedTaxesCostsFrom}
        workersMedTaxesCostsTo={workersMedTaxesCostsTo}
        workersPensionTaxesFrom={workersPensionTaxesFrom}
        workersPensionTaxesTo={workersPensionTaxesTo}
        workersTotalCostsFrom={workersTotalCostsFrom}
        workersTotalCostsTo={workersTotalCostsTo}
      />
      <AreaAndEquipmentList
        areaSize={areaSize}
        areaCostsWithTaxesFrom={areaCostsWithTaxesFrom}
        areaCostsWithTaxesTo={areaCostsWithTaxesTo}
        areaBuildingSize={areaBuildingSize}
        areaBuildingCostsWithTaxesFrom={areaBuildingCostsWithTaxesFrom}
        areaBuildingCostsWithTaxesTo={areaBuildingCostsWithTaxesTo}
        equipmentCostsFrom={equipmentCostsFrom}
        equipmentCostsTo={equipmentCostsTo}
      />
      <TaxesList
        transportTaxesFrom={transportTaxesFrom}
        transportTaxesTo={transportTaxesTo}
        incomeTaxesFrom={incomeTaxesFrom}
        incomeTaxesTo={incomeTaxesTo}
        landTaxesFrom={landTaxesFrom}
        landTaxesTo={landTaxesTo}
        otherTaxesFrom={otherTaxesFrom}
        otherTaxesTo={otherTaxesTo}
        propertyTaxesFrom={propertyTaxesFrom}
        propertyTaxesTo={propertyTaxesTo}
        patentsCount={patentsCount}
        patentCostsFrom={patentCostsFrom}
        patentCostsTo={patentCostsTo}
        stateDutyCosts={stateDutyCosts}
      />
      <ServicesList buhCostsFrom={buhCostsFrom} buhCostsTo={buhCostsTo} />
      <ResourcesList />
      <FinalWordsList />
    </>
  );
};

export default BrochureHTML;
