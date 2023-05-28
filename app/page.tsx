import { Button } from "@/components/HookForm/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen grid items-center justify-items-center">
      <div className="grid items-center justify-items-center">
        <h1 className="h1 text-center w-1/2 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600">Калькулятор возможных затрат на создание промышленного производства в г. Москва </h1>
        <Link href="/projects/calculator">
          <Button>Начать работу</Button>
        </Link>
      </div>
    </div>
  );
}
