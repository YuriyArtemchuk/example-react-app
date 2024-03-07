import React from "react";
import { useBooks } from "../context/useBooks";
import "./catalog.scss";
import SingleProduct from "./singleProduct";
import SortMenu from "./sortMenu";
import SideMenu from "./SideMenu";
import Paginator from "./Paginator";
import defaulBooktImage from "../../images/defaulBooktImage.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// react-query
// const fetchBooks = async () => {
//   const response = await axios.get("/books.json");
//   return response.data.books;
// };

const Catalog = () => {
  // react-query
  // const queryClient = useQueryClient();

  const { books, filterValue, menuBooks, priceRange, setBooks, setPriceRange } =
    useBooks();

  //react-query
  // const { filterValue, menuBooks, priceRange, setPriceRange } = useBooks();
  //
  const handlePriceRange = (value) => {
    setPriceRange(value);
  };
  //react-query
  // const { data: books, isLoading } = useQuery({
  //   queryKey: ["books"],
  //   queryFn: fetchBooks,
  // });

  console.log(books);

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
    return true; // Если цена не выбрана, не применять фильтр по цене
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

  //
  // // filter by title from header
  // let filteredBooks = books;
  // if (filterValue && filterValue.trim() !== "") {
  //   filteredBooks = books.filter((book) =>
  //     book.title.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  // }
  //

  // // filter by price
  // let filteredBooks2 = books;
  // if (priceRange === "0-15") {
  //   filteredBooks2 = books.filter(({ price }) => price > 0 && price < 15);
  // } else if (priceRange === "15-30") {
  //   filteredBooks2 = books.filter(({ price }) => price > 15 && price < 30);
  // } else if (priceRange === "30+") {
  //   filteredBooks2 = books.filter(({ price }) => price > 30);
  // }

  // // filter by title and price together
  // let finalFilteredBooks = [];
  // if (filteredBooks && filteredBooks2) {
  //   console.log("filter");
  //   if (filteredBooks.length > filteredBooks2.length) {
  //     finalFilteredBooks = filteredBooks.filter((book1) =>
  //       filteredBooks2.some((book2) => book1.id === book2.id)
  //     );
  //   } else {
  //     finalFilteredBooks = filteredBooks2.filter((book2) =>
  //       filteredBooks.some((book1) => book2.id === book1.id)
  //     );
  //   }
  // } else if (filteredBooks && !filteredBooks2) {
  //   finalFilteredBooks = filteredBooks;
  // } else if (!filteredBooks && filteredBooks2) {
  //   finalFilteredBooks = filteredBooks2;
  // } else if (menuBooks) {
  //   console.log("menuBooks");
  //   finalFilteredBooks = menuBooks;
  // }

  // filter by side menu
  // if (menuBooks) {
  //   console.log(menuBooks);
  //   finalFilteredBooks = menuBooks;
  // }

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
          {finalFilteredBooks.map((book) => (
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
        <Paginator />
      </section>
      <SideMenu />
    </section>
  );
};

export default Catalog;
