import { useParams } from "react-router-dom";
import { useBooks } from "../context/useBooks";
import defaulBooktImage from "../../images/defaulBooktImage.png";

const BookPhoto = () => {
  const { pageID } = useParams();

  const { books } = useBooks();
  const book = books.find((item) => item.id === parseInt(pageID));
  //
  const checkedImage = (image) => (image ? image : defaulBooktImage);

  return (
    <section className="grid1">
      <div className="product-photo">
        <img
          src={checkedImage(book.image)}
          alt="The selected book"
          width="60%"
          height="auto"
        />
      </div>
      <div className="product-description">
        <h5>Book description:</h5>
        <p>{book.description}</p>
      </div>
    </section>
  );
};

export default BookPhoto;
