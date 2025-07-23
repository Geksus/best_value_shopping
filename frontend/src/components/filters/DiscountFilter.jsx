import { useEffect, useState } from 'react'

export default function DiscountFilter({ setDiscountRange }) {
    const [discount, setDiscount] = useState(0)

    function changeDiscount(val) {
        setDiscount(val)
    }

    useEffect(() => {
        setDiscountRange(discount)
    }, [discount])

    return (
        <>
            <span>Discount</span>
            <select
                className="categorySelector"
                value={discount}
                onChange={(event) =>
                    changeDiscount(parseInt(event.target.value))
                }
            >
                <option value={0}>None</option>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
                <option value={30}>30%</option>
                <option value={40}>40%</option>
                <option value={50}>50%</option>
                <option value={60}>60%</option>
                <option value={70}>70%</option>
                <option value={80}>80%</option>
                <option value={90}>90%</option>
            </select>
        </>
    )
}
