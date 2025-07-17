import { useEffect, useState } from 'react'
import { loadAllItems } from '../../api.js'
import IsLoading from '../isLoading/IsLoading.jsx'
import ItemCard from './ItemCard.jsx'

export default function ItemsList() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const result = await loadAllItems()
                setItems(result.slice(0, 15))
            } catch (error) {
                console.error('Error getting data from DB', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {isLoading && <IsLoading />}
            {items.length > 0 &&
                items
                    .slice(0, 10)
                    .map((item) => <ItemCard key={item.id} item={item} />)}
        </>
    )
}
