import { useEffect, useState } from 'react'
import { getAll } from './services/tarea.service'
import { getAll as getCategorias, create as crearCategoria } from './services/category.service'

function App() {
  const [tareas, setTareas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [nombreCategoria, setNombreCategoria] = useState('')

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
  const manejarCrearCategoria = () => {
  if (!nombreCategoria.trim()) {
    alert('El nombre de la categoría es obligatorio')
    return
  }

  crearCategoria({
    name: nombreCategoria
  })
    .then((data) => {
      console.log('CATEGORÍA CREADA:', data)
      setNombreCategoria('')
      return getCategorias()
    })
    .then((data) => {
      setCategorias(data.data)
    })
    .catch((error) => {
      console.error('ERROR CREAR CATEGORÍA:', error)
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
      <input
        type="text"
       placeholder="Nombre de la categoría"
       value={nombreCategoria}
       onChange={(e) => setNombreCategoria(e.target.value)}
     />

     <button onClick={manejarCrearCategoria}>
      Crear categoría
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App