import { useHistory } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Card from '../Card'
import { makePrivateRequest, makeRequest } from 'core/utils/request'
import { Category, ProductsResponse } from 'core/types/Product'
import Pagination from 'core/components/Pagination'
import CardLoader from '../Loaders/ProductCardLoader'
import ProductFilters from 'core/components/ProductFilters'

const List = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [activePage, setActivePage] = useState(0) // estado que vai representar qual é a página ativa
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>()
  const history = useHistory()

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      name: name,
      categoryId: category?.id,
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
  }, [activePage, category?.id, name])

  // Buscando a lista de produtos na inicialização do componente
  useEffect(() => {
    getProducts()
  }, [getProducts])

  const handleCreate = () => {
    history.push('/admin/products/create')
  }

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

  const onRemove = (productId: number) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este produto?')

    if (confirm) {
      makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
        .then(() => {
          toast.info('Produto excluído com sucesso!')
          getProducts()
        })
        .catch(() => {
          toast.error('Erro ao excluir o produto!')
        })
    }
  }

  return (
    <div className="admin-products-list">
      <div className="d-flex justify-content-between admin-filter-button-add">
        <button
          className="btn btn-lg btn-primary border-radius-10 mr-3"
          onClick={ handleCreate }
        >
          ADICIONAR
        </button>
        <ProductFilters
          name={ name }
          category={ category as Category }
          handleChangeName={ handleChangeName }
          handleChangeCategory={ handleChangeCategory }
          clearFilters={ clearFilters }
        />
      </div>

      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          productsResponse?.content.map(product => (
            <Card product={ product } key={ product.id } onRemove={ onRemove } />
          ))
        )}
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