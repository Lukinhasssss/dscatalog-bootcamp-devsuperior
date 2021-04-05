import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'

import { ProductCard, SearchInput } from '../components'
import { api } from '../services'

import { theme } from '../styles'

const Catalog: React.FC = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  async function loadProducts() {
    setIsLoading(true)

    const result = await api.get('/products')
    setProducts(result.data.content)
    // console.warn(result)

    setIsLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const data =
    search.length > 0
      ? products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
      : products

  return (
    <ScrollView contentContainerStyle={ theme.scrollContainer }>
      <SearchInput
        placeholder="Nome do produto"
        search={ search }
        setSearch={ setSearch }
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) :
      data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ScrollView>
  )
}

export default Catalog