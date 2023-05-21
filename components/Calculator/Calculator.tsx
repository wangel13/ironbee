"use client";

import axios from "axios";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { Button } from "../HookForm/Button";

type Inputs = {};

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

interface CalculatorProps {
  equipments: any;
  industries: any;
  areas: any;
  patents: any;
  legalForms: any;
}

const Calculator = ({
  equipments,
  industries,
  areas,
  patents,
  legalForms,
}: CalculatorProps) => {
  const { trigger, isMutating } = useSWRMutation("/api/project", sendRequest, {
    onSuccess: () => {
      toast.success("Проект успешно создан");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm<Inputs>();

  // const onSubmit: SubmitHandler<Inputs> = (data) => trigger(data);
  const onSubmit: SubmitHandler<Inputs> = () =>
    trigger({
      authorId: 1,
      minCost: 1,
      maxCost: 1,
      workers: 1,
      areaBuildingSize: 1,
      usn: true,
      costAreaBuildingSize: 1,
      areaRentalSize: 1,
      legalFormId: 1,
      areaId: 1,
      industryId: 102,
    });
  return (
    <Button onClick={onSubmit}>Test</Button>
    // <FormProvider {...methods}>
    //   <form
    //     onSubmit={methods.handleSubmit(onSubmit)}
    //     className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    //   >
    //     <Input
    //       id="email"
    //       label="Email*"
    //       type="email"
    //       validation={{
    //         required: "Обязательное поле",
    //         pattern: {
    //           value: /\S+@\S+.\S+/,
    //           message: "Некорректный email",
    //         },
    //       }}
    //     />
    //     <Input
    //       id="password"
    //       type="password"
    //       label="Пароль*"
    //       validation={{ required: "Обязательное поле" }}
    //     />
    //     <Input
    //       id="firstName"
    //       label="Имя"
    //       validation={{ required: "Обязательное поле" }}
    //     />
    //     <Input id="patronymic" label="Отчество" />
    //     <Input
    //       id="secondName"
    //       label="Фамилия"
    //       validation={{ required: "Обязательное поле" }}
    //     />
    //     <Input id="organizationName" label="Название организации" />
    //     <Input
    //       id="organizationInn"
    //       label="ИНН"
    //       validation={{ required: "Обязательное поле" }}
    //     />
    //     {/* <Input id="organizationIndustry" label="Отрасль"/> */}
    //     {/* <Input id="country" label="Страна"/> */}
    //     {/* <Input id="city" label="Город"/> */}
    //     <Input id="position" label="Должность" />

    //     <div className="pt-4">
    //       <Button className="w-full" variant="fill" disabled={isMutating}>
    //         {isMutating ? (
    //           <>
    //             <LoadingIcon /> Загрузка
    //           </>
    //         ) : (
    //           <p>Зарегистрироваться</p>
    //         )}
    //       </Button>
    //     </div>

    //     <p className="text-center text-sm text-gray-600">
    //       Уже есть аккаунт?{" "}
    //       <Link href="/login" className="font-semibold text-gray-800 underline">
    //         Войти
    //       </Link>
    //     </p>
    //   </form>
    // </FormProvider>
  );
};

export default Calculator;
