import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchItems() {
    const response = await axios.get(`${API_URL}/`)
    return response.data
}

export async function loadAllItems() {
    const response = await axios.get(`${API_URL}/items`)
    return response.data
}

export async function fetchCategories() {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
}

export async function fetchWishlist() {
    const response = await axios.get(`${API_URL}/wishlist`)
    return response.data
}

export async function addToWishlist(id) {
    const response = await axios.post(`${API_URL}/wishlist/${id.id}`, { id })
    return response.status
}

export async function removeFromWishlist(id) {
    const response = await axios.delete(`${API_URL}/wishlist/${id}`, { id })
    return response.status
}
