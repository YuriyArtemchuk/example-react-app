import { useState, useEffect } from "react";
import { useBooks } from "../context/useBooks";
import "bootstrap-icons/font/bootstrap-icons.css";

const SideMenu = ({ handlePriceRange }) => {
  const { books, setMenuBooks, priceRange, setPriceRange, setFiltersChanged } =
    useBooks();
  const [menuValue, setMenuValue] = useState();
  //
  const handleMenuChange = (value) => {
    setMenuValue(value);
    setFiltersChanged(true);
  };
  //
  useEffect(() => {
    const editList = books.filter(
      (item) => menuValue === item.level || item.tags.includes(menuValue)
    );
    setMenuBooks(editList);
  }, [menuValue]);
  //
  const tagsListWithDuplicate = books.reduce(
    (acc, item) => acc.concat(item.tags),
    []
  );
  //
  let tagsList = tagsListWithDuplicate.reduce((acc, tag) => {
    if (!acc.includes(tag)) {
      acc.push(tag);
    }
    return acc;
  }, []);
  //
  const handleResetFilter = () => {
    setMenuValue("");
    setPriceRange("All_price");
    setFiltersChanged(true); // Transition on the first page after reset filters
  };
  //
  return (
    <aside className="menu">
      <div className="category">
        <hr />
        <h3>Menu</h3>
        <hr />

        <ul className="nav flex-column">
          {menuValue || priceRange !== "All_price" ? (
            <div className="message-menu">
              <li className="nav-item ">
                Filtered:
                <div className="filter-item">{menuValue}</div>
                <div className="filter-item">
                  {priceRange !== "All_price" ? priceRange : null}
                </div>
              </li>
              <button
                type="button"
                class="btn btn-default btn-sm"
                onClick={handleResetFilter}
              >
                <i class="bi bi-x-circle"></i> Remove all filters
              </button>
            </div>
          ) : null}

          <li className="nav-item category-name">
            <span>Level</span>

            <ul>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleMenuChange("Beginner")}
                >
                  Beginner
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleMenuChange("Middle")}
                >
                  Middle
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleMenuChange("Pro")}
                >
                  Pro
                </button>
              </li>
            </ul>
          </li>
          <hr />

          <li className="nav-item category-name">
            <span>Tags</span>

            <ul>
              {tagsList.map((tag) => {
                return (
                  <li key={tag.id} className="nav-item">
                    <button
                      className="nav-link"
                      onClick={() => handleMenuChange(tag)}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
          <hr />
          <li className="nav-item category-name">
            <span>Price range in USD:</span>
            <ul>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handlePriceRange("All_price")}
                >
                  All_price
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handlePriceRange("0-15")}
                >
                  0 - 15
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handlePriceRange("15-30")}
                >
                  15 - 30
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handlePriceRange("30+")}
                >
                  More then 30
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
