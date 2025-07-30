import { useEffect, useState } from 'react'
import { fetchCategories, loadAllItems } from '../../api.js'
import IsLoading from '../isLoading/IsLoading.jsx'
import CategoryFilter from '../filters/CategoryFilter.jsx'
import ItemColumn from './itemColumn.jsx'
import ItemGrid from './ItemGrid.jsx'
import Pagination from '../pagination/Pagination.jsx'

export default function ItemsList() {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState(items)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredCategories, setFilteredCategories] = useState([])
    const [discountRange, setDiscountRange] = useState(0)
    const [categories, setCategories] = useState([])
    const [searchField, setSearchField] = useState(' ')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const [totalPages, setTotalPages] = useState(0)

    async function fetchData() {
        try {
            setIsLoading(true)
            const result = await loadAllItems()
            setItems(result)
            setFilteredItems(result)
        } catch (error) {
            console.error('Error getting data from DB', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchCurrentCategories() {
        try {
            setIsLoading(true)
            const result = await fetchCategories()
            setCategories(result)
        } catch (error) {
            console.error('Error getting data from DB', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        fetchCurrentCategories()
        setTotalPages(Math.ceil(filteredItems.length / itemsPerPage))
    }, [])

    function filterItemsByCategories() {
        let data = []
        console.log(filteredCategories)

        if (filteredCategories.length > 0) {
            data = items.filter(
                (item) =>
                    filteredCategories.includes(item.sectionSlug) &&
                    item.title
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) &&
                    100 -
                        (parseInt(item.price) / parseInt(item.oldPrice)) *
                            100 >=
                        discountRange
            )
        } else {
            // When no categories are selected
            if (discountRange !== 0) {
                data = items.filter(
                    (item) =>
                        item.title
                            .toLowerCase()
                            .includes(searchField.toLowerCase()) &&
                        100 -
                            (parseInt(item.price) / parseInt(item.oldPrice)) *
                                100 >=
                            discountRange
                )
                console.log(data)
            } else {
                if (searchField.length >= 3) {
                    data = items.filter((item) =>
                        item.title
                            .toLowerCase()
                            .includes(searchField.toLowerCase())
                    )
                    console.log(data)
                }
                // No categories and no discount filter - show all items
                else {
                    data = items
                }
            }
        }

        setFilteredItems(data)
    }

    function removeFilterFromList(filter) {
        let data = filteredCategories.filter((f) => f !== filter)
        setFilteredCategories(data)
    }

    function calculateDataSlice() {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        return [indexOfFirstItem, indexOfLastItem]
    }

    useEffect(() => {
        filterItemsByCategories()
    }, [filteredCategories, discountRange, searchField])

    useEffect(() => {
        setTotalPages(Math.ceil(filteredItems.length / itemsPerPage))
    }, [filteredItems, itemsPerPage])

    return (
        <>
            {isLoading && <IsLoading />}
            <div className="container">
                <div className="categories">
                    <CategoryFilter
                        categories={categories}
                        filteredCategories={filteredCategories}
                        setFilteredCategories={setFilteredCategories}
                        setDiscountRange={setDiscountRange}
                        removeFilterFromList={removeFilterFromList}
                        searchField={searchField}
                        setSearchField={setSearchField}
                    />
                </div>
                <div className="itemsList">
                    {filteredItems.length > 0 && filteredCategories.length > 0
                        ? filteredCategories.map((cat) => (
                              <ItemColumn
                                  key={cat}
                                  items={filteredItems.filter(
                                      (item) => item.sectionSlug === cat
                                  )}
                              />
                          ))
                        : filteredItems && (
                              <ItemGrid
                                  items={filteredItems?.slice(
                                      calculateDataSlice()[0],
                                      calculateDataSlice()[1]
                                  )}
                              />
                          )}
                </div>
                {filteredItems.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </>
    )
}
