import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { tabbar } from '../styles'

interface TabBarProps {
  screen: string
  setScreen: (Function)
}

const TabBar: React.FC<TabBarProps> = (props) => {
  const { screen, setScreen } = props

  function changeScreen(page: string) {
    setScreen(page)
  }

  return (
    <View style={ tabbar.container }>
      <TouchableOpacity
        activeOpacity={ 0.7 }
        onPress={ () => changeScreen('products') }
        style={[tabbar.pill, screen === 'products' && tabbar.pillActive]}
      >
        <Text style={[tabbar.pillText, screen === 'products' && tabbar.pillTextActive]}>Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={ 0.7 }
        onPress={ () => changeScreen('categories') }
        style={[tabbar.pill, screen === 'categories' && tabbar.pillActive]}
      >
        <Text style={[tabbar.pillText, screen === 'categories' && tabbar.pillTextActive]}>Categorias</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={ 0.7 }
        onPress={ () => changeScreen('users') }
        style={[tabbar.pill, screen === 'users' && tabbar.pillActive]}
      >
        <Text style={[tabbar.pillText, screen === 'users' && tabbar.pillTextActive]}>Usuários</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TabBar