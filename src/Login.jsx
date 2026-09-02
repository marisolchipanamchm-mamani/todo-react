import { useState } from 'react'
import { login } from './services/auth.service'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const manejarLogin = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)

      window.location.href = '/'
    } catch (error) {
      console.error('ERROR LOGIN:', error)
      alert('Correo o contraseña incorrectos')
    }
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <form onSubmit={manejarLogin}>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login