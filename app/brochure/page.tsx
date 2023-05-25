import Brochure from "@/components/Brochure/Brochure";
import { ReactElement } from "react";

const getData = async (Component: any) => {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(<Component />);
  return staticMarkup;
};

const BrochureHtml = () => {
  return (
    <>
      <TitleList />
      <IntroList />
      <OverallList />
    </>
  );
};

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
        <div style={{ padding: "20px" }}>
          <span style={{ fontSize: "32px" }}>ПРИВЕТСТВЕННОЕ СЛОВО</span>
          <span style={{ fontSize: "16px" }}>
            Спасибо, что воспользовались электронным сервисом «Инвестиционный
            калькулятор города Москвы»! Мы надеемся, что предоставленная
            возможность предварительного расчета расходов на содержание
            персонала организации, размещение промышленных объектов на
            территории города Москвы, а также необходимые регистрационные и
            прочие услуги была полезна для Вас. Сегодня Москва является ведущим
            промышленным регионом России, где работает более 3 500
            производственных предприятий, продукция которых экспортируется в 186
            стран мира. Правительство Москвы предоставляет более 150 мер
            государственной поддержки промышленным организациям, с которыми
            можно подробно ознакомиться и подать соответствующую заявку в
            специализированном разделе Инвестиционного портала города Москвы. Вы
            также можете получить льготные условия для ведения промышленной
            деятельности, получив статус резидента особой экономической зоны
            «Технополис Москва». Мы убеждены, что вместе с Вами сможем открыть
            новые горизонты современной отечественной промышленности!
          </span>
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

export default async function BrochurePage() {
  const html = await getData(BrochureHtml);

  return (
    <>
      <Brochure html={html} />
    </>
  );
}
