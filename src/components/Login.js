import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormWrapper from "./FormWrapper";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import instance from "../axios";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const login = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    instance
      .post("/api/login", payload)
      .then((res) => {
        console.log(res.data.data);
        window.localStorage.setItem("token", res.data.data);
        history.push("/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormWrapper>
      <div>
        <h2 className="text-center mb-5 text-3xl">Comment App</h2>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col space-y-5"
          action=""
        >
          <div>
            <label className="block mb-1">Email</label>
            <input
              placeholder="Email"
              type="email"
              {...register("email")}
              className={`${
                errors.email ? "border-red-400" : ""
              } appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6`}
            />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              placeholder="Password"
              type="password"
              {...register("password")}
              className={`${
                errors.password ? "border-red-400" : ""
              } appearance-none px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none block w-full leading-6`}
            />
            <p className="text-red-400">{errors.password?.message}</p>
          </div>
        </form>
      </div>
      <button
        type="submit"
        onClick={handleSubmit(login)}
        className="px-5 py-3 text-white rounded-md mt-6 bg-indigo-600 focus:outline-none"
      >
        Login
      </button>
    </FormWrapper>
  );
}

export default Login;
