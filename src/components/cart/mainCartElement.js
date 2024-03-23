import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LocalStorageService, LS_KEYS } from "../../services/LocalStorage";
import { useBooks } from "../context/useBooks";
import defaulBooktImage from "../../images/defaulBooktImage.png";

const MainCartElement = () => {
  const { books, setBooks, cartBooks, setCartBooks } = useBooks();
  const [checkedBooks, setCheckedBooks] = useState({});
  const [purchase, setPurchase] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [colorButton, setButtonColor] = useState("btn-success");

  // Встановлення checkbox за замовчуванням на true
  useEffect(() => {
    const initialCheckedBooks = {};
    cartBooks.forEach((book) => {
      initialCheckedBooks[book.id] = true;
    });
    setCheckedBooks(initialCheckedBooks);
  }, [cartBooks]);
  // Зміна стану кнопки, якщо товари будуть відсутні у кошику
  useEffect(() => {
    changeDisabilityButton();
  }, [cartBooks, checkedBooks]);

  //
  const notify = (whichOne) => {
    let message = "";
    if (whichOne) {
      message =
        "Кількість заказаного товару не може рівнятися чи бути меньшим за нуль";
    } else {
      message = "Перевищена кількісна можливість замовлення даного товару";
    }
    toast.error(message);
  };
  //
  const handlerChangingAmount = ({ target: { value } }, bookId) => {
    const bookForEditAmount = cartBooks.find((item) => item.id === bookId);
    if (value < 1) {
      notify(true);
      bookForEditAmount.cartAmount = 1;
    } else if (value > bookForEditAmount.amount) {
      notify(false);
      bookForEditAmount.cartAmount = bookForEditAmount.amount;
    } else {
      bookForEditAmount.cartAmount = value;
    }
    const editCartBooks = cartBooks.map((item) =>
      item.id === bookId ? bookForEditAmount : item
    );
    setCartBooks(editCartBooks);
  };
  //
  const totalSum = () => {
    return cartBooks.reduce((acc, item) => {
      if (checkedBooks[item.id]) {
        return acc + item.cartAmount * item.price;
      } else {
        return acc;
      }
    }, 0);
  };

  const totalSumPerBook = (amount, price, bookId) => {
    if (!checkedBooks[bookId]) {
      return 0;
    } else {
      return (amount * price).toFixed(2);
    }
  };
  //
  const handleDeleteBook = (bookId) => {
    const updatedCheckedBooks = { ...checkedBooks };
    updatedCheckedBooks[bookId] = !updatedCheckedBooks[bookId];
    setCheckedBooks(updatedCheckedBooks);
  };
  //
  const handlePurchaseSubmit = (event) => {
    event.preventDefault();
    const order = cartBooks.filter((item) => checkedBooks[item.id]);
    // Create new property order with show total sum of purchase
    order.purchaseAmount = totalSum();
    setPurchase(order);
    remainingBooksInCatalog();
    setCartBooks([]);
    const message = `Our congratulation!!! You've just made an order on total sum ${order.purchaseAmount} USD!!`;
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        loading: "Processing...",
        success: message,
        error: "Error processing order!",
      }
    );
  };
  //
  const remainingBooksInCatalog = () => {
    cartBooks.map((item) => {
      if (checkedBooks[item.id]) {
        let orderedAmount = item.cartAmount;
        let remainingBook = books.find((book) => book.id === item.id);
        const remainingAmount = remainingBook.amount - orderedAmount;
        remainingBook.amount = remainingAmount;
        delete remainingBook.cartAmount;
        setBooks(() => books);
      }
      return cartBooks;
    });
  };
  // Оновлення масиву книг, у тому числі і в localStorage (при кожному оновленні books)
  useEffect(() => {
    LocalStorageService.set(LS_KEYS.BOOKS, books);
  }, [books]);
  //
  const changeDisabilityButton = () => {
    let values = Object.values(checkedBooks);
    let newValues = values.filter((item) => item === true);
    if (cartBooks.length === 0 || newValues.length === 0) {
      setDisabledButton(true);
      setButtonColor("btn-danger");
    } else {
      setDisabledButton(false);
      setButtonColor("btn-success");
    }
  };
  //
  const checkedImage = (image) => (image ? image : defaulBooktImage);
  //
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          closeOnClick: true,
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
      <div className="cart-box">
        <table>
          <thead>
            <tr>
              <th>Photo:</th>
              <th>Book name:</th>
              <th>Price (USD):</th>
              <th>Amount:</th>
              <th>To buy or not to buy:</th>
              <th>Total:</th>
            </tr>
          </thead>
          <tbody>
            {cartBooks.map((book, id) => (
              <tr key={id}>
                <td>
                  <div className="product-photo overflow-hidden">
                    <Link
                      key={book.id}
                      to={`/book/${book.id}`}
                      className="book-link"
                    >
                      <img src={checkedImage(book.image)} alt="Selected book" />
                    </Link>
                  </div>
                </td>
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="book-link"
                >
                  <td className="td-title">{book.title}</td>
                </Link>
                <td>{book.price} USD</td>
                <td>
                  <input
                    id="qty-products"
                    type="number"
                    value={book.cartAmount}
                    onChange={(event) => handlerChangingAmount(event, book.id)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-book"
                    id="check"
                    name="checkbox-delete"
                    onChange={(event) => handleDeleteBook(book.id)}
                    checked={checkedBooks[book.id]}
                  />
                  <label className="form-check-label" htmlFor="check" />
                </td>

                <td>{totalSumPerBook(book.cartAmount, book.price, book.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          <h4>
            Total sum:
            <span id="total"> {totalSum().toFixed(2)} </span>
            USD
          </h4>
        </div>
      </div>
      <div className="order-button">
        <button
          className={`btn ${colorButton}`}
          type="submit"
          onClick={handlePurchaseSubmit}
          disabled={disabledButton}
        >
          Purchase
        </button>
      </div>
    </>
  );
};

export default MainCartElement;
