"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import { toast } from "react-toastify";

import { signup } from "@/api/user";
import { redirect, useRouter } from "next/navigation";
import isAuthenticated from "@/utils/helpers";
import Hoc from "@/components/Hoc";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      return redirect("/books");
    }
  }, []);
  const singupButtonClick = async (data) => {
    try {
      const response = await signup(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("access_token", response.token);
      }
      toast(response.message, {
        position: "top-center",
        className: "foo-bar",
      });
      router.push("/books");
    } catch (error) {
      toast.error("Email already existr", {
        position: "top-center",
        className: "foo-bar",
      });
    }
  };

  return (
    <Hoc>
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8"
        onSubmit={handleSubmit(singupButtonClick)}
      >
        <h1 className="font-bold text-center mb-6 text-3xl text-gray-700">
          Sign up
        </h1>
        <div className="mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email*
          </label>
          <input
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? true : false}
          />
        </div>
        <div className="mb-6">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password*
          </label>
          <input
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-center justify-between">
          <CustomButton
            className="bg-blue-500 hover:bg-blue-700 text-white"
            type="submit"
          >
            Sign up
          </CustomButton>
        </div>
      </form>
    </Hoc>
  );
};

export default Signup;
