import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-tiny-toast'

import { createProduct, getCategories } from '../../../services'

import { text, theme } from '../../../styles'
import arrow from '../../../assets/leftArrow.png'

interface FormProductProps {
  setScreen: Function
}

const FormProduct: React.FC<FormProductProps> = (props) => {
  const { setScreen } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    imgUrl: '',
    price: 0,
    categories: []
  })

  function handleOnSave() {
    !isEditing && newProduct()
  }

  async function newProduct() {
    setIsLoading(true)

    const category = replaceCategory()
    const data = { ...product, categories: [{ id: category }] }

    try {
      await createProduct(data)
      Toast.showSuccess('Produto criado com sucesso!')
    }
    catch (error) {
      Toast.show('Erro ao salvar...')
    }

    setIsLoading(false)
  }

  function replaceCategory() {
    const category = categories.find(category => category.name === product.categories)
    return category.id
  }

  async function loadCategories() {
    setIsLoading(true)

    const result = await getCategories()
    setCategories(result.data.content)

    setIsLoading(false)
  }

  useEffect(() => {
    loadCategories()
  }, [])

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

            <TextInput
              placeholder="Nome do produto"
              style={ theme.formInput }
              value={ product.name }
              onChangeText={ (event) => setProduct({ ...product, name: event }) }
            />
            <TouchableOpacity
              onPress={ () => setShowCategories(!showCategories) }
              style={ theme.selectInput }
            >
              <Text style={ product.categories.length === 0 && { color: '#cecece' } }>
                { product.categories.length === 0 ? 'Escolha uma categoria' : product.categories }
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Preço"
              style={ theme.formInput }
              value={ product.price }
              onChangeText={ (event) => setProduct({ ...product, price: parseInt(event) }) }
            />
            <TouchableOpacity activeOpacity={ 0.7 } style={ theme.uploadButton }>
              <Text style={ text.uploadButtonText }>Carregar imagem</Text>
            </TouchableOpacity>
            <Text style={ text.fileSize }>As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb</Text>
            <TextInput
              multiline
              placeholder="Descrição"
              style={ theme.textArea }
              value={ product.description }
              onChangeText={ (event) => setProduct({ ...product, description: event }) }
            />
            <View style={ theme.buttonContainer }>
              <TouchableOpacity
                style={ theme.deleteButton }
                onPress={() => {
                  Alert.alert(
                    'Deseja cancelar?',
                    'Os dados inseridos não serão salvos!',
                    [
                      {
                        text: 'Voltar',
                        style: 'cancel'
                      },
                      {
                        text: 'Confirmar',
                        onPress: () => setScreen('products'),
                        style: 'default'
                      }
                    ]
                  )
                }}
              >
                <Text style={ text.deleteButtonText }>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={ theme.saveButton }
                onPress={ () => handleOnSave() }
              >
                <Text style={ text.saveButtonText }>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default FormProduct