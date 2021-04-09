import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ProductCard, SearchInput } from '../../components'

import { getProducts } from '../../services'
import { admin, text } from '../../styles'

const Products: React.FC = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function loadProducts() {
    setIsLoading(true)

    const result = await getProducts()
    setProducts(result.data.content)
    // console.log(result.data.content)

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
    <ScrollView contentContainerStyle={ admin.container }>
      <TouchableOpacity style={ admin.addButton }>
        <Text style={ text.addButtonText }>Adicionar</Text>
      </TouchableOpacity>

      <SearchInput
        search={ search }
        setSearch={ setSearch }
        placeholder="Nome do produto"
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) :
      data.map((product) => (
        <ProductCard key={product.id} {...product} role="admin" />
      ))}
    </ScrollView>
  )
}

export default Products