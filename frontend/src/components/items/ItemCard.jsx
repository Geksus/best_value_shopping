import '../../styles/items.css'
import reverseCategories from '../../assets/reverseCategories.js'
import { addToWishlist } from '../../api.js'

export default function ItemCard({ item }) {
    const imgFetchUrl = import.meta.env.VITE_IMG_URL_PREFIX

    function calculatePricePerRatio(price, ratio) {
        if (ratio.endsWith('кг')) {
            return (price / ratio.slice(0, -2)).toFixed(2)
        }
        if (ratio.endsWith('г')) {
            return (price / (ratio.slice(0, -1) / 1000)).toFixed(2)
        }
        return null
    }

    async function toWishlist(id) {
        return await addToWishlist({ id })
    }

    return (
        <>
            <div className="itemCard" onClick={() => toWishlist(item.id)}>
                <div className="itemCardBody">
                    <div className="itemCard-top">
                        <img
                            src={imgFetchUrl + item.icon}
                            alt={item.title}
                            width={100}
                            height={100}
                        />
                        {item.oldPrice && (
                            <div className="itemCard-discount">
                                <span>{item.discount}%</span>
                            </div>
                        )}
                    </div>
                    <div className="itemCard-bottom">
                        <h4>
                            {item.title} - {item.displayRatio}
                        </h4>
                        <p className="item-price">Price: {item.price}</p>
                        <p className="item-price">Old price: {item.oldPrice}</p>
                        {calculatePricePerRatio(
                            item.price,
                            item.displayRatio
                        ) && (
                            <p>
                                Price per kg:{' '}
                                {calculatePricePerRatio(
                                    item.price,
                                    item.displayRatio
                                )}
                            </p>
                        )}
                    </div>
                </div>
                <div className="item-card-footer">
                    <p>{reverseCategories[item.sectionSlug]}</p>
                </div>
            </div>
        </>
    )
}
