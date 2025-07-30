import reverseCategories from '../../assets/reverseCategories.js'
import '../../styles/filters.css'
import { useState } from 'react'

export default function CategoryFilterList({
    setFilteredCategories,
    filteredCategories,
    currentCategories,
}) {
    const [search, setSearch] = useState('')
    function addCategory(cat) {
        if (cat && !filteredCategories.includes(cat)) {
            setFilteredCategories([...filteredCategories, cat])
        }
    }

    const filtered = currentCategories
        ?.filter((cat) => !filteredCategories.includes(cat))
        .filter((cat) =>
            reverseCategories[cat]?.toLowerCase().includes(search.toLowerCase())
        )

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
                {filtered
                    ?.filter((cat) => !filteredCategories.includes(cat))
                    .map(
                        (slug) =>
                            slug && (
                                <option key={slug} value={slug}>
                                    {reverseCategories[slug]}
                                </option>
                            )
                    )}
            </select>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    )
}
