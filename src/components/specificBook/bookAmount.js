import { useParams } from "react-router-dom";
import { useBooks } from "../context/useBooks";
import { useState } from "react";
import InputAmount from "./inputAmount";

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
    if (existBook) {
      alert(`The book "${book.title}" is already exist in cart!`);
    } else if (book) {
      book.cartAmount = bookQuantity;
      setCartBooks((prevCartBooks) => [...prevCartBooks, book]);
      alert(`Book "${book.title}" added to cart`);
    }
  };

  return (
    <section className="grid2">
      <div className="product-price">
        <div className="price-item">
          <h5>
            Price: <span id="book-price">{book.price}</span> UAH
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
