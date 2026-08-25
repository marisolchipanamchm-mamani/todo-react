import { useEffect, useState } from 'react'
import { getAll } from './services/tarea.service'

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