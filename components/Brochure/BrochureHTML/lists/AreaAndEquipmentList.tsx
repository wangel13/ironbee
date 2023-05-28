import React from "react";
import { A4List } from "../components/A4List";
import { FOOTER_TEXT } from "../constants";
import SectionTitle from "../components/SectionTitle";
import Section from "../components/Section";
import SectionDivider from "../components/SectionDivider";
import BigSection from "../components/BigSection";
import { formatCurrencyMillion } from "../helpers/formatCurrencyMillion";
import { formatWholeNumber } from "../helpers/formatWholeNumber";

interface Props {
  areaSize: number;
  areaCostsWithTaxesFrom: number;
  areaCostsWithTaxesTo: number;
  areaBuildingSize: number;
  areaBuildingCostsWithTaxesFrom: number;
  areaBuildingCostsWithTaxesTo: number;
  equipmentCostsFrom: number;
  equipmentCostsTo: number;
}

export const AreaAndEquipmentList = ({
  areaSize,
  areaCostsWithTaxesFrom,
  areaCostsWithTaxesTo,
  areaBuildingSize,
  areaBuildingCostsWithTaxesFrom,
  areaBuildingCostsWithTaxesTo,
  equipmentCostsFrom,
  equipmentCostsTo,
}: Props) => {
  return (
    <A4List
      headerText="ОБЗОР ПРЕДВАРИТЕЛЬНЫХ РАСХОДОВ"
      footerText={FOOTER_TEXT}
    >
      <SectionTitle style={{ paddingBottom: "20px" }}>
        АРЕНДА, СТРОИТЕЛЬСТВО И ОБОРУДОВАНИЕ
      </SectionTitle>

      <BigSection
        iconLink="/brochure/icons/moscow.png"
        style={{ marginBottom: "20px" }}
      >
        <div style={{ paddingBottom: "10px" }}>
          Москва является одним из крупнейших производственных центров России,
          что делает ее привлекательной площадкой для инвестирования.
        </div>
        <div style={{ paddingBottom: "10px" }}>
          В Москве оказывается государственная поддержка инвесторам для поиска
          места для аренды и строительства, а также закупки необходимого
          оборудования в Москве.
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <a href="https://investmoscow.ru/">
            Портал инвестиционного развития Москвы
          </a>{" "}
          - официальный сайт городской программы поддержки инвесторов, где вы
          найдете информацию о налоговых льготах, о продаже муниципальных
          объектов недвижимости, а также сможете получить консультацию
          специалиста.
        </div>
      </BigSection>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ПЛОЩАДЬ АРЕНДЫ ЗЕМЕЛЬНОГО УЧАСТКА"
        iconLink="/brochure/icons/building.png"
      >
        {`${formatWholeNumber(areaSize)} м2`}
      </Section>

      <Section
        isBigTitle
        title="РАСХОДЫ НА АРЕНДУ ЗЕМЕЛЬНОГО УЧАСТКА"
        iconLink="/brochure/icons/aLotOfMoney.png"
      >
        {`от ${formatCurrencyMillion(
          areaCostsWithTaxesFrom
        )} до ${formatCurrencyMillion(areaCostsWithTaxesTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ПЛОЩАДЬ ОБЪЕКТОВ КАПИТАЛЬНОГО СТРОИТЕЛЬСТВА"
        iconLink="/brochure/icons/tools.png"
      >
        {`${formatWholeNumber(areaBuildingSize)} м2`}
      </Section>

      <Section
        isBigTitle
        title="РАСХОДЫ НА ОБЪЕКТЫ КАПИТАЛЬНОГО СТРОИТЕЛЬСТВА"
        iconLink="/brochure/icons/aLotOfMoney.png"
      >
        {`от ${formatCurrencyMillion(
          areaBuildingCostsWithTaxesFrom
        )} до ${formatCurrencyMillion(areaBuildingCostsWithTaxesTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="РАСХОДЫ НА ПРИОБРЕТЕНИЕ ОБОРУДОВАНИЯ"
        iconLink="/brochure/icons/pointMoney.png"
      >
        {`от ${formatCurrencyMillion(
          equipmentCostsFrom
        )} до ${formatCurrencyMillion(equipmentCostsTo)} млн. руб.`}
      </Section>
    </A4List>
  );
};
