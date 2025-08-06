import '../../styles/wishlist.css'
import WishlistSummary from './WishlistSummary.jsx'

export default function WishlistItem({
    item,
    deleteFromWishlist,
    totals,
    setTotals,
}) {
    const imgFetchUrl = import.meta.env.VITE_IMG_URL_PREFIX

    return (
        <>
            <div className="wishlistItem-container">
                <div className="wishlistItem">
                    <img src={imgFetchUrl + item.icon} alt={item.title} />
                    <div className="wishlistItem-info">
                        <div className="wishlistItem-title">{item.title}</div>
                        <div className="wishlistItem-price">
                            {item.displayPrice} грн. / {item.displayRatio}
                        </div>
                    </div>
                </div>
                <WishlistSummary
                    item={item}
                    totals={totals}
                    setTotals={setTotals}
                />
                <button
                    className="wishlistRemoveButton"
                    onClick={() => deleteFromWishlist(item.id)}
                >
                    X
                </button>
            </div>
        </>
    )
}
