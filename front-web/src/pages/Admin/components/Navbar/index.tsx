import { NavLink } from 'react-router-dom'

import { isAllowedByRole } from 'core/utils/auth'

import './styles.scss'

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <NavLink to="/admin/products" className="admin-nav-item">
            Meus Produtos
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="admin-nav-item">
            Minhas Categorias
          </NavLink>
        </li>
        {isAllowedByRole(['ROLE_ADMIN']) && (
          <li>
            <NavLink to="/admin/users" className="admin-nav-item">
              Meus Usuários
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

/* O NavLink coloca por padrão a classe active e para alterar é só alterar o activeClassName */