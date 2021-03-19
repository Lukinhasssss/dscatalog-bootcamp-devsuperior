import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

import ProductCard from './components/ProductCard'
import { makeRequest } from 'core/utils/request'
import { Category, ProductsResponse } from 'core/types/Product'
import ProductCardLoader from './components/Loaders/ProductCardLoader'
import Pagination from 'core/components/Pagination'
import ProductFilters from 'core/components/ProductFilters'

import './styles.scss'

const Catalog = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [activePage, setActivePage] = useState(0) // estado que vai representar qual é a página ativa
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>()

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 12,
      name: name,
      categoryId: category?.id
    }

    // Iniciando o Loader
    setIsLoading(true)

    makeRequest({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
      .finally(() => {
        // Finalizando o Loader
        setIsLoading(false)
      })
  }, [activePage, category?.id, name])

  // Buscando a lista de produtos na inicialização do componente
  useEffect(() => {
    getProducts()
  }, [getProducts]) // O primeiro parâmetro é uma function e o segundo parâmetro é uma lista de dependências. Quando a lista está vazia significa que a função vai disparar assim que o componente iniciar

  const handleChangeName = (name: string) => {
    setActivePage(0)
    setName(name)
  }

  const handleChangeCategory = (category: Category) => {
    setActivePage(0)
    setCategory(category)
  }

  const clearFilters = () => {
    setActivePage(0)
    setCategory(undefined)
    setName('')
  }

  return (
    <div className="catalog-container">
      <div className="d-flex justify-content-between">
        <h1 className="catalog-title">
          Catálogo de produtos
        </h1>
        <ProductFilters
          name={ name }
          category={ category as Category }
          handleChangeName={ handleChangeName }
          handleChangeCategory={ handleChangeCategory }
          clearFilters={ clearFilters }
        />
      </div>

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