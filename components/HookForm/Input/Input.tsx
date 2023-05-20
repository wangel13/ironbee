import * as React from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import * as Label from '@radix-ui/react-label'
import get from 'lodash/get'
import cx from 'classnames'

export type InputProps = {
  /** Input label */
  label?: string
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string
  /** Input placeholder */
  placeholder?: string
  /** Small text below input, useful for additional information */
  helperText?: string
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean
  /** Disable error style (not disabling error validation) */
  hideError?: boolean
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions
  variant?: 'outlined' | 'standard'
} & React.ComponentPropsWithoutRef<'input'>

export const Input = ({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  variant = 'outlined',
  ...rest
}: InputProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const error = get(errors, id)

  return (
    <div>
      {label && (
        <Label.Root className={cx('pb-2 block', error && 'text-rose-500')} htmlFor={id}>
          {label}
        </Label.Root>
      )}
      <div className="relative">
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          disabled={readOnly || isSubmitting}
          className={cx(
            readOnly ? 'bg-gray-100 text-gray-650' : error && 'border-rose-500',
            !error && 'border-gray-200',
            'focus:border-violet-550 focus:outline-none',
            'block px-4 py-3 w-full text-black',
            'disabled:bg-gray-100 disabled:text-gray-650',
            variant === 'standard' && 'border-b-2',
            variant === 'outlined' && 'border-2 rounded-md ',
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {/*{!hideError && errors[id] && (*/}
        {/*  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">*/}
        {/*    <HiExclamationCircle className="text-xl text-rose-500" />*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      {helperText && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">{helperText}</p>
        </div>
      )}
      {!hideError && error && (
        <div className="mt-2">
          <span className="text-sm text-rose-500">{error?.message as unknown as string}</span>
        </div>
      )}
    </div>
  )
}
