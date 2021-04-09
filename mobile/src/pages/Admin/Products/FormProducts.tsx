import React, { useState } from 'react'
import { ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { text, theme } from '../../../styles'

import arrow from '../../../assets/leftArrow.png'
import { useNavigation } from '@react-navigation/core'

const FormProduct = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState([
    {
      id: 3,
      name: 'Computadores'
    },
    {
      id: 2,
      name: 'Eletrônicos'
    },
    {
      id: 1,
      name: 'Livros'
    }
  ])
  const [showCategories, setShowCategories] = useState(false)
  const [product, setProduct] = useState({
    name: null,
    descrition: null,
    imgUrl: null,
    price: null,
    categories: null
  })

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Modal
            visible={ showCategories }
            animationType="fade"
            transparent={ true }
            presentationStyle="overFullScreen"
          >
            <View>
              <ScrollView>
                {categories.map((category) => (
                  <TouchableOpacity key={ category.id }>
                    <Text>{ category.name }</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>

          <TouchableOpacity style={ theme.goBackContainer } onPress={ () => navigation.goBack() }>
            <Image source={ arrow } />
            <Text style={ text.goBackText }>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default FormProduct