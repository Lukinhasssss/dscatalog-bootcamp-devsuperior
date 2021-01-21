import './styles.scss'

const Navbar = () => (
  <nav className="row bg-primary main-nav">
    <div className="col-2">
      <a href="#home" className="nav-logo-text">
        <h4>DS Catalog</h4>
      </a>
    </div>
    <div className="col-6 offset-2">
      <ul className="main-menu">
        <li>
          <a href="#home" className="active">
            HOME
          </a>
        </li>
        <li>
          <a href="#catalogo">
            CATÁLOGO
          </a>
        </li>
        <li>
          <a href="#admin">
            ADMIN
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar

// offset-2 --> Adiciona um recuo a esquerda de duas colunas