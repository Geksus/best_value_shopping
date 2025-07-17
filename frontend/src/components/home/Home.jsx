import {fetchItems} from "../../api.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const result = await fetchItems();
                setData(result);
            } catch (error) {
                console.error("Error fetching hello world:", error);
                setData("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        }
        if (!isLoading && data === "") {
            fetchData();
        }
    }, []);

    return (
        <>
            <button onClick={() => navigate('/items')}>Start</button>
        </>
    );
}