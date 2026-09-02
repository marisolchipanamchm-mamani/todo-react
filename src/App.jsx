import { useEffect, useState } from 'react'

import {
  getAll,
  create as crearTarea,
  getById
} from './services/tarea.service'

import {
  getAll as getCategorias,
  create as crearCategoria,
  update as actualizarCategoria,
  remove as eliminarCategoria
} from './services/category.service'

import {
  getAll as getEtiquetas,
  create as crearEtiqueta,
  update as actualizarEtiqueta,
  remove as eliminarEtiqueta
} from './services/tag.service'

function App() {
  const [tareas, setTareas] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const tareasPorPagina = 2
 const totalPaginas = Math.max(
  1,
  Math.ceil(tareas.length / tareasPorPagina)
)
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)
  const [tituloTarea, setTituloTarea] = useState('')
  const [descripcionTarea, setDescripcionTarea] = useState('')
  const [categoriaTarea, setCategoriaTarea] = useState('') 
  const [categorias, setCategorias] = useState([])
  const [etiquetas, setEtiquetas] = useState([])
  const [nombreEtiqueta, setNombreEtiqueta] = useState('')
  const [etiquetaEditando, setEtiquetaEditando] = useState(null)
  const [nombreEtiquetaEditada, setNombreEtiquetaEditada] = useState('')
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [categoriaEditando, setCategoriaEditando] = useState(null)
  const [nombreCategoriaEditada, setNombreCategoriaEditada] = useState('')

  useEffect(() => {
    getAll()
      .then((data) => {
        console.log('DATOS RECIBIDOS:', data)
        console.log('CANTIDAD DE TAREAS:', data.data.length)
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
      getEtiquetas()
        .then((data) => {
          console.log('ETIQUETAS RECIBIDAS:', data)
          setEtiquetas(data.data)
      })
      .catch((error) => {
       console.error('ERROR ETIQUETAS:', error)
       })

  }, [])
       const iniciarEdicionCategoria = (categoria) => {
       setCategoriaEditando(categoria)
        setNombreCategoriaEditada(categoria.name)
        }
       const iniciarEdicionEtiqueta = (etiqueta) => {
         setEtiquetaEditando(etiqueta)
         setNombreEtiquetaEditada(etiqueta.name)
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
      const manejarEliminarEtiqueta = (id) => {
       const confirmar = window.confirm(
       '¿Estás seguro de que deseas eliminar esta etiqueta?'
       )

       if (!confirmar) {
       return
       }

       eliminarEtiqueta(id)
       .then(() => {
       console.log('ETIQUETA ELIMINADA:', id)
        return getEtiquetas()
       })
       .then((data) => {
         setEtiquetas(data.data)
         })
        .catch((error) => {
         console.error('ERROR ELIMINAR ETIQUETA:', error)
        })
      }

    const manejarActualizarEtiqueta = () => {
  if (!nombreEtiquetaEditada.trim()) {
    alert('El nombre de la etiqueta es obligatorio')
    return
  }

  actualizarEtiqueta(etiquetaEditando.id, {
    name: nombreEtiquetaEditada
  })
    .then((data) => {
      console.log('ETIQUETA ACTUALIZADA:', data)
      setEtiquetaEditando(null)
      setNombreEtiquetaEditada('')
      return getEtiquetas()
    })
    .then((data) => {
      setEtiquetas(data.data)
    })
    .catch((error) => {
      console.error('ERROR ACTUALIZAR ETIQUETA:', error)
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
  const manejarCrearEtiqueta = () => {
  if (!nombreEtiqueta.trim()) {
    alert('El nombre de la etiqueta es obligatorio')
    return
  }

  crearEtiqueta({
    name: nombreEtiqueta
  })
    .then((data) => {
      console.log('ETIQUETA CREADA:', data)
      setNombreEtiqueta('')
      return getEtiquetas()
    })
    .then((data) => {
      setEtiquetas(data.data)
    })
    .catch((error) => {
      console.error('ERROR CREAR ETIQUETA:', error)
    })
}
const manejarVerTarea = (id) => {
  getById(id)
    .then((data) => {
      console.log('TAREA RECIBIDA:', data)
      setTareaSeleccionada(data.data)
    })
    .catch((error) => {
      console.error('ERROR OBTENER TAREA:', error)
      alert('No se pudo obtener la tarea')
    })
}
const indiceUltimaTarea = paginaActual * tareasPorPagina
const indicePrimeraTarea = indiceUltimaTarea - tareasPorPagina

const tareasActuales = tareas.slice(
  indicePrimeraTarea,
  indiceUltimaTarea
)



console.log('TOTAL TAREAS:', tareas.length)
console.log('TOTAL PÁGINAS:', totalPaginas)

const manejarCrearTarea = () => {
  if (!tituloTarea.trim()) {
    alert('El título de la tarea es obligatorio')
    return
  }

  if (!categoriaTarea) {
    alert('Debes seleccionar una categoría')
    return
  }

  crearTarea({
    title: tituloTarea,
    description: descripcionTarea,
    category_id: categoriaTarea,
    completed: false
  })
    .then((data) => {
      console.log('TAREA CREADA:', data)
      setTituloTarea('')
      setDescripcionTarea('')
      setCategoriaTarea('')
      return getAll()
    })
    .then((data) => {
      setTareas(data.data)
    })
    .catch((error) => {
      console.error('ERROR CREAR TAREA:', error)
    })
}
  return (
    <div>
      {tareaSeleccionada && (
  <div>
    <h2>Detalle de la tarea</h2>

    <p>
      <strong>ID:</strong> {tareaSeleccionada.id}
    </p>

    <p>
      <strong>Título:</strong> {tareaSeleccionada.title}
    </p>

    <p>
      <strong>Descripción:</strong> {tareaSeleccionada.description}
    </p>

    <p>
      <strong>Categoría:</strong>{' '}
      {tareaSeleccionada.category?.name}
    </p>

    <p>
      <strong>Estado:</strong>{' '}
      {tareaSeleccionada.completed ? 'Completada' : 'Pendiente'}
    </p>

    <button onClick={() => setTareaSeleccionada(null)}>
      Cerrar
    </button>
  </div>
)}
      <h1>Lista de tareas</h1>
      <div>
  <h2>Crear tarea</h2>

  <input
    type="text"
    value={tituloTarea}
    onChange={(e) => setTituloTarea(e.target.value)}
    placeholder="Título de la tarea"
  />

  <input
    type="text"
    value={descripcionTarea}
    onChange={(e) => setDescripcionTarea(e.target.value)}
    placeholder="Descripción de la tarea"
  />

  <select
    value={categoriaTarea}
    onChange={(e) => setCategoriaTarea(e.target.value)}
  >
    <option value="">Seleccionar categoría</option>

    {categorias.map((categoria) => (
      <option key={categoria.id} value={categoria.id}>
        {categoria.name}
      </option>
    ))}
  </select>

  <button onClick={manejarCrearTarea}>
    Crear tarea
  </button>
</div>
    <table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Título</th>
      <th>Descripción</th>
      <th>Estado</th>
       <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {tareasActuales.map((tarea) => (
      <tr key={tarea.id}>
        <td>{tarea.id}</td>
        <td>{tarea.title}</td>
        <td>{tarea.description}</td>
        <td>
          {tarea.completed ? 'Completada' : 'Pendiente'}
        </td>
        <td>
          <button onClick={() => manejarVerTarea(tarea.id)}>
           Ver
            </button>
           </td> 
      </tr>
    ))}
  </tbody>
</table>
   <div>
  <button
    onClick={() => setPaginaActual(paginaActual - 1)}
    disabled={paginaActual === 1}
  >
    Anterior
  </button>

  <span>
     Página {paginaActual} de {totalPaginas}
  </span>

  <button
  onClick={() => setPaginaActual(paginaActual + 1)}
  disabled={paginaActual === totalPaginas || totalPaginas === 0}
>
  Siguiente
</button>
</div>

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
       <h1>Lista de etiquetas</h1>
        <div>
  <input
    type="text"
    value={nombreEtiqueta}
    onChange={(e) => setNombreEtiqueta(e.target.value)}
    placeholder="Nombre de la etiqueta"
  />

  <button onClick={manejarCrearEtiqueta}>
    Crear etiqueta
  </button>
</div>
    {etiquetaEditando && (
  <div>
    <h2>Editar etiqueta</h2>

    <input
      type="text"
      value={nombreEtiquetaEditada}
      onChange={(e) => setNombreEtiquetaEditada(e.target.value)}
    />

    <button onClick={manejarActualizarEtiqueta}>
      Guardar cambios
    </button>

    <button onClick={() => {
      setEtiquetaEditando(null)
      setNombreEtiquetaEditada('')
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
          {etiquetas.map((etiqueta) => (
            <tr key={etiqueta.id}>
              <td>{etiqueta.id}</td>
              <td>{etiqueta.name}</td>
              <td>
               <button onClick={() => iniciarEdicionEtiqueta(etiqueta)}>
                 Editar
                 </button>

                      <button onClick={() => manejarEliminarEtiqueta(etiqueta.id)}>
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