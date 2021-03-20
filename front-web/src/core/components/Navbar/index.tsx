import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getAccessTokenDecoded, logout } from 'core/utils/auth'
import menu from 'core/assets/images/menu.svg'

import './styles.scss'

const Navbar = () => {
  const [isDrawerActive, setIsDrawerActive] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const location = useLocation()

  useEffect(() => {
    const currentUserData = getAccessTokenDecoded()
    setCurrentUser(currentUserData.user_name)
  }, [location])

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    logout()
  }

  return (
    <nav className="row bg-primary main-nav">
      <Link to="/" className="nav-logo-text">
        <h4>DS Catalog</h4>
      </Link>
      <button
        type="button"
        className="menu-mobile-button"
        onClick={ () => setIsDrawerActive(!isDrawerActive) }
      >
        <img src={ menu } alt="Menu Mobile"/>
      </button>

      <div className={ isDrawerActive ? "menu-mobile-container" : "menu-container" }>
        <ul className="main-menu">
          <li>
            <NavLink
              to="/"
              activeClassName="active"
              exact className="nav-link"
              onClick={ () => setIsDrawerActive(false) }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              activeClassName="active"
              className="nav-link"
              onClick={ () => setIsDrawerActive(false) }
            >
              CATÁLOGO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              activeClassName="active"
              className="nav-link"
              onClick={ () => setIsDrawerActive(false) }
            >
              ADMIN
            </NavLink>
          </li>
          {isDrawerActive && (
            <li>
              {currentUser && (
                <a href="#logout" className="nav-link active d-inline" onClick={ () => setIsDrawerActive(false) }>
                  {`LOGOUT - ${currentUser}`}
                </a>
              )}
            </li>
          )}
          {isDrawerActive && (
            <>
              {!currentUser && (
                <li>
                  <Link to="/auth/login" className="nav-link active" onClick={ () => setIsDrawerActive(false) }>
                    LOGIN
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>

      <div className="user-info-dnone text-right">
        {currentUser && (
          <>
            { currentUser }
            <a
              href="#logout"
              className=" nav-link active d-inline"
              onClick={(event) => {
                setIsDrawerActive(false)
                handleLogout(event)
              }}
            >
              LOGOUT
            </a>
          </>
        )}
        {!currentUser && (
          <Link to="/auth/login" className="nav-link active" onClick={ () => setIsDrawerActive(false) }>
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar

// offset-2 --> Adiciona um recuo a esquerda de duas colunas
// activeClassName="active" --> Desta forma o próprio react router vai saber qual link estará ativo