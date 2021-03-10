import jwtDecode from 'jwt-decode'

export const CLIENT_ID = 'dscatalog'
export const CLIENT_SECRET = 'dscatalog123'

type LoginResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  userFirstName: string
  userId: number
}

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN'

type AccessToken = {
  exp: number // é o tempo de expiração
  user_name: string
  authorities: Role[]
}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse))
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}' // Se o localStorage for null ou undefined vai retornar uma string com um objeto vazio
  const parsedSessionData = JSON.parse(sessionData) // JSON.parse() --> Transforma string em objeto

  return parsedSessionData as LoginResponse
}

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData()

  const tokenDecoded = jwtDecode(sessionData.access_token)
  return tokenDecoded as AccessToken
}

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded()

  if (Date.now() <= exp * 1000) {
    return true
  }

  return false // Também é possível fazer desta forma --> return Date.now() <= exp * 1000
}

export const isAuthenticated = () => {
  const sessionData = getSessionData()

  return sessionData.access_token && isTokenValid()
}