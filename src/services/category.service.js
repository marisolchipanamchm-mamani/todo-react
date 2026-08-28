const API_URL = 'http://localhost:8000/api'

export async function getAll() {
  const response = await fetch(`${API_URL}/categories`)

  if (!response.ok) {
    throw new Error('Error al obtener las categorías')
  }

  return await response.json()
}

export async function create(categoria) {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(categoria),
  })

  if (!response.ok) {
    throw new Error('Error al crear la categoría')
  }

  return await response.json()
}