import { useEffect, useState } from 'react'

import { getAll } from './services/tarea.service'

import {
  getAll as getCategorias,
  create as crearCategoria,
  update as actualizarCategoria,
  remove as eliminarCategoria
} from './services/category.service'
function App() {
  const [tareas, setTareas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [categoriaEditando, setCategoriaEditando] = useState(null)
  const [nombreCategoriaEditada, setNombreCategoriaEditada] = useState('')

  useEffect(() => {
    getAll()
      .then((data) => {
        console.log('DATOS RECIBIDOS:', data)
        setTareas(data.data)
      })
      .catch((error) => {
        console.error('ERROR:', error)
      })

    getCategorias()
      .then((data) => {
        console.log('CATEGORÍAS RECIBIDAS:', data)
        setCategorias(data.data)
      })
      .catch((error) => {
        console.error('ERROR CATEGORÍAS:', error)
      })
  }, [])
       const iniciarEdicionCategoria = (categoria) => {
       setCategoriaEditando(categoria)
        setNombreCategoriaEditada(categoria.name)
}
       const manejarActualizarCategoria = () => {
    if (!nombreCategoriaEditada.trim()) {
      alert('El nombre de la categoría es obligatorio')
      return
    }

    actualizarCategoria(categoriaEditando.id, {
      name: nombreCategoriaEditada
    })
      .then((data) => {
        console.log('CATEGORÍA ACTUALIZADA:', data)
        setCategoriaEditando(null)
        setNombreCategoriaEditada('')
        return getCategorias()
      })
      .then((data) => {
        setCategorias(data.data)
      })
      .catch((error) => {
        console.error('ERROR ACTUALIZAR CATEGORÍA:', error)
      })
  }
  const manejarEliminarCategoria = (id) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar esta categoría?'
    )

    if (!confirmar) {
      return
    }

    eliminarCategoria(id)
      .then(() => {
        console.log('CATEGORÍA ELIMINADA:', id)
        return getCategorias()
      })
      .then((data) => {
        setCategorias(data.data)
      })
      .catch((error) => {
        console.error('ERROR ELIMINAR CATEGORÍA:', error)
      })
  }

  return (
    <div>
      <h1>Lista de tareas</h1>

      {tareas.map((tarea) => (
        <div key={tarea.id}>
          <h2>{tarea.title}</h2>
          <p>{tarea.description}</p>
        </div>
      ))}

      <h1>Lista de categorías</h1>
      {categoriaEditando && (
  <div>
    <h2>Editar categoría</h2>

    <input
      type="text"
      value={nombreCategoriaEditada}
      onChange={(e) => setNombreCategoriaEditada(e.target.value)}
    />

    <button onClick={manejarActualizarCategoria}>
      Guardar cambios
    </button>

    <button onClick={() => {
      setCategoriaEditando(null)
      setNombreCategoriaEditada('')
    }}>
      Cancelar
    </button>
  </div>
)}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.name}</td>
               <td>
       <button onClick={() => iniciarEdicionCategoria(categoria)}>
          Editar
        </button>

        <button onClick={() => manejarEliminarCategoria(categoria.id)}>
         Eliminar
         </button>
         </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App