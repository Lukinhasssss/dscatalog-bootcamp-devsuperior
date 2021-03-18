import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth'

type LoginData = {
  username: string
  password: string
}

const BASE_URL = 'http://localhost:8080'

axios.interceptors.response.use(function(response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    logout()
  }

  return Promise.reject(error)
})

export const makeRequest = (params: AxiosRequestConfig) => {
  return axios({
    ...params,
    baseURL: BASE_URL
  })
}

export const makePrivateRequest = (params: AxiosRequestConfig) => { // Vai executar requisições que exijam autenticação
  const sessionData = getSessionData()

  const headers = {
    'Authorization': `Bearer ${sessionData.access_token}`
  }

  return makeRequest({ ...params, headers })
}

export const makeLogin = (loginData: LoginData) => {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`

  const headers = {
    Authorization: `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const payload = qs.stringify({ ...loginData, grant_type: 'password' })

  return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers }) // data --> é o que vai ser enviado no corpo da requisição
}