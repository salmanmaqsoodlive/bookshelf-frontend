"use client";
import CustomButton from "@/components/CustomButton";
import Hoc from "@/components/Hoc";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Auth from "../../../Auth";
import { createBookApi } from "@/api/book";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fetchGenreApi } from "@/api/genre";
import isAuthenticated from "@/utils/helpers";

const CreateBook = () => {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "genre",
  });

  const createBook = async (data) => {
    try {
      const response = await createBookApi(data);
      toast(response?.message, {
        position: "top-center",
        className: "foo-bar",
      });
      router.push("/books");
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        className: "foo-bar",
      });
    }
  };

  const fetchGenre = async () => {
    try {
      const response = await fetchGenreApi();
      setGenres(response?.genres);
    } catch (error) {
      if (error?.response?.status === 401) {
        if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
        }
        isAuthenticated();
      }
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        className: "foo-bar",
      });
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <Hoc>
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8"
        onSubmit={handleSubmit(createBook)}
      >
        <h1 className="font-bold text-center mb-6 text-3xl text-gray-700">
          Create Book
        </h1>
        <div className="mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Title*
          </label>
          <input
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            aria-invalid={errors.title ? true : false}
          />
        </div>
        <div className="mb-6">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Author"
            {...register("author")}
          />
        </div>
        <div className="mb-6">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Publication date
          </label>
          <input
            type="date"
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Publication Date"
            {...register("publicationDate")}
          />
        </div>
        <div className="mb-6">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicationHouse"
          >
            Publication House
          </label>
          <input
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            id="publicationHouse"
            type="text"
            placeholder="Publication House"
            {...register("publicationHouse")}
          />
        </div>
        <div className="mb-6">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicationHouse"
          >
            Genre
          </label>
          <select
            className="shadow border rounded-lg w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            multiple
            {...register("genre")}
            onChange={(e) => {
              append({ value: e.target.value });
            }}
          >
            {genres.length &&genres.map((genre) => (
              <option value={genre._id}>{genre.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <CustomButton
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white w-full"
            type="submit"
          >
            Create
          </CustomButton>
        </div>
      </form>
    </Hoc>
  );
};

export default Auth(CreateBook);
