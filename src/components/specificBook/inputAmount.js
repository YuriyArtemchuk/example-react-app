import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const InputAmount = ({ book, onQuantityChange }) => {
  const [bookQuantity, setBookQuantity] = useState(1);

  const totalPrice = bookQuantity * book.price;
  //
  const notify = (whichOne) => {
    if (whichOne) {
      toast.error(
        "Кількість заказаного товару не може рівнятися чи бути меньшим за нуль"
      );
    } else {
      toast.error("Перевищена кількісна можливість замовлення даного товару");
    }
  };
  //
  const handlerChangingQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity <= 0) {
      notify(true);
      setBookQuantity(1);
    } else if (newQuantity > book.amount) {
      notify(false);
      setBookQuantity(book.amount);
    } else {
      setBookQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };
  return (
    <>
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
        }}
      />
      <div className="price-item">
        <label className="price-item-2 number" htmlFor="qty-products">
          Quantity:
        </label>
        <div class="break"></div>
        <input
          id="qty-products"
          type="number"
          data-testid="change-amount"
          value={bookQuantity}
          onChange={handlerChangingQuantity}
        />
      </div>
      <div className="price-item">
        <h5>
          Total price:
          <span id="total-price" data-testid="total-price">
            {totalPrice.toFixed(2)}
          </span>
          USD
        </h5>
      </div>
    </>
  );
};

export default InputAmount;
