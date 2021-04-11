import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ProductCard, SearchInput } from '../../../components'

import { deleteProduct, getProducts } from '../../../services'
import { admin, text } from '../../../styles'

interface ProductProps {
  setScreen: Function
}

const Products: React.FC<ProductProps> = (props) => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { setScreen } = props

  async function handleOnDelete(id: number) {
    setIsLoading(true)

    const response = await deleteProduct(id)
    loadProducts()

    setIsLoading(false)
  }

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
      <TouchableOpacity style={ admin.addButton } onPress={ () => setScreen('newProduct') }>
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
      data.map((product) => {
        const { id } = product
        return (
          <ProductCard
            { ...product }
            key={ id }
            role="admin"
            handleOnDelete={ handleOnDelete }
          />
        )
      })}
    </ScrollView>
  )
}

export default Products