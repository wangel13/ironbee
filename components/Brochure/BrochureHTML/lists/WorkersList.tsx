import React from "react";
import { A4List } from "../components/A4List";
import { FOOTER_TEXT } from "../constants";
import SectionTitle from "../components/SectionTitle";
import Section from "../components/Section";
import SectionDivider from "../components/SectionDivider";
import BigSection from "../components/BigSection";

export const WorkersList = () => {
  return (
    <A4List
      headerText="ОБЗОР ПРЕДВАРИТЕЛЬНЫХ РАСХОДОВ"
      footerText={FOOTER_TEXT}
    >
      <SectionTitle style={{ paddingBottom: "20px" }}>
        ПЕРСОНАЛ ОРГАНИЗАЦИИ
      </SectionTitle>

      <BigSection
        iconLink="/brochure/icons/gears.png"
        style={{ marginBottom: "20px" }}
      >
        <div style={{ paddingBottom: "10px" }}>
          Москва является лидирующим регионом Российской Федерации с наибольшим
          количеством экономически активного населения. Уровень безработицы в
          столице – один из самых низких по стране и составляет менее 1%.
          Специалисты многих направлений заняты в самых разных областях
          деятельности: автомобилестроение, пищевая промышленность,
          приборостроение, станкоинструментальная промышленность, легкая
          промышленность и другие.
        </div>
        <div>
          Правительство Москвы способствует развитию новых специальностей и
          компетенций. Благодаря проекту{" "}
          <a href="http://moscowtechschool.ru/">
            «Московская техническая школа»
          </a>{" "}
          Вы можете подать заявку на обучение своих сотрудников необходимым
          профессиональным навыкам.
        </div>
      </BigSection>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ИТОГО ВОЗМОЖНЫХ РАСХОДОВ НА СОДЕРЖАНИЕ ПЕРСОНАЛА ОРГАНИЗАЦИИ"
        iconLink="/brochure/icons/gears.png"
      >
        от…до…, в млн. руб.
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="ПЛАНИРУЕМАЯ ЧИСЛЕННОСТЬ ПЕРСОНАЛА"
        iconLink="/brochure/icons/gears.png"
      >
        человек
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="СТРАХОВЫЕ ВЗНОСЫ (ПЕНСИОННОЕ СТРАХОВАНИЕ)"
        iconLink="/brochure/icons/gears.png"
      >
        «от…до…, в млн.руб.»
      </Section>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />

      <Section
        isBigTitle
        title="СТРАХОВЫЕ ВЗНОСЫ (МЕДИЦИНСКОЕ СТРАХОВАНИЕ)"
        iconLink="/brochure/icons/gears.png"
      >
        «от…до…, в млн.руб.»
      </Section>
    </A4List>
  );
};
