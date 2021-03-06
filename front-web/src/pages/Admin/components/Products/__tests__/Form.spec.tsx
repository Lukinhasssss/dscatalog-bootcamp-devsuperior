import selectEvent from 'react-select-event'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { Router, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import history from 'core/utils/history'
import Form from '../Form'
import { categoriesResponse, fillFormData, productResponse } from './fixtures'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn()
}))

const server = setupServer(
  rest.get('http://localhost:8080/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesResponse))
  }),

  rest.post('http://localhost:8080/products', (req, res, ctx) => {
    return res(ctx.status(201))
  }),

  rest.get('http://localhost:8080/products/:productId', (req, res, ctx) => {
    return res(ctx.json(productResponse))
  }),

  rest.put('http://localhost:8080/products/:productId', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Creating a product', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create'
    })
  })

  test('should render Form and submit with success', async () => {
    render(
      <Router history={ history }>
        <ToastContainer />
        <Form />
      </Router>
    )

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    const categoriesInput = screen.getByLabelText('Categorias')
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos'])

    fillFormData()

    userEvent.click(submitButton)

    await waitFor(() => expect(screen.getByText('Produto cadastrado com sucesso!')).toBeInTheDocument())
    expect(history.location.pathname).toBe('/admin/products')
    expect(screen.getByText(/Cadastrar um produto/i)).toBeInTheDocument()
  })

  test('should render Form and submit with error', async () => {
    server.use(
      rest.post('http://localhost:8080/products', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(
      <Router history={ history }>
        <ToastContainer />
        <Form />
      </Router>
    )

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    const categoriesInput = screen.getByLabelText('Categorias')
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos'])

    fillFormData()

    userEvent.click(submitButton)

    await waitFor(() => expect(screen.getByText('Erro ao cadastrar produto')).toBeInTheDocument())
    expect(history.location.pathname).toBe('/admin/products')
    expect(screen.getByText(/Cadastrar um produto/i)).toBeInTheDocument()
  })

  test('should render Form and show validation error messages', async () => {
    render(
      <Router history={ history }>
        <Form />
      </Router>
    )

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    userEvent.click(submitButton)

    await waitFor(() => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(4))

    fillFormData()
    const categoriesInput = screen.getByLabelText('Categorias')
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos'])

    await waitFor(() => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0))
  })
})

describe('Editing a product', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: '8'
    })
  })

  test('should render Form and submit with success', async () => {
    render(
      <Router history={ history }>
        <ToastContainer />
        <Form />
      </Router>
    )

    expect(screen.getByText(/Editar um produto/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByTestId('name')).toHaveValue('PC Gamer'))
    expect(screen.getByText('Computadores')).toBeInTheDocument()
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument()
    // expect(screen.getByTestId('price')).toHaveValue(1200)
    // expect(screen.getByTestId('imgUrl')).toHaveValue('image.jpg')
    expect(screen.getByTestId('description')).toHaveValue('Descrição do produto')

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    userEvent.click(submitButton)

    await waitFor(() => expect(screen.getByText('Produto editado com sucesso!')).toBeInTheDocument())
  })

  test('should render Form and submit with error', async () => {
    server.use(
      rest.put('http://localhost:8080/products/:productId', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(
      <Router history={ history }>
        <ToastContainer />
        <Form />
      </Router>
    )

    expect(screen.getByText(/Editar um produto/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByTestId('name')).toHaveValue('PC Gamer'))
    expect(screen.getByText('Computadores')).toBeInTheDocument()
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument()
    // expect(screen.getByTestId('price')).toHaveValue(1200)
    // expect(screen.getByTestId('imgUrl')).toHaveValue('image.jpg')
    expect(screen.getByTestId('description')).toHaveValue('Descrição do produto')

    const submitButton = screen.getByRole('button', { name: /salvar/i })
    userEvent.click(submitButton)

    await waitFor(() => expect(screen.getByText('Erro ao editar produto')).toBeInTheDocument())
  })
})