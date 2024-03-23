import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";
import useAuth from "../../hooks/useAuth";
import { useBooks } from "../context/useBooks";
import cart from "../../images/cart.svg";
import "./header.scss";

const Header = () => {
  const { user, signOut } = useAuth();
  const {
    filterValue,
    setFilterValue,
    cartBooks,
    setCartBooks,
    setFiltersChanged,
  } = useBooks();
  const navigate = useNavigate();
  const handleSignOut = () => {
    setCartBooks([]);

    signOut(() => navigate("/signin"), { replace: true });
  };

  const handleFilterValue = ({ target: { value } }) => {
    setFilterValue(value);
    setFiltersChanged(true);
  };

  return (
    <header>
      <hr className="line-nav" style={{ marginTop: 0 }} />
      <div className="nav-container">
        <nav className="navbar">
          <ul className="nav-block">
            <li>
              <Link to="/" className="navbar-brand"></Link>
            </li>
            <li>
              <h3>
                <Link to="/" style={{ color: "black", padding: "0px 0px" }}>
                  X-course task / Yurii Artemchuk
                </Link>
              </h3>
            </li>

            <li className="nav-item">
              <Link to="/catalog">Catalog</Link>
            </li>
          </ul>
        </nav>
        <nav className="navbar">
          <ul className="nav-block">
            <li className="nav-item nav-rignt">
              <div className="search-section">
                <label
                  type="button"
                  htmlFor="search"
                  className={cn("searchLabel", {
                    hovered: filterValue && filterValue.length,
                  })}
                  onClick={() => setFilterValue("")}
                >
                  Clear
                </label>
                <input
                  type="text"
                  value={filterValue}
                  placeholder="type for searching"
                  id="search"
                  onChange={handleFilterValue}
                ></input>
              </div>
            </li>
            <li className="nav-item nav-rignt">
              <Link to="/cart">
                <img
                  style={{ marginBottom: 0 }}
                  src={cart}
                  alt="cart logo"
                  width="30px"
                />
                {cartBooks.length > 0 ? cartBooks.length : "Cart"}
              </Link>
            </li>
            {(!user && (
              <li className="nav-item nav-rignt">
                <Link to="/signin">Sign in</Link>
              </li>
            )) || (
              <li className="nav-item nav-rignt">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleSignOut}
                >
                  <Link to="/">Sign out</Link>
                </button>
              </li>
            )}

            <li className="nav-item nav-rignt">
              <Link to="#">
                {user ? `Hello ${user.login}!` : "Hello user!"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
