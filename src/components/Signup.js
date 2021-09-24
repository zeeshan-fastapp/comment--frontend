import React from "react";
// import Button from "./Button";
// import Input from "./Input";
import FormWrapper from "./FormWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import instance from "../../axios";
import instance from "../axios.js";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(4).max(15),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    const { name, email, password } = data;
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    console.log(data);
    instance
      .post("/api/register", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  return (
    <FormWrapper>
      <div>
        <h2 className="text-center mb-5 text-3xl">Comment App</h2>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col space-y-6"
          action=""
        >
          <div>
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={`${
                errors.name ? "border-red-400" : ""
              } appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6`}
            />
            <p className="text-red-400">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email")}
              className={`${
                errors.email ? "border-red-400" : ""
              } appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6`}
            />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password")}
              className={`${
                errors.password ? "border-red-400" : ""
              } appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6`}
            />
            <p className="text-red-400">{errors.password?.message}</p>
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`${
                errors.confirmPassword ? "border-red-400" : ""
              } appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6`}
            />
            <p className="text-red-400">{errors.confirmPassword?.message}</p>
          </div>
        </form>
      </div>
      <button
        type="submit"
        onClick={handleSubmit(submitForm)}
        className="px-5 py-3 text-white rounded-md mt-6 bg-indigo-600 focus:outline-none"
      >
        Sign up
      </button>
    </FormWrapper>
  );
}
