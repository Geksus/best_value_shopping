import './App.css'
import { Route, Routes, Outlet } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import ItemsList from './components/items/ItemsList.jsx'
import Header from './components/header/Header.jsx'
import Wishlist from './components/wishlist/Wishlist.jsx'

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="items" element={<ItemsList />} />
                <Route path="categories" element={<ItemsList />} />
                <Route path="wishlist/" element={<Wishlist />} />
                {/* Add more routes here as needed */}
            </Route>
        </Routes>
    )
}

export default App
