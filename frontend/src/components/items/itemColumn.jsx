import ItemCard from './ItemCard.jsx'
import reversedCategories from '../../assets/reverseCategories.js'

export default function ItemColumn({ items }) {
    return (
        <>
            <div className="itemColumn">
                {items[0]?.sectionSlug && (
                    <div className="itemColumnHeader">
                        {reversedCategories[items[0].sectionSlug]}
                    </div>
                )}
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </>
    )
}
