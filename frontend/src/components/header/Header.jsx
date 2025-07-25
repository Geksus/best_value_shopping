import { useNavigate } from 'react-router-dom'
import './header.css'

export default function Header() {
    const navigate = useNavigate()
    return (
        <div className="header">
            <button onClick={() => navigate('/items')}>Items</button>
            <button onClick={() => navigate('/recipes')}>Recipes</button>
            <button onClick={() => navigate('/recipes')}>Add Recipe</button>
            <button onClick={() => navigate('/recipes')}>Want to buy</button>
        </div>
    )
}
