import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

import { nav, text } from '../styles'
import menu from '../assets/menu.png'
import { doLogout, isAuthenticated } from '../services/auth'

const NavBar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()

  function navigate(path: any) {
    if (path) {
      setShowMenu(false)
      navigation.navigate(path)
    }
    setShowMenu(false)
  }

  async function isLogged() {
    const result = await isAuthenticated()

    result ? setAuthenticated(true) : setAuthenticated(false)
  }

  function logout() {
    doLogout()
    navigation.navigate('Login')
  }

  useEffect(() => {
    isLogged()
  }, [])

  return (
    <>
      {authenticated ? (
        <TouchableOpacity onPress={ () => logout() } style={ nav.logoutBtn }>
          <Text style={ text.logoutText }>Sair</Text>
        </TouchableOpacity>
      ) : (
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

              <TouchableNativeFeedback style={ nav.option } onPress={ () => navigate('Login') }>
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
      )}
    </>
  )
}

export default NavBar