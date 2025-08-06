import { useEffect, useState } from 'react'

export default function WishlistSummary({ item, totals, setTotals }) {
    const [pricePerRatio, setPricePerRatio] = useState(NaN)
    const [displayRatio, setDisplayRatio] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)

    function calculatePricePerRatio(price, ratio) {
        let ppr = NaN
        if (ratio.toLowerCase().endsWith('л')) {
            ppr = (price / ratio.slice(0, -1).replace(',', '.')).toFixed(2)
        }
        if (ratio.toLowerCase().endsWith('кг')) {
            ppr = (price / ratio.slice(0, -2)).toFixed(2)
        }
        if (ratio.toLowerCase().endsWith('г')) {
            ppr = (
                price /
                (ratio.slice(0, -1).replace(',', '.') / 1000)
            ).toFixed(2)
        }
        setPricePerRatio(ppr)
    }

    function defineDisplayRatio(ratio) {
        let currentRatio = ''
        if (ratio.toLowerCase().endsWith('г')) {
            currentRatio = 'кг'
        }
        if (ratio.toLowerCase().endsWith('л')) {
            currentRatio = 'л'
        }
        setDisplayRatio(currentRatio)
    }

    function calculateTotal() {
        let total = 0
        if (item.ratio === 'шт') {
            total = parseFloat(item.displayPrice) * Math.round(quantity)
        }
        if (item.ratio === 'кг') {
            total = pricePerRatio * quantity
        }
        setTotal(parseFloat(total).toFixed(2))
    }

    function handleTotalsChange() {
        setTotals((prevTotals) => ({
            ...prevTotals,
            [item.title]: total,
        }))
    }

    useEffect(() => {
        calculatePricePerRatio(item.displayPrice, item.displayRatio)
        defineDisplayRatio(item.displayRatio)
    }, [item.displayPrice, item.displayRatio])

    useEffect(() => {
        calculateTotal()
    }, [pricePerRatio, quantity, item.ratio, item.displayPrice])

    useEffect(() => {
        handleTotalsChange()
    }, [total])

    return (
        <>
            {pricePerRatio && (
                <div>
                    <div>
                        <span>
                            Price: {pricePerRatio} /{displayRatio}
                        </span>
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity.isNaN ? '' : quantity}
                            onChange={(event) =>
                                setQuantity(event.target.value)
                            }
                        />
                        <span> {item.ratio}</span>
                    </div>
                    <div>Total: {total} грн.</div>
                </div>
            )}
        </>
    )
}
