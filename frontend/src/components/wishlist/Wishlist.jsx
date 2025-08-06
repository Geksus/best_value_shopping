import { useEffect, useState } from 'react'
import { fetchWishlist, removeFromWishlist } from '../../api.js'
import '../../styles/items.css'
import WishlistItem from './WishlistItem.jsx'

export default function Wishlist() {
    const [items, setItems] = useState([])
    const [totals, setTotals] = useState({})

    async function getWishlist() {
        try {
            const result = await fetchWishlist()
            setItems(result)
        } catch (error) {
            console.error('Error fetching wishlist:', error)
        }
    }

    async function deleteFromWishlist(id) {
        const result = await removeFromWishlist(id)
        if (result) {
            getWishlist()
        }
    }

    useEffect(() => {
        getWishlist()
    }, [])

    return (
        <div className="container">
            <div className="wishlist">
                {items.length > 0 &&
                    items.map((item) => (
                        <WishlistItem
                            key={item.id}
                            item={item}
                            deleteFromWishlist={deleteFromWishlist}
                            totals={totals}
                            setTotals={setTotals}
                        />
                    ))}
                <div>
                    <span>
                        {Object.values(totals)
                            .map((a) => parseFloat(a))
                            .reduce((a, b) => a + b, 0)
                            .toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}
