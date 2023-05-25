import React, { ReactElement } from "react";

const A4List = ({ children }: { children: ReactElement }) => {
  return (
    <div
      style={{
        background: "white",
        width: "21cm",
        height: "29.7cm",
        display: "block",
        boxSizing: "border-box",
      }}
    >
      <img
        src="./brochureLayout.png"
        alt=""
        style={{
          position: "absolute",
          minWidth: "100%",
          minHeight: "100%",
          display: "block",
          height: "100%",
          width: "100%",
        }}
      />
      <div>{children}</div>
    </div>
  );
};

const TitleList = () => {
  return (
    <A4List>
      <div
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          style={{ padding: "20px", paddingTop: "80px", paddingBottom: "80px" }}
        >
          <span style={{ fontSize: "32px" }}>ОТЧЕТ</span>
          <br></br>
          <span style={{ fontSize: "20px" }}>
            О ВОЗМОЖНЫХ ЗАТРАТАХ НА ЗАПУСК ПРОМЫШЛЕННОГО ПРОИЗВОДСТВА В ГОРОДЕ
            МОСКВЕ
          </span>
        </div>
        <img
          src="./doing.png"
          alt=""
          style={{
            minWidth: "100%",
            display: "block",
            width: "100%",
          }}
        />
      </div>
    </A4List>
  );
};

const IntroList = () => {
  return (
    <A4List>
      <div
        style={{
          background: "white",
          height: "100%",
          margin: "40px",
          marginTop: "60px",
          marginBottom: "60px",
        }}
      >
        <div style={{ padding: "20px", fontSize: "32px" }}>
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
            Мы надеемся, что предоставленная возможность предварительного
            расчета расходов на содержание персонала организации, размещение
            промышленных объектов на территории города Москвы, а также
            необходимые регистрационные и прочие услуги была полезна для Вас.
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
            которыми можно подробно ознакомиться и подать соответствующую заявку
            в{" "}
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
            деятельности, получив статус резидента особой экономической зоны
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
        </div>
      </div>
    </A4List>
  );
};

const OverallList = () => {
  return (
    <A4List>
      <div
        style={{
          background: "white",
          height: "100%",
          margin: "40px",
          marginTop: "60px",
          marginBottom: "60px",
        }}
      >
        123
        <div
          style={{
            backgroundColor: "red",
            height: "2px",
            width: "80%",
            border: "none",
          }}
        />
        <a href="https://www.google.com/">link text</a>
      </div>
    </A4List>
  );
};

const BrochureHTML = () => {
  return (
    <>
      <TitleList />
      <IntroList />
      <OverallList />
    </>
  );
};

export default BrochureHTML;
