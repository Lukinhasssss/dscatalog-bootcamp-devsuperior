import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Home: React.FC = ({ navigation }) => {
  return (
    <View>
      <Text>Bem vindo ao APP</Text>
      <TouchableOpacity style={{ width:150, backgroundColor: "#069", padding: 10, borderRadius: 4 }} onPress={ () => navigation.navigate('Catalog') }>
        <Text>Ir para o catálogo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home