import axios from 'axios';

export async function fetchItems() {
  const response = await axios.get('http://localhost:5000/');
  return response.data;
}

export async function loadAllItems() {
  const response = await axios.get('http://localhost:5000/items');
  console.log(response);
  return response.data;
}