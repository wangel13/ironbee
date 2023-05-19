"use client";

import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Email, Password } from "./fieldInputs";

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
        toast.error(error);
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
        <Email />
        <Password />

        <button
          disabled={isMutating}
          className={`${
            isMutating
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {isMutating ? <LoadingDots color="#808080" /> : <p>Sign Up</p>}
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{" "}
          instead.
        </p>
      </form>
    </FormProvider>
  );
}
