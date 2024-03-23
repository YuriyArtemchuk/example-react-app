import { useParams } from "react-router-dom";
import { useBooks } from "../context/useBooks";

const BookDescription = () => {
  const { pageID } = useParams();
  const { books } = useBooks();
  const book = books.find((item) => item.id === parseInt(pageID));

  return (
    <section className="grid3">
      <div className="product-details">
        <h3>{book.title}</h3>
        <table>
          <tbody>
            <tr>
              <td className="td-book">Book name:</td>
              <td className="td-book">{book.title}</td>
            </tr>
            <tr>
              <td className="td-book">Author:</td>
              <td className="td-book">{book.author}</td>
            </tr>
            <tr>
              <td className="td-book">Level:</td>
              <td className="td-book">{book.level}</td>
            </tr>
            <tr>
              <td className="td-book">Short description:</td>
              <td className="td-book">{book.shortDescription}</td>
            </tr>
            <tr>
              <td className="td-book">Tags:</td>
              <td className="td-book">
                {book.tags.map((tag) => (
                  <tr key={tag}>
                    <td>{tag}</td>
                  </tr>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BookDescription;
