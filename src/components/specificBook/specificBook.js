import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./specificBook.scss";
import BookPhoto from "./BookPhoto";
import BookAmount from "./BookAmount";
import BookDescription from "./BookDescription";
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
      <section className="specific-product">
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
