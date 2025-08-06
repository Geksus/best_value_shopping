import { useEffect, useState } from 'react'
import { fetchWishlist, removeFromWishlist } from '../../api.js'
import '../../styles/items.css'
import WishlistItem from './WishlistItem.jsx'

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
                        />
                    ))}
            </div>
        </div>
    )
}
