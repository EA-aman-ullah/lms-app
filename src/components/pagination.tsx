interface Props {
  totalPage: number | undefined;
  currentPage: number | undefined;
  handleChange: (page: number) => void;
  previousNext: (PN: string) => void;
}

const Pagination = ({
  totalPage = 0,
  currentPage = 1,
  handleChange,
  previousNext,
}: Props) => {
  let page = [];
  let getRange = [];

  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }

  if (currentPage < 3) {
    for (let i = 1; i <= page.length && i <= 3; i++) {
      getRange.push(i);
    }
  } else if (currentPage > page.length - 2) {
    getRange = [];
    for (let i = page.length - 3; i < page.length; i++) {
      getRange.push(page[i]);
    }
  } else {
    for (let i = currentPage; i <= currentPage + 2; i++) {
      getRange.push(page[i - 2]);
    }
  }

  if (page.length < 2) return;

  return (
    <ul className="bg-white shadow-2xl text-[1.6rem] selection:bg-white flex justify-center items-center p-[1rem] gap-[.3rem] sm:gap-[1rem] rounded-full ">
      <li>
        <a
          className="text-gray-700 cursor-pointer hover:text-gray-900"
          onClick={() => {
            if (currentPage !== 1) previousNext("p");
          }}
        >
          <span>&laquo;</span> Previous
        </a>
      </li>
      {currentPage > page[1] && page.length >= 4 && (
        <>
          <li>
            <div
              className="text-gray-700 cursor-pointer hover:text-gray-900"
              onClick={() => handleChange(page[0])}
            >
              {page[0]}
            </div>
          </li>
          <li className="text-gray-700">...</li>
        </>
      )}
      {getRange.map((page) => (
        <li key={page}>
          <a
            className={`${
              page === currentPage
                ? "grid place-items-center w-10 h-10 border-3 border-blue-200 rounded-full text-white bg-secondary"
                : "text-gray-700 cursor-pointer hover:text-gray-900"
            }`}
            onClick={() => handleChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      {currentPage < page[page.length - 2] && page.length >= 4 && (
        <>
          <li className="text-gray-700">...</li>
          <li>
            <div
              className="text-gray-700 cursor-pointer hover:text-gray-900"
              onClick={() => handleChange(page[page.length - 1])}
            >
              {page[page.length - 1]}
            </div>
          </li>
        </>
      )}

      <li>
        <div
          className="text-gray-700 cursor-pointer hover:text-gray-900"
          onClick={() => {
            if (currentPage !== page.length) previousNext("n");
          }}
        >
          Next <span>&raquo;</span>
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
