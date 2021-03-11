import history from 'core/utils/history'
import Auth from 'pages/Auth'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import Navbar from './core/components/Navbar'
import Admin from './pages/Admin'
import Catalog from './pages/Catalog'
import ProductDetails from './pages/Catalog/components/ProductDetails'
import Home from './pages/Home'


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

      <Redirect from="/auth" to="/auth/login" exact />
      <Route path="/auth">
        <Auth />
      </Route>

      <Redirect from="/admin" to="/admin/products" exact />
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
)

export default Routes

// BrowserRouter --> Faz o encapsulamento de toda a aplicação, ou seja, vai gerenciar todas as rotas da aplicação
// Switch --> É o componente que decide qual rota deve ser renderizada
// Route --> Para definir a URL de cada rota na aplicação