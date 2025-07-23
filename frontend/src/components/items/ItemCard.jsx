import './items.css'

export default function ItemCard({ item }) {
    const imgFetchUrl = import.meta.env.VITE_IMG_URL_PREFIX

    return (
        <>
            <div className="itemCard">
                <div className="itemCardBody">
                    <div>
                        <img
                            src={imgFetchUrl + item.icon}
                            alt={item.displayRatio}
                            width={150}
                            height={150}
                        />
                    </div>
                    <div>
                        <div>
                            <h3>
                                {item.title} - {item.displayRatio}
                            </h3>
                        </div>
                        <div>
                            <p>
                                <span>Price: {item.price}</span>{' '}
                                {item.oldPrice && (
                                    <>
                                        <span>
                                            | Old price: {item.oldPrice}{' '}
                                        </span>
                                        <span>
                                            | Discount:{' '}
                                            {(
                                                100 -
                                                (item.price / item.oldPrice) *
                                                    100
                                            ).toFixed(2)}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
