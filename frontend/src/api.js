import axios from 'axios';

export async function helloWorld() {
  const response = await axios.get('http://localhost:5000/api/hello');
  return response.data;
}