import * as Label from "@radix-ui/react-label";
import cx from "classnames";
import {
  Controller,
  useFormContext,
  UseControllerProps,
} from "react-hook-form";
import get from "lodash/get";
import RSelect, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  GroupBase,
} from "react-select";
import { CSSProperties } from "react";

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-3 h-3"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </components.MultiValueRemove>
  );
};
const ClearIndicator = (props: ClearIndicatorProps) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props) as CSSProperties}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-gray-400 hover:text-red-500"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </div>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-red-500"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

type Props<Option, IsMulti, Group> = {
  id: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  hideError?: boolean;
  rules?: UseControllerProps["rules"];
  shouldUnregister?: boolean;
  variant?: "outlined" | "standard";
  defaultValue?: any;
  options: Option[];
  isClearable?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
};

export const ReactSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  placeholder = "Выберите...",
  id,
  fullWidth,
  helperText,
  label,
  readOnly,
  hideError = false,
  rules,
  shouldUnregister,
  defaultValue,
  variant = "outlined",
  isClearable,
  isLoading,
  isMulti,
  options,
  closeMenuOnSelect = true,
}: Props<Option, IsMulti, Group>) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className={cx(fullWidth && "w-full")}>
      {label && (
        <Label.Root
          className={cx("pb-2 block", error && "text-rose-500")}
          htmlFor={id}
        >
          {label}
        </Label.Root>
      )}
      <Controller
        name={id}
        rules={rules}
        control={control}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field }) => (
          <RSelect
            {...field}
            options={options}
            closeMenuOnSelect={closeMenuOnSelect}
            id={id}
            instanceId={id}
            placeholder={placeholder}
            components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
            isClearable={isClearable}
            isLoading={isLoading}
            // @ts-ignore
            isMulti={isMulti}
            noOptionsMessage={() => "Нет вариантов"}
            isDisabled={readOnly || isSubmitting}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderWidth: "2px",
                borderRadius: "0.375rem",
                borderColor: state.isFocused
                  ? "#f43f5e"
                  : error
                  ? "#f43f5e"
                  : "#e5e7eb",
                "&:hover": {
                  borderColor: state.isFocused ? "#f43f5e" : "#e5e7eb",
                },
                padding: "0.4rem",
                boxShadow: "none",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: cx(
                  state.isFocused && !state.isSelected && "#fee2e2",
                  state.isSelected && "#f43f5e"
                ),
                "&:active": {
                  backgroundColor: cx(
                    state.isFocused && !state.isSelected && "#fee2e2",
                    state.isSelected && "#f43f5e"
                  ),
                },
              }),
              multiValue: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#E9E5FF",
                borderRadius: "0.375rem",
              }),
              multiValueRemove: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "0.375rem",
              }),
            }}

            // classNames={{
            //   control: ({ isDisabled, isFocused }) =>
            //     cx(
            //       !isDisabled && isFocused && 'border-purple-800',
            //       isFocused && 'shadow-[0_0_0_1px] shadow-purple-800',
            //       isFocused && 'hover:border-purple-800'
            //     ),
            //   option: ({ isDisabled, isFocused, isSelected }) =>
            //     cx(
            //       isSelected && 'bg-purple-800',
            //       !isSelected && isFocused && 'bg-purple-300',
            //       !isDisabled && isSelected && 'active:bg-purple-800',
            //       !isDisabled && !isSelected && 'active:bg-purple-500'
            //     ),
            // }}
            // className={cx(
            //   readOnly ? 'bg-gray-100 text-gray-650' : error && 'border-rose-500',
            //   'block border-gray-200 px-4 py-3',
            //   'focus:border-red-500 focus:outline-none',
            //   'disabled:bg-gray-100 disabled:text-gray-650',
            //   variant === 'standard' && 'border-b-2',
            //   variant === 'outlined' && 'border-2 rounded-md ',
            //   error && 'border-rose-500',
            //   fullWidth && 'w-full',
            // )}
          />
        )}
      />

      {helperText && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">{helperText}</p>
        </div>
      )}
      {!hideError && error && (
        <div className="mt-2">
          <span className="text-sm text-rose-500">
            {error?.message as unknown as string}
          </span>
        </div>
      )}
    </div>
  );
};

ReactSelect.displayName = "ReactSelect";
