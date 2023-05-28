import React from "react";
import { A4List } from "../components/A4List";
import { FOOTER_TEXT } from "../constants";
import SectionTitle from "../components/SectionTitle";
import Section from "../components/Section";
import SectionDivider from "../components/SectionDivider";
import { formatCurrencyMillion } from "@/lib/formatCurrencyMillion";
import { formatWholeNumber } from "@/lib/formatWholeNumber";

interface Props {
  industryName: string;
  legalFormName: string;
  workersCount: number;
  areaName: string;
  totalCostsFrom: number;
  totalCostsTo: number;

  workersTotalCostsFrom: number;
  workersTotalCostsTo: number;

  totalAreaEquipmentCostFrom: number;
  totalAreaEquipmentCostTo: number;

  totalTaxesPatentsCostFrom: number;
  totalTaxesPatentsCostTo: number;

  buhCostsFrom: number;
  buhCostsTo: number;
}

export const OverallList = ({
  industryName,
  legalFormName,
  workersCount,
  areaName,
  totalCostsFrom,
  totalCostsTo,

  workersTotalCostsFrom,
  workersTotalCostsTo,

  totalAreaEquipmentCostFrom,
  totalAreaEquipmentCostTo,

  totalTaxesPatentsCostFrom,
  totalTaxesPatentsCostTo,

  buhCostsFrom,
  buhCostsTo,
}: Props) => {
  return (
    <A4List
      headerText="ОБЗОР ПРЕДВАРИТЕЛЬНЫХ РАСХОДОВ"
      footerText={FOOTER_TEXT}
    >
      <SectionTitle style={{ paddingBottom: "20px" }}>
        ИНФОРМАЦИЯ О ВАШЕЙ ОРГАНИЗАЦИИ
      </SectionTitle>
      <Section title="ОТРАСЛЬ" iconLink="/brochure/icons/gears.png">
        {industryName}
      </Section>
      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Section title="ТИП ОРГАНИЗАЦИИ" iconLink="/brochure/icons/worker.png">
        {legalFormName}
      </Section>
      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Section
        title="КОЛИЧЕСТВО СОТРУДНИКОВ"
        iconLink="/brochure/icons/3workers.png"
      >
        {formatWholeNumber(workersCount)}
      </Section>
      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Section
        title="РАЙОН РАСПОЛОЖЕНИЯ ПРОИЗВОДСТВА"
        iconLink="/brochure/icons/map.png"
        style={{ paddingBottom: "20px" }}
      >
        {areaName}
      </Section>
      <SectionTitle style={{ paddingBottom: "20px" }}>
        ИТОГОВЫЕ ЗНАЧЕНИЯ ВОЗМОЖНЫХ ЗАТРАТ
      </SectionTitle>
      <Section
        title="ИТОГО ВОЗМОЖНЫХ РАСХОДОВ"
        iconLink="/brochure/icons/aLotOfMoney.png"
        style={{ paddingBottom: "20px" }}
      >
        {`от ${formatCurrencyMillion(
          totalCostsFrom
        )} до ${formatCurrencyMillion(totalCostsTo)} млн. руб.`}
      </Section>

      <SectionTitle style={{ paddingBottom: "20px" }}>
        ДЕТАЛИ РАСХОДОВ
      </SectionTitle>

      <Section title="ПЕРСОНАЛ" iconLink="/brochure/icons/5workers.png">
        {`от ${formatCurrencyMillion(
          workersTotalCostsFrom
        )} до ${formatCurrencyMillion(workersTotalCostsTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Section
        title="АРЕНДА, СТРОИТЕЛЬСТВО И ОБОРУДОВАНИЕ"
        iconLink="/brochure/icons/building.png"
      >
        {`от ${formatCurrencyMillion(
          totalAreaEquipmentCostFrom
        )} до ${formatCurrencyMillion(totalAreaEquipmentCostTo)} млн. руб.`}
      </Section>
      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Section
        title="НАЛОГИ И ПАТЕНТЫ"
        iconLink="/brochure/icons/spendMoney.png"
      >
        {`от ${formatCurrencyMillion(
          totalTaxesPatentsCostFrom
        )} до ${formatCurrencyMillion(totalTaxesPatentsCostTo)} млн. руб.`}
      </Section>
      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Section title="УСЛУГИ" iconLink="/brochure/icons/tools.png">
        {`от ${formatCurrencyMillion(buhCostsFrom)} до ${formatCurrencyMillion(
          buhCostsTo
        )} млн. руб.`}
      </Section>
    </A4List>
  );
};
