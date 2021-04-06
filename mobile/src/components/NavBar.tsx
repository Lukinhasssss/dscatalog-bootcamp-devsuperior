import { useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
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
          <TouchableOpacity>
            <Text>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Catálogo</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Admin</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default NavBar