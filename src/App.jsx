import { useEffect, useState } from 'react'
import { getAll, getById, create } from './services/tarea.service'

function App() {
  const [tareas, setTareas] = useState([])

  useEffect(() => {
    getAll()
      .then((data) => {
        console.log('DATOS RECIBIDOS:', data)
        setTareas(data.data)
      })
      .catch((error) => {
        console.error('ERROR:', error)
      })

    getById(13)
      .then((data) => {
        console.log('TAREA POR ID:', data)
      })
      .catch((error) => {
        console.error('ERROR GET BY ID:', error)
      })

    create({
      title: 'Tarea creada desde React',
      description: 'Prueba del método create',
      category_id: 4,
      completed: false,
    })
      .then((data) => {
        console.log('TAREA CREADA:', data)
      })
      .catch((error) => {
        console.error('ERROR CREATE:', error)
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
    </div>
  )
}

export default App