import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./specificBook.scss";
import BookPhoto from "./bookPhoto";
import BookAmount from "./bookAmount";
import BookDescription from "./bookDescription";
import { useBooks } from "../context/useBooks";

const SpecificBook = () => {
  const { pageID } = useParams();

  const { books } = useBooks();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const chosenBook = books.find((item) => item.id === parseInt(pageID));
    if (chosenBook) {
      setBook(chosenBook);
    }
  }, [pageID, books]);

  if (!books) {
    return <div>Loading...</div>;
  }

  if (book) {
    return (
      <section class="specific-product">
        <BookPhoto />
        <BookAmount />
        <BookDescription />
      </section>
    );
  } else {
    return <div>Book not found</div>;
  }
};

export default SpecificBook;
