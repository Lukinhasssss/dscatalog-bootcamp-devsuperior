import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProductCard from './components/ProductCard'
import { makeRequest } from '../../core/utils/request'
import { ProductsResponse } from '../../core/types/Product'

import './styles.scss'

const Catalog = () => {
  // Populando um estado no componente e listando os produtos dinâmicamente (quando a lista de produtos estiver disponível)
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>()

  // Buscando a lista de produtos na inicialização do componente
  useEffect(() => {
    const params = {
      page: 0,
      linesPerPage: 12
    }

    makeRequest({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
  }) // O primeiro parâmetro é uma function e o segundo parâmetro é uma lista de dependências. Quando a lista está vazia significa que a função vai disparar assim que o componente iniciar

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">
        Catálogo de produtos
      </h1>
      <div className="catalog-products">
        {productsResponse?.content.map(product => ( // Esse .content.map só vai acontecer quando o valor do productResponse não for undefined
          <Link to={`/products/${product.id}`} key={ product.id }>
            <ProductCard product={ product } />
          </Link>
        ))}
      </div>
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