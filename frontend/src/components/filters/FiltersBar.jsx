import CategoryFilterList from './CategoryFilterList.jsx'
import DiscountFilter from './DiscountFilter.jsx'
import CategoryItem from './CategoryItem.jsx'
import reverseCategories from '../../assets/reverseCategories.js'
import '../../styles/filters.css'
import CategoryItemButton from './CategoryItemButton.jsx'
import Search from './Search.jsx'
import Sorter from './Sorter.jsx'

export default function FiltersBar({
    categories,
    setFilteredCategories,
    discountRange,
    setDiscountRange,
    filteredCategories,
    removeFilterFromList,
    searchField,
    setSearchField,
    priceSorting,
    setPriceSorting,
    discountSorting,
    setDiscountSorting,
}) {
    function handleClearFilters() {
        setFilteredCategories([])
        setDiscountRange(0)
        setSearchField('')
    }

    return (
        <>
            <div className="categoryFilterList">
                <div className="filters">
                    <Sorter
                        setDiscountSorting={setDiscountSorting}
                        priceSorting={priceSorting}
                        setPriceSorting={setPriceSorting}
                        discountSorting={discountSorting}
                    />
                    <CategoryFilterList
                        setFilteredCategories={setFilteredCategories}
                        filteredCategories={filteredCategories}
                        currentCategories={categories}
                    />
                    <DiscountFilter
                        discountRange={discountRange}
                        setDiscountRange={setDiscountRange}
                    />
                    <Search
                        searchField={searchField}
                        setSearchField={setSearchField}
                    />
                    {filteredCategories.length > 0 && (
                        <button
                            className="clearFiltersButton"
                            onClick={() => handleClearFilters()}
                        >
                            Clear
                        </button>
                    )}
                </div>
                <div className="categoryItems">
                    {filteredCategories.length > 0 &&
                        filteredCategories.map((cat) => (
                            <div className="categoryItem" key={cat}>
                                <div className="categoryItemText">
                                    <CategoryItem
                                        name={reverseCategories[cat]}
                                    />
                                </div>
                                <div className="categoryItemButton">
                                    <CategoryItemButton
                                        value={cat}
                                        removeFilterFromList={
                                            removeFilterFromList
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}
