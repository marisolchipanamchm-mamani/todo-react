const API_URL = 'http://localhost:8000/api';

export async function getAll() {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error('Error al obtener las categorías');
  }

  return await response.json();
}