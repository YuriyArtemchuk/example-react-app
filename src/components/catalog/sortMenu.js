import "./sortMenu.scss";

const SortMenu = ({ priceRange, handlePriceRange }) => {
  return (
    <div className="sort-menu">
      <div className="dropdown">
        <label className="price-label">Price range: </label>
        <button className="dropbtn">{priceRange}</button>
        <div className="dropdown-content">
          <button
            className="button-price-level"
            onClick={() => handlePriceRange("All_price")}
          >
            All_price
          </button>
          <br />
          <button
            className="button-price-level"
            onClick={() => handlePriceRange("0-15")}
          >
            0 - 15
          </button>
          <br />
          <button
            className="button-price-level"
            onClick={() => handlePriceRange("15-30")}
          >
            15 - 30
          </button>
          <br />
          <button
            className="button-price-level"
            onClick={() => handlePriceRange("30+")}
          >
            More_30
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
