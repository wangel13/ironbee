"use client"; // Error components must be Client Components

import { Alert } from "@/components/Alert";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // useEffect(() => {
  // Log the error to an error reporting service
  // console.error(error);
  // }, [error]);

  return (
    <div className="py-8">
      <Alert title="Ошибка" severity="error">
        Такого проекта нет
      </Alert>
    </div>
  );
}
