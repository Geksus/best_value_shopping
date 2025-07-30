import { fetchItems } from '../../api.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './home.css'

export default function Home() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const tilesPerRow = Math.ceil(window.innerWidth / 100)
    const tilesPerColumn = Math.ceil(window.innerHeight / 100)
    const totalTiles = tilesPerRow * tilesPerColumn

    // Generate array of tiles
    const tiles = Array.from({ length: totalTiles }, (_, index) => (
        <div key={index} className="grid-tile"></div>
    ))

    useEffect(() => {
        async function fetchData() {
            console.log('fetching data')
            try {
                setIsLoading(true)
                const result = await fetchItems()
                setData(result)
            } catch (error) {
                console.error('Error fetching hello world:', error)
                setData('Error fetching data')
            } finally {
                setIsLoading(false)
            }
        }
        if (!isLoading && data.length === 0) {
            fetchData()
        }
    }, [])

    return (
        <div className="home-container">
            <div className="home-background">{tiles}</div>
            <button
                className={isLoading ? 'startButtonLoading' : 'startButton'}
                onClick={() => navigate('/items')}
            >
                {isLoading ? 'Loading...' : 'Start'}
            </button>
        </div>
    )
}
