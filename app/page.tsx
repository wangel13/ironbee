import { Button } from "@/components/HookForm/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full grid items-center justify-items-center">
      <div className="grid items-center justify-items-center">
        <h1 className="h1 mb-8">Калькулятор инвест-проекта</h1>
        <Link href="/projects/calculator">
          <Button>Начать работу</Button>
        </Link>
      </div>
    </div>
  );
}
