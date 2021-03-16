import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Card from '../Card'
import { makeRequest } from 'core/utils/request'
import { ProductsResponse } from 'core/types/Product'
import Pagination from 'core/components/Pagination'

const List = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [activePage, setActivePage] = useState(0) // estado que vai representar qual é a página ativa
  const history = useHistory()

  // Buscando a lista de produtos na inicialização do componente
  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      direction: 'DESC',
      orderBy: 'id'
    }

    // Iniciando o Loader
    setIsLoading(true)

    makeRequest({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
      .finally(() => {
        // Finalizando o Loader
        setIsLoading(false)
      })
  }, [activePage])

  const handleCreate = () => {
    history.push('/admin/products/create')
  }

  return (
    <div className="admin-products-list">
      <button
        className="btn btn-lg btn-primary border-radius-10"
        onClick={ handleCreate }
      >
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {productsResponse?.content.map(product => (
          <Card product={ product } key={ product.id } />
        ))}
        {productsResponse && (
          <Pagination
            totalPages={ productsResponse.totalPages }
            activePage={ activePage }
            onChange={ page => setActivePage(page) }
          />
        )}
      </div>
    </div>
  )
}

export default List