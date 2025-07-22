import categories from '../../assets/categories.js'
import './filters.css'

export default function CategoryFilterList({
    setFilteredCategories,
    filteredCategories,
}) {
    function addCategory(cat) {
        if (cat && !filteredCategories.includes(cat)) {
            setFilteredCategories([...filteredCategories, cat])
        }
    }

    return (
        <>
            <span>Categories</span>
            <select
                className="categorySelector"
                name="categories"
                id="categories"
                value=""
                onChange={(e) => addCategory(e.target.value)}
            >
                <option value="">---Add category---</option>
                {Object.entries(categories).map(([ukrName, slug]) => (
                    <option key={slug} value={slug}>
                        {ukrName}
                    </option>
                ))}
            </select>
        </>
    )
}
