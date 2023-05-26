import React from "react";
import { A4List } from "../components/A4List";
import { FOOTER_TEXT } from "../constants";
import SectionTitle from "../components/SectionTitle";
import Section from "../components/Section";
import SectionDivider from "../components/SectionDivider";

export const OverallList = () => {
  return (
    <A4List
      headerText="ОБЗОР ПРЕДВАРИТЕЛЬНЫХ РАСХОДОВ"
      footerText={FOOTER_TEXT}
    >
      <SectionTitle style={{ paddingBottom: "20px" }}>
        ИНФОРМАЦИЯ О ВАШЕЙ ОРГАНИЗАЦИИ
      </SectionTitle>

      <Section title="ОТРАСЛЬ" iconLink="./brochure/icons/gears.png">
        подтягивается выбранная пользователем на электр.сервисе отрасль
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section title="ТИП ОРГАНИЗАЦИИ" iconLink="./brochure/icons/gears.png">
        (подтягивается выбранная пользователем на электр.сервисе характеристика
        (индивидуальный предприниматель или ООО))
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        title="КОЛИЧЕСТВО СОТРУДНИКОВ"
        iconLink="./brochure/icons/gears.png"
      >
        (подтягивается установленная пользователем на электр.сервисе численность
        персонала)
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        title="РАЙОН РАСПОЛОЖЕНИЯ ПРОИЗВОДСТВА"
        iconLink="./brochure/icons/gears.png"
        style={{ paddingBottom: "20px" }}
      >
        (подтягивается выбранный пользователем на электр.сервисе район или
        адм.округ)
      </Section>

      <SectionTitle style={{ paddingBottom: "20px" }}>
        ИТОГОВЫЕ ЗНАЧЕНИЯ ВОЗМОЖНЫХ ЗАТРАТ
      </SectionTitle>

      <Section
        title="ИТОГО ВОЗМОЖНЫХ РАСХОДОВ"
        iconLink="./brochure/icons/gears.png"
        style={{ paddingBottom: "20px" }}
      >
        от…до…, в млн. руб.
      </Section>

      <SectionTitle style={{ paddingBottom: "20px" }}>
        ДЕТАЛИ РАСХОДОВ
      </SectionTitle>

      <Section title="ПЕРСОНАЛ" iconLink="./brochure/icons/gears.png">
        ...
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        title="АРЕНДА ОБЪЕКТОВ НЕДВИЖИМОСТИ"
        iconLink="./brochure/icons/gears.png"
      >
        ...
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section title="НАЛОГИ" iconLink="./brochure/icons/gears.png">
        ...
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section title="УСЛУГИ" iconLink="./brochure/icons/gears.png">
        ...
      </Section>
    </A4List>
  );
};
