import ItemCard from './ItemCard.jsx'
import './items.css'

export default function ItemGrid({ items }) {
    return (
        <>
            <div className="itemGrid">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </>
    )
}
