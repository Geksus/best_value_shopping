import '../../styles/wishlist.css'

export default function WishlistItem({ item, deleteFromWishlist }) {
    const imgFetchUrl = import.meta.env.VITE_IMG_URL_PREFIX

    function calculatePricePerRatio(price, ratio) {
        if (ratio.endsWith('кг')) {
            return (price / ratio.slice(0, -2)).toFixed(2)
        }
        if (ratio.endsWith('г')) {
            return (price / (ratio.slice(0, -1) / 1000)).toFixed(2)
        }
        return false
    }

    return (
        <>
            <div className="wishlistItem-container">
                <div className="wishlistItem">
                    <img src={imgFetchUrl + item.icon} alt={item.title} />
                    <div className="wishlistItem-info">
                        <div className="wishlistItem-title">{item.title}</div>
                        <div className="wishlistItem-price">
                            {item.displayPrice} - {item.displayRatio}{' '}
                            {calculatePricePerRatio(
                                item.displayPrice,
                                item.ratio
                            ) && (
                                <span>
                                    {': '}
                                    {calculatePricePerRatio(
                                        item.displayPrice,
                                        item.displayRatio
                                    )}
                                    /{item.ratio}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => deleteFromWishlist(item.id)}>X</button>
            </div>
        </>
    )
}
