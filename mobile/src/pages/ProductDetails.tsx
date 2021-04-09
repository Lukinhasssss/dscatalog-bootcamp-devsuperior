import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'

import { api } from '../services'
import { text, theme } from '../styles'

import arrow from '../assets/leftArrow.png'

const ProductDetails = ({ route: { params : { id } } }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
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

    const result = await api.get(`/products/${id}`)
    setProduct(result.data)

    setIsLoading(false)
  }

  useEffect(() => {
    loadProductData()
  }, [])

  return (
    <View style={ theme.detailsContainer }>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : 
        <View style={ theme.detailCard }>
          <TouchableOpacity style={ theme.goBackContainer } onPress={ () => navigation.goBack() }>
            <Image source={ arrow } />
            <Text style={ text.goBackText }>Voltar</Text>
          </TouchableOpacity>

          <View style={ theme.productImgContainer }>
            <Image
              source={{ uri: product.imgUrl }}
              style={{ width: 220, height: 220 }}
            />
          </View>
          <Text style={ text.productDetailsName }>{ product.name }</Text>
          <View style={ theme.priceContainer }>
            <Text style={ text.currency }>R$</Text>
            <Text style={ text.productPrice }>{ product.price }</Text>
          </View>

          <ScrollView style={ theme.scrollTextContainer }>
            <Text style={ text.productDescription }>{ product.description }</Text>
          </ScrollView>
        </View>
      }
    </View>
  )
}

export default ProductDetails