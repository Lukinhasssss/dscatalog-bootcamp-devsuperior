import axios from 'axios'

const BASE_URL= 'https://dscatalog-bootcamp.herokuapp.com'

export const api = axios.create({
  baseURL: BASE_URL
})

export const TOKEN = 'Basic ZHNjYXRhbG9nOkBkc2NhdGFsb2cyMjE1'