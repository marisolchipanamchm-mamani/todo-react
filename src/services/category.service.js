import { apiFetch } from './api'

export async function getAll() {
  return await apiFetch('/categories')
}

export async function create(categoria) {
  return await apiFetch('/categories', {
    method: 'POST',
    body: JSON.stringify(categoria),
  })
}

export async function update(id, categoria) {
  return await apiFetch(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoria),
  })
}

export async function remove(id) {
  return await apiFetch(`/categories/${id}`, {
    method: 'DELETE',
  })
}