import axios from 'axios'
import { userToken } from './auth'

const BASE_URL= 'https://dscatalog-bootcamp.herokuapp.com'

export const api = axios.create({
  baseURL: BASE_URL
})

export const TOKEN = 'Basic ZHNjYXRhbG9nOkBkc2NhdGFsb2cyMjE1'

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

export function getCategories() {
  const result = api.get('/categories?direction=ASC&orderBy=name')
  return result
}