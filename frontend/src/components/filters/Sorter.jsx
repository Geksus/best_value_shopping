export default function Sorter({
    setDiscountSorting,
    discountSorting,
    priceSorting,
    setPriceSorting,
}) {
    function handleSortingSymbol(direction) {
        if (direction === 'asc') {
            return '\u2191'
        }
        if (direction === 'desc') {
            return '\u2193'
        }
        return '-'
    }

    function handleSortingDirectionChange(type) {
        const directions = ['asc', 'desc', '-']
        type === 'price'
            ? setPriceSorting(
                  directions[(directions.indexOf(priceSorting) + 1) % 3]
              )
            : setDiscountSorting(
                  directions[(directions.indexOf(discountSorting) + 1) % 3]
              )
    }

    return (
        <>
            <div className="sorter">
                <span onClick={() => handleSortingDirectionChange('price')}>
                    Price {handleSortingSymbol(priceSorting)}
                </span>
                <span onClick={() => handleSortingDirectionChange('discount')}>
                    Discount {handleSortingSymbol(discountSorting)}
                </span>
            </div>
        </>
    )
}
