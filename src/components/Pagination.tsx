import React, { useState } from "react";
type PaginationProps = {
  onPageChanges: Function;
  totalRecords: number;
  pageSize: number;
  pageLimit: number;
};

const Pagination = (props: PaginationProps) => {
  const { totalRecords, pageLimit, pageSize } = props;

  const [currentPage, setCureentPage] = useState(1);
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startPageIndex = Math.max(currentPage - pageLimit, 1);
  const endPageIndex = Math.min(currentPage + pageLimit, totalPages);

  const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const pages = range(startPageIndex, endPageIndex);

  const handleClick = (pageNumber: number) => {
    setCureentPage(pageNumber);
    props.onPageChanges(pageNumber);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => handleClick(currentPage - 1)}
          >
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {pages.map((item, index) => {
          return (
            <li
              key={index}
              className={`page-item ${currentPage === item ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => handleClick(item)}>
                {item}
              </button>
            </li>
          );
        })}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handleClick(currentPage + 1)}
            aria-label="Next"
          >
            <span aria-hidden="true">»</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
