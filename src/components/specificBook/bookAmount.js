import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useBooks } from "../context/useBooks";
import { useState } from "react";
import InputAmount from "./InputAmount";

const BookAmount = () => {
  const { pageID } = useParams();
  const { books, cartBooks, setCartBooks } = useBooks();
  const [bookQuantity, setBookQuantity] = useState(1);

  const book = books.find((item) => item.id === parseInt(pageID));

  const ChangingQuantity = (quantity) => {
    setBookQuantity(quantity);
  };

  const handleAddToCart = () => {
    const existBook = cartBooks.find((item) => item.id === book.id);
    const notify = (title, isError) => {
      if (isError) {
        toast.error(`The book "${title}" is already exist in cart!`);
      } else {
        toast.success(`Book "${title}" added to cart`);
      }
    };
    if (existBook) {
      // alert(`The book "${book.title}" is already exist in cart!`);
      notify(existBook.title, true);
    } else if (book) {
      book.cartAmount = bookQuantity;
      setCartBooks((prevCartBooks) => [...prevCartBooks, book]);
      notify(book.title, false);
      // alert(`Book "${book.title}" added to cart`);
    }
  };

  return (
    <section className="grid2">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          error: {
            style: {
              background: "pink",
              color: "red",
            },
          },
          success: {
            style: {
              color: "green",
            },
          },
        }}
      />
      <div className="product-price">
        <div className="price-item">
          <h5>
            Price: <span id="book-price">{book.price}</span> USD
          </h5>
        </div>
        <InputAmount book={book} onQuantityChange={ChangingQuantity} />
        <div className="add-to-cart price-item">
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookAmount;
