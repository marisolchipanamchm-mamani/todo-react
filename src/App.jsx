import { useEffect, useState } from 'react'
import { getAll } from './services/tarea.service'
import { getAll as getCategorias } from './services/category.service'

function App() {
  const [tareas, setTareas] = useState([])
  const [categorias, setCategorias] = useState([])

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