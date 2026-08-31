const API_URL = 'http://localhost:8000/api'

export async function getAll() {
  const response = await fetch(`${API_URL}/tags`)

  if (!response.ok) {
    throw new Error('Error al obtener las etiquetas')
  }

  return await response.json()
}