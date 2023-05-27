import React from "react";
import { A4List } from "../components/A4List";
import { FOOTER_TEXT } from "../constants";
import SectionTitle from "../components/SectionTitle";
import Section from "../components/Section";
import SectionDivider from "../components/SectionDivider";
import BigSection from "../components/BigSection";
import { formatCurrencyMillion } from "../helpers/formatCurrencyMillion";

interface Props {
  buhCostsFrom: number;
  buhCostsTo: number;
}

export const ServicesList = ({ buhCostsFrom, buhCostsTo }: Props) => {
  return (
    <A4List
      headerText="ОБЗОР ПРЕДВАРИТЕЛЬНЫХ РАСХОДОВ"
      footerText={FOOTER_TEXT}
    >
      <SectionTitle style={{ paddingBottom: "20px" }}>УСЛУГИ</SectionTitle>

      <BigSection
        iconLink="/brochure/icons/gears.png"
        style={{ marginBottom: "20px" }}
      >
        <div style={{ paddingBottom: "10px" }}>
          Среди услуг для инвесторов в Москве при открытии предприятия можно
          выделить комплексную поддержку со стороны городских властей.
        </div>
        <div style={{ paddingBottom: "10px" }}>
          В рамках этой поддержки предприниматели могут получить необходимую
          информацию и консультации по вопросам регистрации бизнеса, выбору
          оптимальной формы собственности, налогообложению и другим вопросам.
        </div>
      </BigSection>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ИТОГО ВОЗМОЖНЫХ РАСХОДОВ НА БУХГАЛТЕРСКИЕ УСЛУГИ"
        iconLink="/brochure/icons/gears.png"
      >
        {`от ${formatCurrencyMillion(buhCostsFrom)} до ${formatCurrencyMillion(
          buhCostsTo
        )} млн. руб.`}
      </Section>
    </A4List>
  );
};
