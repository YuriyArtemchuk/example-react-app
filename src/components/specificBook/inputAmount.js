import { useState } from "react";

const InputAmount = ({ book, onQuantityChange }) => {
  const [bookQuantity, setBookQuantity] = useState(1);

  const totalPrice = bookQuantity * book.price;

  const handlerChangingQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity <= 0) {
      alert(
        "Кількість заказаного товару не може рівнятися чи бути меньшим за нуль"
      );
      setBookQuantity(1);
    } else if (newQuantity > book.amount) {
      alert("Перевищена кількісна можливість замовлення даного товару");
      setBookQuantity(book.amount);
    } else {
      setBookQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };
  return (
    <>
      <div className="price-item">
        <label className="price-item-2 number" htmlFor="qty-products">
          Quantity:
        </label>
        <br />
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
          UAH
        </h5>
      </div>
    </>
  );
};

export default InputAmount;
