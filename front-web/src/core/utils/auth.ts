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

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse))
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}' // Se o localStorage for null ou undefined vai retornar uma string com um objeto vazio
  const parsedSessionData = JSON.parse(sessionData) // JSON.parse() --> Transforma string em objeto

  return parsedSessionData as LoginResponse
}