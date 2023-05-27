"use client";

import React, { useState } from "react";
import BrochureClientLink from "./BrochureClientLink";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../HookForm/Button";
import { Calculator3000 } from "../Calculator/calculator";
import { useFormContext } from "react-hook-form";

async function sendRequest(url: string, { arg }: { arg: unknown }) {
  return axios.post(url, arg);
}

interface Props {
  calculator: Calculator3000;
}

const CreateBrochureButton = ({ calculator }: Props) => {
  const { watch } = useFormContext();

  const allValues = watch();

  const { trigger, isMutating, data } = useSWRMutation<any>(
    `/api/brochure`,
    sendRequest,
    {
      onSuccess: () => {},
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    }
  );

  function handleClick() {
    const total = calculator.calcTotal();
    trigger({ total } as any);
  }

  const html = data?.data?.html;

  return (
    <>
      {!html && (
        <Button onClick={handleClick} type="button">
          Подготовить PDF
        </Button>
      )}
      {html && <BrochureClientLink html={html} />}
    </>
  );
};

export default CreateBrochureButton;
