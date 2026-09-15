import { apiFetch } from './api'

export async function getAll() {
  return await apiFetch('/tasks')
}

export async function create(tarea) {
  return await apiFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify(tarea),
  })
}

export async function getById(id) {
  return await apiFetch(`/tasks/${id}`)
}

export async function update(id, tarea) {
  return await apiFetch(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tarea),
  })
}
export async function remove(id) {
  return await apiFetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
}