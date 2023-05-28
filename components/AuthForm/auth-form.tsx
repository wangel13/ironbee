"use client";

import LoadingIcon from "@/components/LoadingIcon";
import toast from "react-hot-toast";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/HookForm/Input";
import { Button } from "@/components/HookForm/Button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    signIn("credentials", {
      email: data.email,
      redirect: false,
      password: data.password,
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        toast.error(error);
      } else {
        router.refresh();
        router.push("/projects/my");
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        <Input
          id="email"
          label="Email"
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
          label="Пароль"
          validation={{ required: "Обязательное поле" }}
        />
        <div className="pt-4">
          <Button className="w-full" variant="fill" disabled={loading}>
            {loading ? (
              <>
                <LoadingIcon /> Загрузка...
              </>
            ) : (
              <p>Войти</p>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Еще нет аккаунта?{" "}
          <Link
            href="/register"
            className="font-semibold text-gray-800 underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
