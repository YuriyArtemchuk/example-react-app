import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../context/useBooks";
import MainCartElement from "./mainCartElement";
import "./cart.scss";

const Cart = () => {
  const { cartBooks } = useBooks();

  if (cartBooks.length === 0) {
    return (
      <section className="container cart-section">
        <div className="message">
          <h4>
            No books in your cart yet! Try to choose something interesting for
            you in our <Link to="/catalog">Catalog</Link>!
          </h4>
        </div>
        <MainCartElement />
      </section>
    );
  } else {
    return (
      <section className="container cart-section">
        <MainCartElement />
      </section>
    );
  }
};

export default Cart;
