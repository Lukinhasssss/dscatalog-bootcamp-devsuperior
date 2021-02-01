import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './core/components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetails from './pages/Catalog/components/ProductDetails'
import Admin from './pages/Admin'

const Routes = () => (
  <BrowserRouter>
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

      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Routes

// BrowserRouter --> Faz o encapsulamento de toda a aplicação, ou seja, vai gerenciar todas as rotas da aplicação
// Switch --> É o componente que decide qual rota deve ser renderizada
// Route --> Para definir a URL de cada rota na aplicação