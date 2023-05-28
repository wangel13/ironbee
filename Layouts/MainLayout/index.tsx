import Navigation from "@/components/Navigation";
import Link from "next/link";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="text-gray-600 body-font main-header bg-white shadow">
        <div className="container mx-4 lg:mx-auto flex flex-wrap py-5 flex-col md:flex-row lg:items-center">
          <Link
            href="/"
            className="self-center flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
            <span className="ml-3 hidden xl:inline-flex text-xl">Инвестиционные проекты</span>
          </Link>
          <Suspense fallback="Загрузка...">
            {/* @ts-expect-error Async Server Component */}
            <Navigation />
          </Suspense>
        </div>
      </header>
      <div className="container mx-auto">{children}</div>
    </>
  );
}
