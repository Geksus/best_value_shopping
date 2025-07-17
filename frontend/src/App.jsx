import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import ItemsList from './components/items/ItemsList.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemsList />} />
        </Routes>
    )
}

export default App
