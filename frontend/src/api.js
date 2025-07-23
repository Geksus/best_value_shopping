import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const VITE_IMG_URL_PREFIX = import.meta.env.VITE_IMG_URL_PREFIX

export async function fetchItems() {
    const response = await axios.get(`${API_URL}/`)
    return response.data
}

export async function loadAllItems() {
    const response = await axios.get(`${API_URL}/items`)
    return response.data
}

export async function fetchItemImage(id) {
    const response = await axios.get(`${API_URL}/item/${id}`)
    return response.data
}
