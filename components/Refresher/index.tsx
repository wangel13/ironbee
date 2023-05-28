"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Refresher = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return <></>
}