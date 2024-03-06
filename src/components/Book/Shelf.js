import React from "react";
import Book from "./Book";
import Status from "./Status";
import { updateBookApi } from "@/api/book";

const Shelf = ({ name, books, updateBook }) => {
  const handleStatus = async (event, id) => {
    let payload = {
      id,
      status: event.target.value,
    };

    updateBook(payload);
  };
  return (
    <div className="m-2 p-3 border border-violet-400 rounded-lg ">
      <h2 className="text-xl font-bold mb-2 text-white ">{name}</h2>
      {books.map((book, index) => (
        <div key={book._id}>
          <Book
            className="mx-2 my-4"
            title={book.title}
            author={book.author}
            genre={book.genre}
            publicationYear={book.publicationYear}
          />
          <Status
            currentStatus={book.status}
            handleStatus={(e) => handleStatus(e, book._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Shelf;
