"use client";

import LoadingIcon from "@/components/LoadingIcon";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/HookForm/Input";
import { Button } from "@/components/HookForm/Button";

type Inputs = {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  patronymic: string;
  organizationName: string;
  organizationInn: string;
  organizationIndustry: string; // из предоставленного справочника
  country: string; // имеет смысл подгрузить справочник
  city: string; // имеет смысл подгрузить справочник
  position: string;
};

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

export default function RegisterForm() {
  const router = useRouter();

  const methods = useForm<Inputs>();

  const { trigger, isMutating } = useSWRMutation(
    "/api/auth/register/",
    sendRequest,
    {
      onSuccess: () => {
        toast.success("Account created! Redirecting to login...");
        router.push("/login");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => trigger(data);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        <Input
          id="email"
          label="Email*"
          type="email"
          validation={{
            required: "Обязательное поле",
            pattern: {
              value: /\S+@\S+.\S+/,
              message: "Некорректный email",
            },
          }}
        />
        <Input
          id="password"
          type="password"
          label="Пароль*"
          validation={{ required: "Обязательное поле" }}
        />
        <Input
          id="firstName"
          label="Имя"
          validation={{ required: "Обязательное поле" }}
        />
        <Input id="patronymic" label="Отчество" />
        <Input
          id="secondName"
          label="Фамилия"
          validation={{ required: "Обязательное поле" }}
        />
        <Input id="organizationName" label="Название организации" />
        <Input
          id="organizationInn"
          label="ИНН"
          validation={{ required: "Обязательное поле" }}
        />
        {/* <Input id="organizationIndustry" label="Отрасль"/> */}
        {/* <Input id="country" label="Страна"/> */}
        {/* <Input id="city" label="Город"/> */}
        <Input id="position" label="Должность" />

        <div className="pt-4">
          <Button className="w-full" variant="fill" disabled={isMutating}>
            {isMutating ? (
              <>
                <LoadingIcon /> Загрузка
              </>
            ) : (
              <p>Зарегистрироваться</p>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-semibold text-gray-800 underline">
            Войти
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
