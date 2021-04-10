import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'
import { text, theme } from '../styles'

interface ProductProps {
  id: Number
  name: String
  imgUrl: ImageSourcePropType
  price: Number
  role?: string
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price, role }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={ theme.productCard }
      onPress={ () => navigation.navigate('ProductDetails', { id }) }
    >
      <Image source={{ uri: imgUrl }} style={ theme.productImg } />
      <View style={ theme.productDescription }>
        <Text style={ text.productName }>{ name }</Text>

        <View style={ theme.priceContainer }>
          <Text style={ text.currency }>R$</Text>
          <Text style={ text.productPrice }>{ price }</Text>
        </View>

        {role === 'admin' && (
          <View style={ theme.buttonContainer }>
            <TouchableOpacity style={ theme.deleteButton }>
              <Text style={ text.deleteButtonText }>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ theme.editButton }>
              <Text style={ text.editButtonText }>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard