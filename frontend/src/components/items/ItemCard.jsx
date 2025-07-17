import './items.css'
import path from 'path'
import { useEffect } from 'react'
import { fetchItemImage } from '../../api.js'

export default function ItemCard({ item }) {
    const saveFolderPath = import.meta.env.VITE_IMG_FOLDER_PATH
    const imgFetchUrl = import.meta.env.VITE_IMG_URL_PREFIX

    useEffect(() => {
        fetchItemImage(item.icon)
    }, [])

    return (
        <>
            <div className="itemCard">
                <div className="itemCardBody">
                    <div>
                        <img
                            src={saveFolderPath + imgFetchUrl}
                            alt={item.displayRatio}
                            width={50}
                            height={50}
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
                                <span>Price: {item.displayPrice}</span>{' '}
                                {item.oldPrice && (
                                    <>
                                        <span>
                                            | Old price: {item.oldPrice}{' '}
                                        </span>
                                        <span>
                                            | Discount:{' '}
                                            {(
                                                100 -
                                                (item.displayPrice /
                                                    item.oldPrice) *
                                                    100
                                            ).toFixed(2)}
                                        </span>
                                        <span>{JSON.stringify(item)}</span>
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
