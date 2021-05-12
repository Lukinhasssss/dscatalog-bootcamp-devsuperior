import { render, screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router'
import selectEvent from 'react-select-event'
import userEvent from '@testing-library/user-event'
import { ToastContainer } from 'react-toastify'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import history from 'core/utils/history'
import Form from '../Form'
import { categoriesResponse } from './fixtures'

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: () => ({
//     productId: 'create'
//   })
// }))

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')

  return {
    __esModule: true,
    ...originalModule,
    productId: jest.fn().mockReturnValue('create')
  }
})

const server = setupServer(
  rest.get('http://localhost:8080/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesResponse))
  }),

  rest.post('http://localhost:8080/products', (req, res, ctx) => {
    return res(ctx.status(201))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('should render Form', async () => {
  render(
    <Router history={ history }>
      <ToastContainer />
      <Form />
    </Router>
  )

  const submitButton = screen.getByRole('button', { name: /salvar/i })
  const nameInput = screen.getByTestId('name')
  const priceInput = screen.getByTestId('price')
  const imgUrlInput = screen.getByTestId('imgUrl')
  const descriptionInput = screen.getByTestId('description')
  const categoriesInput = screen.getByLabelText('Categorias')

  userEvent.type(nameInput, 'Computador')
  userEvent.type(priceInput, '1200')
  userEvent.type(imgUrlInput, 'image.jpg')
  userEvent.type(descriptionInput, 'Ótimo computador')
  await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos'])

  userEvent.click(submitButton)

  await waitFor(() => expect(screen.getByText('Produto cadastrado com sucesso!')).toBeInTheDocument())
  expect(history.location.pathname).toBe('/admin/products')
  expect(screen.getByText(/Cadastrar um produto/i)).toBeInTheDocument()
})