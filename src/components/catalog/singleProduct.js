import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useBooks } from "../context/useBooks";

const SingleProduct = ({ id, image, title, author, price }) => {
  const { books, cartBooks, setCartBooks } = useBooks();
  //
  const editTitle = (title) => {
    if (title.length > 24) {
      return title.substring(0, 23) + "...";
    } else {
      return title;
    }
  };
  //
  const editAuthor = (author) => {
    if (author.length > 38) {
      return author.substring(0, 37) + "...";
    } else {
      return author;
    }
  };
  //
  const handleAddToCart = (id) => {
    const existBook = cartBooks.find((item) => item.id === id);
    const book = books.find((item) => item.id === id);
    //
    const notify = (title, isError) => {
      if (isError) {
        toast.error(`The book "${title}" is already exist in cart!`);
      } else {
        toast.success(`Book "${title}" added to cart`);
      }
    };

    if (existBook) {
      notify(existBook.title, true);
    } else {
      book.cartAmount = 1;
      setCartBooks((prevCartBooks) => [...prevCartBooks, book]);
      notify(book.title, false);
    }
  };

  //
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          error: {
            style: {
              background: "pink",
              color: "red",
            },
          },
          success: {
            style: {
              color: "green",
            },
          },
        }}
      />
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 single-product" id={id}>
        <div className="product-box">
          <div>
            <Link key={id} to={`/book/${id}`} className="book-link">
              <div className="product-photo overflow-hidden ">
                <img
                  src={image}
                  alt="The selected book"
                  className="mx-auto d-block"
                />
              </div>
              <div className="product-tag name-div">
                Book name:
                <span className="name-book"> {editTitle(title)}</span>
              </div>
              <div className="product-tag author">
                Author:
                <span className="name-author"> {editAuthor(author)}</span>
              </div>
            </Link>
            <div className="product-tag price">
              Price:
              <span className="price-book"> {price} USD</span>
            </div>
          </div>
          <div className="manage-block">
            <div className="price-item">
              <button
                className="btn btn-outline-primary btn-sm"
                type="submit"
                onClick={() => handleAddToCart(id)}
              >
                Add to cart
              </button>
            </div>
            <div className="price-item">
              <Link key={id} to={`/book/${id}`} className="book-link">
                <button
                  className="btn btn-outline-success btn-sm"
                  type="submit"
                >
                  Detail
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
