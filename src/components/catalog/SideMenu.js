import { useState, useEffect } from "react";
import { useBooks } from "../context/useBooks";
import "bootstrap-icons/font/bootstrap-icons.css";

const SideMenu = () => {
  const { books, setMenuBooks } = useBooks();
  const [menuValue, setMenuValue] = useState();
  const [removeFilters, setRemoveFilters] = useState("none");
  //
  const handleMenuChange = (value) => {
    setMenuValue(value);
    setRemoveFilters("block");
  };
  useEffect(() => {
    if (!menuValue) {
      setRemoveFilters("none");
    }
  });
  //
  useEffect(() => {
    editMenuLevel(menuValue);
  }, [menuValue]);
  //
  const editMenuLevel = (value) => {
    const editList = books.filter(
      (item) => value === item.level || item.tags.includes(value)
    );
    setMenuBooks(editList);
    console.log(editList);
  };

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
  };
  //
  return (
    <aside className="menu">
      <div className="category">
        <hr />
        <h3>Menu</h3>
        <hr />

        <ul className="nav flex-column">
          <div className="message-menu" style={{ display: removeFilters }}>
            <li className="nav-item ">Filtered: {menuValue}</li>
            <button
              type="button"
              class="btn btn-default btn-sm"
              onClick={handleResetFilter}
            >
              <i class="bi bi-x-circle"></i> Remove all filters
            </button>
          </div>

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
                  <li className="nav-item">
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
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
