import axios from 'axios'

const BASE_URL= 'https://dscatalog-bootcamp.herokuapp.com'

export const api = axios.create({
  baseURL: BASE_URL
})