import ItemCard from './ItemCard.jsx'
import reversedCategories from '../../assets/reverseCategories.js'
import { useEffect, useState } from 'react'

export default function ItemColumn({ items, priceSorting, discountSorting }) {
    const [currentItems, setCurrentItems] = useState([])

    useEffect(() => {
        let updatedItems = [...items]

        if (priceSorting === 'asc') {
            updatedItems.sort(
                (a, b) =>
                    parseFloat(a.displayPrice) - parseFloat(b.displayPrice)
            )
        } else if (priceSorting === 'desc') {
            updatedItems.sort(
                (a, b) =>
                    parseFloat(b.displayPrice) - parseFloat(a.displayPrice)
            )
        }

        if (discountSorting === 'asc') {
            updatedItems.sort(
                (a, b) => parseFloat(a.discount) - parseFloat(b.discount)
            )
        } else if (discountSorting === 'desc') {
            updatedItems.sort(
                (a, b) => parseFloat(b.discount) - parseFloat(a.discount)
            )
        }

        setCurrentItems(updatedItems)
    }, [items, priceSorting, discountSorting])

    return (
        <div className="itemColumn">
            {currentItems && currentItems[0]?.sectionSlug && (
                <div className="itemColumnHeader">
                    {reversedCategories[currentItems[0].sectionSlug]}
                </div>
            )}
            {currentItems.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    )
}
