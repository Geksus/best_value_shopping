import { fetchItems } from '../../api.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './home.css'

export default function Home() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

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
        <>
            <button
                className={isLoading ? 'startButtonLoading' : 'startButton'}
                onClick={() => navigate('/items')}
            >
                {isLoading ? 'Loading...' : 'Start'}
            </button>
        </>
    )
}
