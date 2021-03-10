import { Router, Redirect, Route, Switch } from 'react-router-dom'

import Navbar from './core/components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetails from './pages/Catalog/components/ProductDetails'
import Admin from './pages/Admin'
import Auth from 'pages/Auth'
import history from 'core/utils/history'
import PrivateRoute from 'core/components/Routes/PrivateRoute'

const Routes = () => (
  <Router history={ history }>
    <Navbar />
    
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/products" exact>
        <Catalog />
      </Route>
      <Route path="/products/:productId">
        <ProductDetails />
      </Route>

      <Redirect from="/admin/auth" to="/admin/auth/login" exact />
      <Route path="/admin/auth">
        <Auth />
      </Route>

      <Redirect from="/admin" to="/admin/products" exact />
      <PrivateRoute path="/admin">
        <Admin />
      </PrivateRoute>
    </Switch>
  </Router>
)

export default Routes

// BrowserRouter --> Faz o encapsulamento de toda a aplicação, ou seja, vai gerenciar todas as rotas da aplicação
// Switch --> É o componente que decide qual rota deve ser renderizada
// Route --> Para definir a URL de cada rota na aplicação