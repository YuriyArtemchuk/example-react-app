import "./paginator.scss";

const Paginator = () => {
  return (
    <div className="container-fluid justify-content-center">
      <div className="pagination-wrapper">
        <div className="pagination">
          <a className="prev page-numbers" href="javascript:void(0)">
            prev
          </a>
          <span aria-current="page" className="page-numbers current">
            1
          </span>
          <a className="page-numbers" href="javascript:void(0)">
            2
          </a>
          <a className="page-numbers" href="javascript:void(0)">
            3
          </a>
          <a className="page-numbers" href="javascript:void(0)">
            4
          </a>
          <a className="page-numbers" href="javascript:void(0)">
            5
          </a>
          <a className="page-numbers" href="javascript:void(0)">
            6
          </a>
          <a className="page-numbers" href="javascript:void(0)">
            7
          </a>

          <a className="next page-numbers" href="javascript:void(0)">
            next
          </a>
        </div>
      </div>
    </div>
  );
};

export default Paginator;
