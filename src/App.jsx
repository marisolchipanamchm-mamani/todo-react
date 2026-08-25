import { useEffect, useState } from 'react'
import { getAll, getById } from './services/tarea.service'

function App() {
  const [tareas, setTareas] = useState([])

  useEffect(() => {
   getById(13)
  .then((data) => {
    console.log('TAREA POR ID:', data)
  })
  .catch((error) => {
    console.error('ERROR GET BY ID:', error)
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