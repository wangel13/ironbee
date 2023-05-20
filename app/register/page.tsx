import Image from "next/image";
import Form from "@/components/form";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm/register-form";

export default function Login() {
  return (
    <div className="flex py-8 items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-md">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </Link>
          <h3 className="text-xl font-semibold">Регистрация</h3>
          <p className="text-sm text-gray-500">
            Создайте аккаунт для доступа к специальным возможностям
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
