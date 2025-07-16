import './App.css'
import { helloWorld } from "./api.js";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await helloWorld();
        console.log(JSON.stringify(result));
        setData(result);
      } catch (error) {
        console.error("Error fetching hello world:", error);
        setData("Error fetching data");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

export default App;