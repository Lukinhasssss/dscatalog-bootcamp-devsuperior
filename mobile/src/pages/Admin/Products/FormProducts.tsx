import React, { useState } from 'react'
import { ActivityIndicator, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { text, theme } from '../../../styles'
import arrow from '../../../assets/leftArrow.png'

interface FormProductProps {
  setScreen: Function
}

const FormProduct: React.FC<FormProductProps> = (props) => {
  const { setScreen } = props
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
    <View style={ theme.formContainer }>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={ theme.formCard }>
          <ScrollView>
            <Modal
              visible={ showCategories }
              animationType="fade"
              transparent={ true }
              presentationStyle="overFullScreen"
            >
              <View style={ theme.modalContainer }>
                <ScrollView contentContainerStyle={ theme.modalContent }>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={ category.id }
                      style={ theme.modalItem }
                      onPress={() => {
                        setProduct({ ...product, categories: category.name })
                        setShowCategories(!showCategories)
                      }}
                    >
                      <Text>{ category.name }</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Modal>

            <TouchableOpacity style={ theme.goBackContainer } onPress={ () => setScreen('products') }>
              <Image source={ arrow } />
              <Text style={ text.goBackText }>Voltar</Text>
            </TouchableOpacity>

            <TextInput placeholder="Nome do produto" style={ theme.formInput } />
            <TouchableOpacity onPress={ () => setShowCategories(!showCategories) }>
              <Text>
                { product.categories === null ? 'Escolha uma categoria' : product.categories }
              </Text>
            </TouchableOpacity>
            <TextInput placeholder="Preço" style={ theme.formInput } />
            <TouchableOpacity>
              <Text>Carregar imagem</Text>
            </TouchableOpacity>
            <Text>As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb</Text>
            <TextInput multiline placeholder="Descrição" style={ theme.textArea } />
            <View>
              <TouchableOpacity>
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default FormProduct