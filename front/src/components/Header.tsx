import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <nav>
      <ul >
        <li onClick={() => navigate('/')}><strong>Brand</strong></li>
      </ul>
      <ul>
        <Link to='/table-register'>
          <li>
            Lista de estudiantes
          </li>
        </Link>
      </ul>
    </nav>
  )
}
