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
const [error, setError] = useState(null)
const [categoriaAEliminar, setCategoriaAEliminar] = useState(null)
const [etiquetaAEliminar, setEtiquetaAEliminar] = useState(null)
const [categoriaEditando, setCategoriaEditando] = useState(null)
const [nombreCategoriaEditada, setNombreCategoriaEditada] = useState('')

useEffect(() => {
getAll()
.then((data) => {
setTareas(data.data)
})
.catch((error) => {
console.error('ERROR:', error)
setError(error.message)
})


getCategorias()
  .then((data) => {
    setCategorias(data.data)
  })
  .catch((error) => {
    console.error('ERROR CATEGORÍAS:', error)
    setError(error.message)
  })

getEtiquetas()
  .then((data) => {
    setEtiquetas(data.data)
  })
  .catch((error) => {
    console.error('ERROR ETIQUETAS:', error)
    setError(error.message)
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

const manejarCrearCategoria = () => {
  if (!nombreCategoria.trim()) {
    alert('El nombre de la categoría es obligatorio')
    return
  }

  crearCategoria({
    name: nombreCategoria
  })
    .then(() => {
      setNombreCategoria('')
      return getCategorias()
    })
    .then((data) => {
      setCategorias(data.data)
    })
    .catch((error) => {
      console.error('ERROR CREAR CATEGORÍA:', error)
      setError(error.message)
    })
}

const manejarActualizarCategoria = () => {
if (!nombreCategoriaEditada.trim()) {
alert('El nombre de la categoría es obligatorio')
return
}


actualizarCategoria(categoriaEditando.id, {
  name: nombreCategoriaEditada
})
  .then(() => {
    setCategoriaEditando(null)
    setNombreCategoriaEditada('')
    return getCategorias()
  })
  .then((data) => {
    setCategorias(data.data)
  })
  .catch((error) => {
    console.error('ERROR ACTUALIZAR CATEGORÍA:', error)
    setError(error.message)
  })


}

const manejarEliminarEtiqueta = (id) => {
setEtiquetaAEliminar(id)
}

const confirmarEliminarEtiqueta = () => {
eliminarEtiqueta(etiquetaAEliminar)
.then(() => {
return getEtiquetas()
})
.then((data) => {
setEtiquetas(data.data)
setEtiquetaAEliminar(null)
})
.catch((error) => {
console.error('ERROR ELIMINAR ETIQUETA:', error)
setError(error.message)
setEtiquetaAEliminar(null)
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
  .then(() => {
    setEtiquetaEditando(null)
    setNombreEtiquetaEditada('')
    return getEtiquetas()
  })
  .then((data) => {
    setEtiquetas(data.data)
  })
  .catch((error) => {
    console.error('ERROR ACTUALIZAR ETIQUETA:', error)
    setError(error.message)
  })


}

const manejarEliminarCategoria = (id) => {
setCategoriaAEliminar(id)
}

const confirmarEliminarCategoria = () => {
eliminarCategoria(categoriaAEliminar)
.then(() => {
return getCategorias()
})
.then((data) => {
setCategorias(data.data)
setCategoriaAEliminar(null)
})
.catch((error) => {
console.error('ERROR ELIMINAR CATEGORÍA:', error)
setError(error.message)
setCategoriaAEliminar(null)
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
  .then(() => {
    setNombreEtiqueta('')
    return getEtiquetas()
  })
  .then((data) => {
    setEtiquetas(data.data)
  })
  .catch((error) => {
    console.error('ERROR CREAR ETIQUETA:', error)
    setError(error.message)
  })


}

const manejarVerTarea = (id) => {
getById(id)
.then((data) => {
setTareaSeleccionada(data.data)
})
.catch((error) => {
console.error('ERROR OBTENER TAREA:', error)
setError(error.message)
})
}

const indiceUltimaTarea = paginaActual * tareasPorPagina
const indicePrimeraTarea = indiceUltimaTarea - tareasPorPagina

const tareasActuales = tareas.slice(
indicePrimeraTarea,
indiceUltimaTarea
)

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
  .then(() => {
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
    setError(error.message)
   })
  }
const cerrarSesion = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'

}

return ( <div>
{error && ( <div> <p>{error}</p>


      <button onClick={() => setError(null)}>
        Cerrar
      </button>
    </div>
  )}

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
        {tareaSeleccionada.completed
          ? 'Completada'
          : 'Pendiente'}
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
            {tarea.completed
              ? 'Completada'
              : 'Pendiente'}
          </td>

          <td>
            <button
              onClick={() => manejarVerTarea(tarea.id)}
            >
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
      disabled={
        paginaActual === totalPaginas ||
        totalPaginas === 0
      }
    >
      Siguiente
    </button>
  </div>

  <h1>Lista de categorías</h1>

  <div>
  <h2>Crear categoría</h2>

  <input
    type="text"
    value={nombreCategoria}
    onChange={(e) => setNombreCategoria(e.target.value)}
    placeholder="Nombre de la categoría"
  />

  <button onClick={manejarCrearCategoria}>
    Crear categoría
  </button>
</div>

  {categoriaAEliminar && (
    <div>
      <h2>
        ¿Estás seguro de que deseas eliminar esta categoría?
      </h2>

      <button onClick={confirmarEliminarCategoria}>
        Sí, eliminar
      </button>

      <button
        onClick={() => setCategoriaAEliminar(null)}
      >
        Cancelar
      </button>
    </div>
  )}

  {categoriaEditando && (
    <div>
      <h2>Editar categoría</h2>

      <input
        type="text"
        value={nombreCategoriaEditada}
        onChange={(e) =>
          setNombreCategoriaEditada(e.target.value)
        }
      />

      <button onClick={manejarActualizarCategoria}>
        Guardar cambios
      </button>

      <button
        onClick={() => {
          setCategoriaEditando(null)
          setNombreCategoriaEditada('')
        }}
      >
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
            <button
              onClick={() =>
                iniciarEdicionCategoria(categoria)
              }
            >
              Editar
            </button>

            <button
              onClick={() =>
                manejarEliminarCategoria(categoria.id)
              }
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <h1>Lista de etiquetas</h1>

  {etiquetaAEliminar && (
    <div>
      <h2>
        ¿Estás seguro de que deseas eliminar esta etiqueta?
      </h2>

      <button onClick={confirmarEliminarEtiqueta}>
        Sí, eliminar
      </button>

      <button
        onClick={() => setEtiquetaAEliminar(null)}
      >
        Cancelar
      </button>
    </div>
  )}

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
        onChange={(e) =>
          setNombreEtiquetaEditada(e.target.value)
        }
      />

      <button onClick={manejarActualizarEtiqueta}>
        Guardar cambios
      </button>

      <button
        onClick={() => {
          setEtiquetaEditando(null)
          setNombreEtiquetaEditada('')
        }}
      >
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
            <button
              onClick={() =>
                iniciarEdicionEtiqueta(etiqueta)
              }
            >
              Editar
            </button>

            <button
              onClick={() =>
                manejarEliminarEtiqueta(etiqueta.id)
              }
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button onClick={cerrarSesion}>
      Cerrar sesión
     </button>
</div>

)
}

export default App
