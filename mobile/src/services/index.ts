import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL= 'https://dscatalog-bootcamp.herokuapp.com'

export const api = axios.create({
  baseURL: BASE_URL
})

export const TOKEN = 'Basic ZHNjYXRhbG9nOkBkc2NhdGFsb2cyMjE1'

export async function userToken() {
  const token = await AsyncStorage.getItem('@token')
  return token
}

export function getProducts() {
  const result = api.get('/products?direction=DESC&orderBy=id')
  // const result = api.get('/products?page=0&linesPerPage=12&direction=ASC&orderBy=name')

  return result
}

export async function createProduct(data: object) {
  const authToken = await userToken()
  const response = api.post('/products', data, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return response
}

export async function deleteProduct (id: number) {
  const authToken = await userToken()
  const response = api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return response
}

export function getCategories() {
  const result = api.get('/categories?direction=ASC&orderBy=name')
  return result
}

export async function uploadImage(image: string) {
  if (!image) return
  const authToken = await userToken()
  let data = new FormData()
  data.append('file', {
    uri: image,
    name: image
  })

  const response = await api.post('/products/image', data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response
}