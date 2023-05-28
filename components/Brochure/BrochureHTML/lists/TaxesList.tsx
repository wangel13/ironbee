import React from "react";
import { A4List } from "../components/A4List";
import { FOOTER_TEXT } from "../constants";
import SectionTitle from "../components/SectionTitle";
import Section from "../components/Section";
import SectionDivider from "../components/SectionDivider";
import BigSection from "../components/BigSection";
import { formatCurrencyMillion } from "@/lib/formatCurrencyMillion";
import { formatWholeNumber } from "@/lib/formatWholeNumber";

interface Props {
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

  patentsCount: number;
  patentCostsFrom: number;
  patentCostsTo: number;

  stateDutyCosts: number;
}

export const TaxesList = ({
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
}: Props) => {
  return (
    <A4List
      headerText="ОБЗОР ПРЕДВАРИТЕЛЬНЫХ РАСХОДОВ"
      footerText={FOOTER_TEXT}
    >
      <SectionTitle style={{ paddingBottom: "20px" }}>
        НАЛОГИ И ПАТЕНТЫ
      </SectionTitle>

      <BigSection
        iconLink="/brochure/icons/moscow.png"
        style={{ marginBottom: "20px" }}
      >
        <div style={{ paddingBottom: "10px" }}>
          Для инвесторов, работающих в Москве, существует ряд программ
          государственной поддержки, которые помогают при уплате налогов и
          патентов.
        </div>
        <div style={{ paddingBottom: "10px" }}>
          Если вы нуждаетесь в государственной поддержке при уплате налогов и
          патентов, обратитесь в{" "}
          <a href="https://www.mos.ru/dipp/function/">
            Департамент инвестиционной политики и развития Москвы
          </a>
          .
        </div>
      </BigSection>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="НАЛОГ НА ПРИБЫЛЬ"
        iconLink="/brochure/icons/aLotOfMoney.png"
      >
        {`от ${formatCurrencyMillion(
          incomeTaxesFrom
        )} до ${formatCurrencyMillion(incomeTaxesTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="НАЛОГ НА ИМУЩЕСТВО"
        iconLink="/brochure/icons/difMoney.png"
      >
        {`от ${formatCurrencyMillion(
          propertyTaxesFrom
        )} до ${formatCurrencyMillion(propertyTaxesTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ТРАНСПОРТНЫЙ НАЛОГ"
        iconLink="/brochure/icons/pointMoney.png"
      >
        {`от ${formatCurrencyMillion(
          transportTaxesFrom
        )} до ${formatCurrencyMillion(transportTaxesTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="НАЛОГ НА ЗЕМЛЮ"
        iconLink="/brochure/icons/spendMoney.png"
      >
        {`от ${formatCurrencyMillion(landTaxesFrom)} до ${formatCurrencyMillion(
          landTaxesTo
        )} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ПРОЧИЕ НАЛОГИ"
        iconLink="/brochure/icons/aLotOfMoney.png"
      >
        {`от ${formatCurrencyMillion(
          otherTaxesFrom
        )} до ${formatCurrencyMillion(otherTaxesTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="КОЛИЧЕСТВО ПАТЕНТОВ"
        iconLink="/brochure/icons/gears.png"
      >
        {formatWholeNumber(patentsCount)}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="СТОИМОСТЬ ПАТЕНТОВ"
        iconLink="/brochure/icons/spendMoney.png"
      >
        {`от ${formatCurrencyMillion(
          patentCostsFrom
        )} до ${formatCurrencyMillion(patentCostsTo)} млн. руб.`}
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ГОСПОШЛИНА НА ОФОРМЛЕНИЕ"
        iconLink="/brochure/icons/pointMoney.png"
      >
        {`${formatWholeNumber(stateDutyCosts)} руб.`}
      </Section>
    </A4List>
  );
};
