import React, { useEffect, useState } from "react";
import { useBooks } from "../context/useBooks";
import "./catalog.scss";
import SingleProduct from "./SingleProduct";
import SortMenu from "./SortMenu";
import SideMenu from "./SideMenu";
import Paginator from "./Paginator";
import defaulBooktImage from "../../images/defaulBooktImage.png";

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const {
    books,
    filterValue,
    menuBooks,
    priceRange,
    setPriceRange,
    filtersChanged,
    setFiltersChanged,
  } = useBooks();

  const handlePriceRange = (value) => {
    setPriceRange(value);
    setFiltersChanged(true);
  };

  const filterByTitle = (book) =>
    !filterValue ||
    filterValue.trim() === "" ||
    book.title.toLowerCase().includes(filterValue.toLowerCase());
  //
  const filterByPrice = (book) => {
    if (priceRange === "0-15") {
      return book.price > 0 && book.price < 15;
    } else if (priceRange === "15-30") {
      return book.price > 15 && book.price < 30;
    } else if (priceRange === "30+") {
      return book.price > 30;
    }

    return true;
  };
  //
  const filterByMenu = (book) =>
    !menuBooks ||
    menuBooks.length === 0 ||
    menuBooks.some((item) => item.id === book.id);

  //
  const finalFilteredBooks = books.filter(
    (book) => filterByTitle(book) && filterByPrice(book) && filterByMenu(book)
  );
  // Pagination
  const lastBookIndex = currentPage * booksPerPage;
  const firstBookPage = lastBookIndex - booksPerPage;
  const currentListBooks = finalFilteredBooks.slice(
    firstBookPage,
    lastBookIndex
  );

  // Transition on the first page after any filter changing
  useEffect(() => {
    if (filtersChanged) {
      setCurrentPage(1);
      setFiltersChanged(false); // Resetting filter state
    }
  }, [filtersChanged]);
  //

  const checkedImage = (image) => (image ? image : defaulBooktImage);
  //

  return (
    <section className="container catalog-content">
      <section className="product-catalog">
        <SortMenu handlePriceRange={handlePriceRange} priceRange={priceRange} />
        <div
          className="row product-container justify-content-start"
          id="catalog"
        >
          {currentListBooks.map((book) => (
            <SingleProduct
              id={book.id}
              key={book.id}
              image={checkedImage(book.image)}
              title={book.title}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
        <Paginator
          totalBooks={finalFilteredBooks.length}
          booksPerPage={booksPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </section>
      <SideMenu
        handlePriceRange={handlePriceRange}
        setFiltersChanged={setFiltersChanged}
      />
    </section>
  );
};

export default Catalog;
