"use client";

import React from "react";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../HookForm/Button";
import { Calculator3000 } from "../Calculator/calculator";
import { useFormContext } from "react-hook-form";
import useGeneratePDFDocument from "./useGeneratePDFDocument";
import LoadingIcon from "../LoadingIcon";

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

interface Props {
  calculator: Calculator3000;
}

const CreateBrochureButton = ({ calculator }: Props) => {
  const { watch } = useFormContext();
  const allValues = watch();

  const { generate, isGenerating } = useGeneratePDFDocument();
  const { trigger, isMutating } = useSWRMutation<any>(
    `/api/brochure`,
    sendRequest,
    {
      onSuccess: (data) => {
        const html = data?.data?.html;
        generate(html);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  function handleClick() {
    // Подготовка данных для вставки в PDF

    const total = calculator.calcTotal();
    trigger({ total } as any);
  }

  return (
    <Button
      className="w-full"
      variant="fill"
      disabled={isMutating || isGenerating}
      type="button"
      onClick={handleClick}
    >
      {isMutating || isGenerating ? (
        <>
          <LoadingIcon /> Загрузка...
        </>
      ) : (
        <p>Скачать PDF</p>
      )}
    </Button>
  );
};

export default CreateBrochureButton;
