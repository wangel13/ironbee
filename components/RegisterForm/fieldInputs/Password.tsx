import React from "react";
import { useFormContext } from "react-hook-form";

const Password = () => {
  const { register } = useFormContext();

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-xs text-gray-600 uppercase"
      >
        Пароль
      </label>
      <input
        {...register("password", {
          required: true,
        })}
        id="password"
        name="password"
        type="password"
        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
      />
    </div>
  );
};

export default Password;
