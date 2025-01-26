import React from "react";

const Pagination = ({ lastPage, currentPage, onPageChange }) => {
    const handleFirst = () => onPageChange(1);
    const handleLast = () => onPageChange(lastPage);
    const handlePrevious = () => onPageChange(currentPage - 1);
    const handleNext = () => onPageChange(currentPage + 1);

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
        
            <button
                onClick={handleFirst}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === 1}
            >
                First
            </button>

            <button
                onClick={handlePrevious}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span className="text-lg font-semibold px-4">
                Page {currentPage} of {lastPage}
            </span>

            <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === lastPage}
            >
                Next
            </button>

            <button
                onClick={handleLast}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === lastPage}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
