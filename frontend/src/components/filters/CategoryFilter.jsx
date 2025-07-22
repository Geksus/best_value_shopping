import CategoryFilterList from './CategoryFilterList.jsx'
import DiscountFilter from './DiscountFilter.jsx'
import CategoryItem from './CategoryItem.jsx'
import reverseCategories from '../../assets/reverseCategories.js'
import './filters.css'

export default function CategoryFilter({
    setFilteredCategories,
    setDiscountRange,
    filteredCategories,
    removeFilterFromList,
}) {
    return (
        <>
            <div className="categoryFilterList">
                <div className="filters">
                    <CategoryFilterList
                        setFilteredCategories={setFilteredCategories}
                        filteredCategories={filteredCategories}
                    />
                    <DiscountFilter setDiscountRange={setDiscountRange} />
                </div>
                <div className="categoryItems">
                    {filteredCategories.length > 0 &&
                        filteredCategories.map((cat) => (
                            <CategoryItem
                                key={cat}
                                name={reverseCategories[cat]}
                                value={cat}
                                removeFilterFromList={removeFilterFromList}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}
