"use client";
import { fetchBooksApi, updateBookApi } from "@/api/book";
import Book from "@/components/Book/Book";
import Shelf from "@/components/Book/Shelf";
import React, { useEffect, useState } from "react";
import Auth from "../../../Auth";
import Hoc from "@/components/Hoc";
import { toast } from "react-toastify";
import isAuthenticated from "@/utils/helpers";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [asc, setAsc] = useState(true);
  const [selectedValue, setSelectedValue] = useState("plan to read");
  let debounceTimer = 500;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchBooks({ search: term });
    }, 500);
  };

  const fetchBooks = async (payload) => {
    try {
      const response = await fetchBooksApi(payload);
      setBooks(response.books);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("access-token");
        isAuthenticated();
      }
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        className: "foo-bar",
      });
    }
  };

  const updateBook = async (payload) => {
    try {
      const response = await updateBookApi(payload);
      await fetchBooks();
      toast(response?.message, {
        position: "top-center",
        className: "foo-bar",
      });
    } catch (error) {}
  };

  const sortBooks = () => {
    setAsc(!asc);
    fetchBooks({ sort: asc ? "asc" : "desc" });
  };

  return (
    <Hoc>
      <div className="flex flex-col">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search book"
          className="block mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <CustomButton className="bg-indigo-500 w-20" onClick={sortBooks}>
          Sort
        </CustomButton>
        {books ? (
          <div className="flex">
            {books["plan to read"] && (
              <Shelf
                name="Plan to read"
                books={books["plan to read"]}
                updateBook={updateBook}
              />
            )}
            {books["reading"] && (
              <Shelf
                name="Reading"
                books={books["reading"]}
                updateBook={updateBook}
              />
            )}
            {books["completed"] && (
              <Shelf
                name="Completed"
                books={books["completed"]}
                updateBook={updateBook}
              />
            )}
          </div>
        ) : (
          <p className="text-white">No book found</p>
        )}
      </div>
    </Hoc>
  );
};

export default Auth(Books);
