import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactElement } from "react";
import cx from "classnames";

type AccordionItem = {
  header: string;
  count?: string;
  content: string | ReactElement | ReactElement[];
};
type Props = {
  items: AccordionItem[];
  defaultValue?: number;
};

export const Accordion = ({ items }: Props) => {
  return (
    <AccordionPrimitive.Root type="multiple" className={cx("space-y-4")}>
      {items.map(({ header, count, content, ...rest }, i) => (
        <AccordionPrimitive.Item
          key={`header-${i}`}
          value={`item-${i + 1}`}
          {...rest}
        >
          <AccordionPrimitive.Header className="w-full">
            <AccordionPrimitive.Trigger
              className={cx(
                "group",
                // 'focus:outline-none',
                "w-full"
              )}
            >
              <div className="inline-flex w-full items-center justify-between py-2 text-left">
                <div className="flex flex-1">
                  <span className="flex-1 font-bold text-xl text-slate-900">
                    {header}
                  </span>
                  {count && (
                    <span className="text-xl text-slate-700">{count}</span>
                  )}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={cx(
                    "ml-2 w-6 h-6 shrink-0 text-red-500 ease-in-out",
                    "group-radix-state-open:rotate-180 group-radix-state-open:duration-300 group-radix-state-closed:rotate-360 group-radix-state-closed:duration-300"
                  )}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div
                className={cx(
                  "h-2px mt-2 border-red-500 border rounded-full",
                  "group-radix-state-open:border-red-500 group-radix-state-open:duration-300 group-radix-state-closed:border-red-100 group-radix-state-closed:duration-300"
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className={cx("mt-6 w-full")}>
            {content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};
