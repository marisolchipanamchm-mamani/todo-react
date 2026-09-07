const API_URL = 'http://localhost:8000/api'

export async function getAll() {
  const response = await fetch(`${API_URL}/tags`)

  if (!response.ok) {
    throw new Error('Error al obtener las etiquetas')
  }

  return await response.json()
}

export async function create(etiqueta) {
  const response = await fetch(`${API_URL}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(etiqueta),
  })

  if (!response.ok) {
    throw new Error('Error al crear la etiqueta')
  }

  return await response.json()
}