import React from "react";
import { useFormContext } from "react-hook-form";

function Input({ children, type, placeholder, inputLabel }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input
        {...register(inputLabel, { required: true })}
        type={type}
        placeholder={placeholder}
        className="appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6"
      />
      {errors[inputLabel] && errors[inputLabel].type === "required" && (
        <span className="text-red-400" role="alert">
          This is required
        </span>
      )}
    </>
  );
}

export default Input;
