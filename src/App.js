// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocalStorageService, LS_KEYS } from "./services/localStorage";
import RequireAuth from "./hooks/RequireAuth";
import Layout from "./routes/layout";
import Cart from "./components/cart/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/signin/signin";
import Catalog from "./components/catalog/catalog";
import SpecificBook from "./components/specificBook/specificBook";
import { BooksProvider } from "./components/context/useBooks";
import AuthProvider from "./hooks/AuthProvider";
import NotFoundPage from "./components/notFoundPage/notFoundPage";
import Main from "./components/main/main";
// import {
//   useQuery,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// const queryClient = new QueryClient();

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

  // const fetchBooks = () => {
  //   fetch("./books.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       return setBooks(data.books);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data", error);
  //     });
  // };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["books"],
  //   queryFn: fetchBooks,
  // });

  // console.log(data);
  // console.log(books);

  return (
    <AuthProvider>
      {/* <QueryClientProvider client={queryClient}> */}
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
        }}
      >
        {/* <BrowserRouter> */}
        {/* It's a HashRouter */}
        <Router>
          {/* It's a HashRouter */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Main />} />
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
          {/* It's a HashRouter */}
        </Router>
        {/* It's a HashRouter */}
        {/* </BrowserRouter> */}
      </BooksProvider>
      {/* </QueryClientProvider> */}
    </AuthProvider>
  );
}

export default App;
