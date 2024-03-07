/* eslint-disable jsx-a11y/anchor-is-valid */
import { useBooks } from "../context/useBooks";
import "./sortMenu.scss";

const SortMenu = ({ priceRange, handlePriceRange }) => {
  // const { priceRange, setPriceRange } = useBooks();

  // const handlePriceRange = (value) => {
  //   console.log(value);
  //   setPriceRange(value);
  // };

  return (
    <div className="sort-menu">
      <div className="dropdown">
        <label clasName="price-label">Price range: </label>
        <button className="dropbtn">{priceRange}</button>
        <div className="dropdown-content">
          <a onClick={() => handlePriceRange("All_price")}>All_price</a>
          <a onClick={() => handlePriceRange("0-15")}>0 - 15</a>
          <a onClick={() => handlePriceRange("15-30")}>15 - 30</a>
          <a onClick={() => handlePriceRange("30+")}>More_30</a>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
