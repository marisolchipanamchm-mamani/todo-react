const API_URL = 'http://localhost:8000/api';

export async function getAll() {
  const response = await fetch(`${API_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Error al obtener las tareas');
  }

  return await response.json();
}

export async function getById(id) {
  const response = await fetch(`${API_URL}/tasks/${id}`);

  if (!response.ok) {
    throw new Error('Error al obtener la tarea');
  }

  return await response.json();
}