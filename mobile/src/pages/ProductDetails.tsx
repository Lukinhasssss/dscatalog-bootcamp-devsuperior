import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'

import { api } from '../services'

import arrow from '../assets/arrow.png'
import { text, theme } from '../styles'
import { ScrollView } from 'react-native-gesture-handler'

const ProductDetails = ({ route: { params : {id } } }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    id: null,
    name: null,
    description: null,
    price: null,
    imgUrl: null,
    data: null,
    categories: []
  })

  async function loadProductData() {
    setIsLoading(true)

    const result = await api.get(`/products/3`)
    setProduct(result.data)
    console.log(result.data)

    setIsLoading(false)
  }

  useEffect(() => {
    loadProductData()
  }, [])

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : 
        <View>
          <TouchableOpacity>
            <Image source={ arrow } />
            <Text>Voltar</Text>
          </TouchableOpacity>

          <View>
            <Image
              source={ product.imgUrl }
              style={{ width: 150, height: 150 }}
            />
          </View>
          <Text>{ product.name }</Text>
          <View style={ theme.priceContainer }>
            <Text style={ text.currency }>R$</Text>
            <Text style={ text.productPrice }>{ product.price }</Text>
          </View>

          <ScrollView>
            <Text>{ product.description }</Text>
          </ScrollView>
        </View>
      }
    </View>
  )
}

export default ProductDetails