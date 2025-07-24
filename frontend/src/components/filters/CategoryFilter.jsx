import CategoryFilterList from './CategoryFilterList.jsx'
import DiscountFilter from './DiscountFilter.jsx'
import CategoryItem from './CategoryItem.jsx'
import reverseCategories from '../../assets/reverseCategories.js'
import './filters.css'
import CategoryItemButton from './CategoryItemButton.jsx'
import Search from './Search.jsx'

export default function CategoryFilter({
    categories,
    setFilteredCategories,
    setDiscountRange,
    filteredCategories,
    removeFilterFromList,
    searchField,
    setSearchField,
}) {
    return (
        <>
            <div className="categoryFilterList">
                <div className="filters">
                    <CategoryFilterList
                        setFilteredCategories={setFilteredCategories}
                        filteredCategories={filteredCategories}
                        currentCategories={categories}
                    />
                    <DiscountFilter setDiscountRange={setDiscountRange} />
                    <Search
                        searchField={searchField}
                        setSearchField={setSearchField}
                    />
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
