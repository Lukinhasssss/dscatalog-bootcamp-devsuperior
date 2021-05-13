import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

export const categoriesResponse = {
  "content": [
    {
      "id": 3,
      "name": "Computadores"
    },
    {
      "id": 2,
      "name": "Eletrônicos"
    },
    {
      "id": 1,
      "name": "Livros"
    }
  ]
}

export const productResponse = {
  "id": 8,
  "name": "PC Gamer",
  "description": "Descrição do produto",
  "price": 1200.0,
  "imgUrl": "image.jpg",
  "categories": [
    {
      "id": 1,
      "name": "Computadores"
    },
    {
      "id": 2,
      "name": "Eletrônicos"
    }
  ]
}

export const fillFormData = () => { // fill == Preencher
  const nameInput = screen.getByTestId('name')
  const priceInput = screen.getByTestId('price')
  const imgUrlInput = screen.getByTestId('imgUrl')
  const descriptionInput = screen.getByTestId('description')

  userEvent.type(nameInput, 'Computador')
  userEvent.type(priceInput, '1200')
  userEvent.type(imgUrlInput, 'image.jpg')
  userEvent.type(descriptionInput, 'Ótimo computador')
}