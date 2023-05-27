import React from "react";
import { A4List } from "../components/A4List";
import SectionTitle from "../components/SectionTitle";
import SectionDivider from "../components/SectionDivider";
import BigSection from "../components/BigSection";

interface Props {}

export const ResourcesList = ({}: Props) => {
  return (
    <A4List>
      <SectionTitle style={{ paddingBottom: "20px" }}>
        РЕСУРСЫ ПО ОКАЗАНИЮ АДРЕСНОЙ ПОДДЕРЖКИ
      </SectionTitle>

      <BigSection
        iconLink="/brochure/icons/gears.png"
        style={{ marginBottom: "20px" }}
      >
        <div style={{ paddingBottom: "10px" }}>
          Ссылки на ресурсы по оказанию государственной поддержки промышленным
          организациям в городе Москве:
        </div>

        <div style={{ paddingBottom: "10px" }}>
          <a href="https://www.mos.ru/city/projects/moshelp/#">
            Официальный сайт мэрии Москвы
          </a>{" "}
          - информация о государственной поддержке предпринимательства.
        </div>

        <div style={{ paddingBottom: "10px" }}>
          <a href="https://www.fondms.ru/">Фонд малых предприятий Москвы</a> -
          информация о возможности получения кредитов и субсидий.
        </div>

        <div style={{ paddingBottom: "10px" }}>
          <a href="https://investmoscow.ru/">InvestMoscow</a> - об инвестициях и
          инновациях с информацией о программах поддержки предпринимательства.
        </div>

        <div style={{ paddingBottom: "10px" }}>
          <a href="https://prommoscow.info/">PromMoscow</a> - всё о московской
          промышленности для инвесторов.
        </div>
      </BigSection>

      <SectionDivider style={{ marginBottom: "10px", marginTop: "10px" }} />
    </A4List>
  );
};
