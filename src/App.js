import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocalStorageService, LS_KEYS } from "./services/LocalStorage";
import RequireAuth from "./hooks/RequireAuth";
import Layout from "./routes/Layout";
import Cart from "./components/cart/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/signin/Signin";
import Catalog from "./components/catalog/Catalog";
import SpecificBook from "./components/specificBook/SpecificBook";
import { BooksProvider } from "./components/context/useBooks";
import AuthProvider from "./hooks/AuthProvider";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Main from "./components/main/Main";

function App() {
  const [books, setBooks] = useState(
    LocalStorageService.get(LS_KEYS.BOOKS) || []
  );
  const [cartBooks, setCartBooks] = useState(
    LocalStorageService.get(LS_KEYS.CARTBOOKS) || []
  );
  const [filterValue, setFilterValue] = useState();
  const [priceRange, setPriceRange] = useState("All_price");
  const [menuBooks, setMenuBooks] = useState([]);
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => LocalStorageService.set(LS_KEYS.BOOKS, books), [books]);
  useEffect(
    () => LocalStorageService.set(LS_KEYS.CARTBOOKS, cartBooks),
    [cartBooks]
  );

  useEffect(() => {
    fetch("./books.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setBooks(data.books);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <AuthProvider>
      <BooksProvider
        value={{
          books,
          setBooks,
          filterValue,
          setFilterValue,
          priceRange,
          setPriceRange,
          cartBooks,
          setCartBooks,
          menuBooks,
          setMenuBooks,
          filtersChanged,
          setFiltersChanged,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/cart"
                element={
                  <RequireAuth>
                    <Cart />
                  </RequireAuth>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/catalog"
                element={
                  <RequireAuth>
                    <Catalog />
                  </RequireAuth>
                }
              />
              <Route path="/book/:pageID" element={<SpecificBook />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
