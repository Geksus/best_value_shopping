import ItemCard from './ItemCard.jsx'

export default function ItemColumn({ items }) {
    return (
        <>
            <div className="itemColumn">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </>
    )
}
