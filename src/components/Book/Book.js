import classNames from "classnames";
import React from "react";
import Status from "./Status";

const Book = ({ title, author, genre, className,publicationYear }) => {
  return (
    <div
      className={classNames(
        "cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg py-6 px-4 shadow w-60 h-40 flex flex-col justify-between",
        className
      )}
    >
      <h1 className="text-xl text-center font-bold text-white capitalize">
        {title}
      </h1>
      <p>Author: {author}</p>
      <p>Publication Year: {publicationYear}</p>
      <p>Genre: {genre.map(({ name }) => name + ",")}</p>
    </div>
  );
};

export default Book;
