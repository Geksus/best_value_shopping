import {useEffect, useState} from "react";
import {loadAllItems} from "../api.js";

export default function ItemsList({data}) {
    const [items, setItems] = useState(data)

    useEffect(() => {
        const fetchData = async () => {
            const result = await loadAllItems();
            setItems(result);
        }
        fetchData();
    }, [])

    return (
        <>
        {items?.slice(0, 10).map((item) => (
            <p key={item.id}>{JSON.stringify(item.title)}</p>
        ))}</>
    )
}