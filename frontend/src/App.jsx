import './App.css'
import { fetchItems } from "./api.js";
import { useEffect, useState } from "react";
import ItemsList from "./items/ItemsList.jsx";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <ItemsList items={data} />
    </>
  );
}

export default App;