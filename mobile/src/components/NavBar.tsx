import { useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import menu from '../assets/menu.png'
import { nav } from '../styles'


const NavBar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()

  function navigate(path: any) {
    if (path) {
      setShowMenu(false)
      navigation.navigate(path)
    }
    setShowMenu(false)
  }

  return (
    <TouchableOpacity
      activeOpacity={ 0.8 }
      style={ nav.drawer }
      onPress={ () => setShowMenu(!showMenu) }
    >
      <Image source={ menu } />
      {showMenu && (
        <View style={ nav.options }>
          <TouchableNativeFeedback style={ nav.option } onPress={ () => navigate('Home') }>
            <Text
              style={[
                nav.textOption,
                route.name === 'Home' ? nav.textActive : null
              ]}
            >
              Home
            </Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback style={ nav.option } onPress={ () => navigate('Catalog') }>
            <Text
              style={[
                nav.textOption,
                route.name === 'Catalog' ? nav.textActive : null
              ]}
            >
              Catálogo
            </Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback style={ nav.option } onPress={ () => navigate('Admin') }>
            <Text
              style={[
                nav.textOption,
                route.name === 'Admin' ? nav.textActive : null
              ]}
            >
              Admin
            </Text>
          </TouchableNativeFeedback>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default NavBar