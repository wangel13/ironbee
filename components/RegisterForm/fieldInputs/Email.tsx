import React from "react";
import { useFormContext } from "react-hook-form";

const Email = () => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor="email" className="block text-xs text-gray-600 uppercase">
        Электронная почта
      </label>
      <input
        {...register("email", {
          required: true,
        })}
        id="email"
        name="email"
        type="email"
        placeholder="panic@thedis.co"
        autoComplete="email"
        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
      />
    </div>
  );
};

export default Email;
