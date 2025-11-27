import React from "react";


// currentPage: active page number
// totalPages: total number of pages
// onPageChange: function to handle page change
 
const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  // Don't render if there's only one page
  if (totalPages <= 1) return null;

  // Generate page numbers array [1, 2, 3, ...]
  const pages = [];
for (let i = 1; i <= totalPages; i++) {
  pages.push(i);
}

  return (
    <div className="flex justify-center items-center gap-2 pb-10">

     
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded
          ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"}`}
      >
        Prev
      </button>

      
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-4 py-2 border rounded 
            ${currentPage === num
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 text-gray-800"
            }`}
        >
          {num}
        </button>
      ))}

     
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded
          ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"}`}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination
