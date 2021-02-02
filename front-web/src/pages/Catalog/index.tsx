import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProductCard from './components/ProductCard'
import { makeRequest } from 'core/utils/request'
import { ProductsResponse } from 'core/types/Product'
import ProductCardLoader from './components/Loaders/ProductCardLoader'
import Pagination from 'core/components/Pagination'

import './styles.scss'

const Catalog = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [activePage, setActivePage] = useState(0) // estado que vai representar qual é a página ativa

  // Buscando a lista de produtos na inicialização do componente
  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 12
    }

    // Iniciando o Loader
    setIsLoading(true)

    makeRequest({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
      .finally(() => {
        // Finalizando o Loader
        setIsLoading(false)
      })
  }, [activePage]) // O primeiro parâmetro é uma function e o segundo parâmetro é uma lista de dependências. Quando a lista está vazia significa que a função vai disparar assim que o componente iniciar

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">
        Catálogo de produtos
      </h1>
      <div className="catalog-products">
        {isLoading ? <ProductCardLoader /> : (
          productsResponse?.content.map(product => ( // Esse .content.map só vai acontecer quando o valor do productResponse não for undefined
            <Link to={`/products/${product.id}`} key={ product.id }>
              <ProductCard product={ product } />
            </Link>
          ))
        )}
      </div>
      {productsResponse && (
        <Pagination
          totalPages={ productsResponse.totalPages }
          activePage={ activePage }
          onChange={page => setActivePage(page)}
        />
      )}
    </div>
  )
}

export default Catalog

/*
    Obs:

        Desvantagens do fetch:

          • Muito verboso
          • Não tem suporte nativo para ler o progresso de upload de arquivos
          • Não tem suporte nativo para enviar query strings
*/