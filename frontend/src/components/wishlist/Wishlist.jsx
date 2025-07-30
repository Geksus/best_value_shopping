import { useEffect, useState } from 'react'
import { fetchWishlist } from '../../api.js'
import '../../styles/items.css'
import ItemGrid from '../items/ItemGrid.jsx'

export default function Wishlist() {
    const [items, setItems] = useState([])

    async function getWishlist() {
        try {
            const result = await fetchWishlist()
            setItems(result)
        } catch (error) {
            console.error('Error fetching wishlist:', error)
        }
    }

    useEffect(() => {
        getWishlist()
    }, [])

    return (
        <div className="itemsList">
            {items.length > 0 && <ItemGrid items={items} />}
        </div>
    )
}
