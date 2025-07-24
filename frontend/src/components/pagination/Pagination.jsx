import './pagination.css'

export default function Pagination({
    currentPage,
    setCurrentPage,
    setItemsPerPage,
    totalPages,
    itemsPerPage = 25,
}) {
    function handlePageChange(page) {
        const pageNumber = parseInt(page)
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    function handleItemsPerPageChange(event) {
        const newItemsPerPage = parseInt(event.target.value)
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // More complex logic for showing relevant pages
            let startPage = Math.max(1, currentPage - 2)
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1)
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }
        }

        return pages
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="pagination">
            <div className="paginationSelectContainer">
                <span>Items per page</span>
                <select
                    className="paginationSelect"
                    name="itemsPerPage"
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div className="paginationButtons">
                <button
                    className={
                        currentPage === 1
                            ? 'paginationButton paginationButtonInactive paginationButtonLong'
                            : 'paginationButton paginationButtonActive paginationButtonLong'
                    }
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    First
                </button>

                <button
                    className={
                        currentPage === 1
                            ? 'paginationButton paginationButtonInactive paginationButtonLong'
                            : 'paginationButton paginationButtonActive paginationButtonLong'
                    }
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {getPageNumbers().map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={
                            currentPage === pageNum
                                ? 'paginationButton paginationButtonCurrent'
                                : 'paginationButton paginationButtonActive'
                        }
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    className={
                        currentPage === totalPages
                            ? 'paginationButton paginationButtonInactive paginationButtonLong'
                            : 'paginationButton paginationButtonActive paginationButtonLong'
                    }
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

                <button
                    className={
                        currentPage === totalPages
                            ? 'paginationButton paginationButtonInactive paginationButtonLong'
                            : 'paginationButton paginationButtonActive paginationButtonLong'
                    }
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    )
}
