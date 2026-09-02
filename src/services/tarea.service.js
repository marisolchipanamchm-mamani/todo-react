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