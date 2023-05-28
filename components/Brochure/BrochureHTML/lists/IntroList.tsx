import { A4List } from "../components/A4List";

export const IntroList = () => {
  return (
    <A4List>
      <>
        <div
          style={{
            fontSize: "24px",
            marginTop: "40px",
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#b91827",
          }}
        >
          ПРИВЕТСТВЕННОЕ СЛОВО
        </div>
        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "justify",
          }}
        >
          Спасибо, что воспользовались электронным сервисом{" "}
          <span style={{ fontWeight: "bold" }}>
            «Инвестиционный калькулятор города Москвы»
          </span>
          !
        </div>
        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "justify",
          }}
        >
          Мы надеемся, что предоставленная возможность предварительного расчета
          расходов на содержание персонала организации, размещение промышленных
          объектов на территории города Москвы, а также необходимые
          регистрационные и прочие услуги была полезна для Вас.
        </div>
        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "justify",
          }}
        >
          Сегодня Москва является ведущим промышленным регионом России, где
          работает более 3 500 производственных предприятий, продукция которых
          экспортируется в 186 стран мира. Правительство Москвы предоставляет
          более 150 мер государственной поддержки промышленным организациям, с
          которыми можно подробно ознакомиться и подать соответствующую заявку в{" "}
          <a href="https://investmoscow.ru/online-services/navigator-support-measures">
            специализированном разделе
          </a>{" "}
          Инвестиционного портала города Москвы.
        </div>
        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "justify",
          }}
        >
          Вы также можете получить льготные условия для ведения промышленной
          деятельности, получив статус резидента особой экономической зоны{" "}
          <a href="https://technomoscow.ru/#">«Технополис Москва»</a>.
        </div>
        <div
          style={{
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "justify",
          }}
        >
          Мы убеждены, что вместе с Вами сможем открыть новые горизонты
          современной отечественной промышленности!
        </div>
      </>
    </A4List>
  );
};
