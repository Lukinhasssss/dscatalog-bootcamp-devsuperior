import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import { text, theme } from '../styles'

interface ProductProps {
  id: number
  name: string
  imgUrl: string
  price: string
  role?: string
  handleOnDelete: Function
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price, role, handleOnDelete }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={ theme.productCard }
      onPress={ () => role ? '' : navigation.navigate('ProductDetails', { id }) }
    >
      <Image source={{ uri: imgUrl }} style={ theme.productImg } />
      <View style={ theme.productDescription }>
        <Text style={ text.productName }>{ name }</Text>

        <View style={ theme.priceContainer }>
          <Text style={ text.currency }>R$</Text>
          <TextInputMask
            type={ 'money' }
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: ' ',
              suffixUnit: ''
            }}
            value={ price }
            editable={ false }
            style={ text.productPrice }
          />
          {/* <Text style={ text.productPrice }>{ price }</Text> */}
        </View>

        {role === 'admin' && (
          <View style={ theme.buttonContainer }>
            <TouchableOpacity style={ theme.deleteButton } onPress={ () => handleOnDelete(id) }>
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