import React from "react";
import { IntroList, OverallList, TitleList, WorkersList } from "./lists";
import { get } from "lodash";

interface Props {
  data: any;
}
const BrochureHTML = ({ data }: Props) => {
  const total = get(data, "total", 0);

  return (
    <>
      <TitleList />
      <IntroList />
      <OverallList />
      <WorkersList />
    </>
  );
};

export default BrochureHTML;
