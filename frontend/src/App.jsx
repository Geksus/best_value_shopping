import './App.css'
import { Route, Routes, Outlet } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import ItemsList from './components/items/ItemsList.jsx'
import Header from './components/header/Header.jsx'

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
                {/* Add more routes here as needed */}
            </Route>
        </Routes>
    )
}

export default App
