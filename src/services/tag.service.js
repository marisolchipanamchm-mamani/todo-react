import { apiFetch } from './api'

export async function getAll() {
  return await apiFetch('/tags')
}

export async function create(etiqueta) {
  return await apiFetch('/tags', {
    method: 'POST',
    body: JSON.stringify(etiqueta),
  })
}

export async function update(id, etiqueta) {
  return await apiFetch(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(etiqueta),
  })
}

export async function remove(id) {
  return await apiFetch(`/tags/${id}`, {
    method: 'DELETE',
  })
}