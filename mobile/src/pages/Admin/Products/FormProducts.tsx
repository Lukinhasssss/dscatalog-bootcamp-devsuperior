import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-tiny-toast'
import { TextInputMask } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker'

import { createProduct, getCategories, uploadImage } from '../../../services'

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
  const [image, setImage] = useState('')
  const [product, setProduct] = useState({
    name: '',
    description: '',
    imgUrl: '',
    price: '',
    categories: []
  })

  useEffect(() => {
    async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Precisamos de acesso a biblioteca de imagens!')
      }
    }
  }, [])

  async function selectImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    setImage(result.uri)
  }

  async function handleUpload() {
    uploadImage(image).then((response) => {
      const { uri } = response?.data
      setProduct({ ...product, imgUrl: uri })
      console.warn(uri)
    })
  }

  useEffect(() => {
    image ? handleUpload() : null
  }, [image])

  function handleOnSave() {
    !isEditing && newProduct()
  }

  async function newProduct() {
    setIsLoading(true)

    const category = replaceCategory()
    const data = { ...product, price: getRaw(), categories: [{ id: category }] }

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

  function getRaw() {
    const str = product.price
    const result = str.slice(2).replace(/\./g, '').replace(/,/g, '.')

    return result
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
            <TextInputMask
              type={ 'money' }
              placeholder="Preço"
              value={ product.price }
              style={ theme.formInput }
              onChangeText={ (event) => setProduct({ ...product, price: event }) }
            />
            {/* <TextInput
              placeholder="Preço"
              style={ theme.formInput }
              value={ product.price }
              onChangeText={ (event) => setProduct({ ...product, price: parseInt(event) }) }
            /> */}
            <TouchableOpacity activeOpacity={ 0.7 } style={ theme.uploadButton } onPress={ selectImage }>
              <Text style={ text.uploadButtonText }>Carregar imagem</Text>
            </TouchableOpacity>
            <Text style={ text.fileSize }>As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb</Text>

            {image !== '' && (
              <TouchableOpacity
                onPress={ selectImage }
                activeOpacity={ 0.7 }
                style={{ width: '100%', height: 150, borderRadius: 10, marginVertical: 10 }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
              </TouchableOpacity>
            )}

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