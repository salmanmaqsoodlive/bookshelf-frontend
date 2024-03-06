import Link from "next/link";
import React from "react";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import { deleteUserApi } from "@/api/user";

const Navbar = () => {
  const logout = () => {
    localStorage.clear("user");
    localStorage.clear("access-token");

    toast("Bye! 👋", {
      position: "top-center",
      className: "foo-bar",
    });

    location.reload();
  };

  const deleteUser = async () => {
    try {
      await deleteUserApi();
      localStorage.clear("user");
      localStorage.clear("access-token");
      toast("Good Bye! 👋", {
        position: "top-center",
        className: "foo-bar",
      });

      location.reload();
    } catch (error) {}
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/books" className="text-white font-bold text-lg">
            bookshelf
          </Link>
        </div>
        <div>
          <Link href="/create-book" className="text-white mr-4">
            Create Book
          </Link>
          <Link href="#" className="text-white">
            <CustomButton
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
              onClick={logout}
            >
              Logout
            </CustomButton>
          </Link>
          <CustomButton
            className="ml-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            onClick={deleteUser}
          >
            Delete User
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
