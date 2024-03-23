import "./paginator.scss";

const Paginator = ({
  totalBooks,
  booksPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pages.push(i);
  }

  const nextPage = () => {
    if (currentPage < Math.ceil(totalBooks / booksPerPage))
      setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div className="container-fluid justify-content-center">
      <div className="pagination-wrapper">
        <div className="pagination">
          <button className="prev page-numbers" onClick={prevPage}>
            prev
          </button>
          {pages.map((page, index) => {
            return (
              <button
                key={index}
                className={`page-numbers ${
                  page === currentPage ? "current" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button className="next page-numbers" onClick={nextPage}>
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paginator;
