import { useEffect, useState } from 'react'
import { fetchCategories, loadAllItems } from '../../api.js'
import IsLoading from '../isLoading/IsLoading.jsx'
import ItemCard from './ItemCard.jsx'
import CategoryFilter from '../filters/CategoryFilter.jsx'
import ItemColumn from './itemColumn.jsx'

export default function ItemsList() {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState(items)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredCategories, setFilteredCategories] = useState([])
    const [discountRange, setDiscountRange] = useState(0)
    const [categories, setCategories] = useState([])

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
    }, [])

    function filterItemsByCategories() {
        let data = []
        if (filteredCategories.length > 0) {
            data = items.filter(
                (item) =>
                    filteredCategories.includes(item.sectionSlug) &&
                    100 - (parseInt(item.price) / item.oldPrice) * 100 >=
                        discountRange
            )
        } else {
            data = items.filter(
                (item) =>
                    100 - (parseInt(item.price) / item.oldPrice) * 100 >=
                    discountRange
            )
        }
        if (data?.length > 0) {
            setFilteredItems(data)
        } else {
            setFilteredItems([])
        }
    }

    function removeFilterFromList(filter) {
        let data = filteredCategories.filter((f) => f !== filter)
        setFilteredCategories(data)
    }

    useEffect(() => {
        filterItemsByCategories()
    }, [filteredCategories, discountRange])

    // console.log(items[0])
    // console.log(filteredItems[0])
    // console.log(discountRange)

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
                    />
                </div>
                <div className="itemsList">
                    {filteredItems.length > 0
                        ? filteredCategories.map((cat) => (
                              <ItemColumn
                                  key={cat}
                                  items={filteredItems.filter(
                                      (item) => item.sectionSlug === cat
                                  )}
                              />
                          ))
                        : items
                              .slice(0, 10)
                              .map((item) => (
                                  <ItemCard key={item.id} item={item} />
                              ))}
                </div>
            </div>
        </>
    )
}
