import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <nav>
      <ul >
        <li onClick={() => navigate('/')}><strong>Brand</strong></li>
      </ul>
      <ul>
        <li><a href="#">Lista de estudiantes</a></li>
      </ul>
    </nav>
  )
}
