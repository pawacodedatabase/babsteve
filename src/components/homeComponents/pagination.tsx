// Pagination.tsx
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Prev
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
