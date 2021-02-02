import './styles.scss'

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <a href="#produtos" className="admin-nav-item active">Meus Produtos</a>
        </li>
        <li>
          <a href="categorias" className="admin-nav-item">Minhas Categorias</a>
        </li>
        <li>
          <a href="usuarios" className="admin-nav-item">Meus Usuários</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar