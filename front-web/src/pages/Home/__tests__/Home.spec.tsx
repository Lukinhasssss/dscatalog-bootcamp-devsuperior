import { render, screen } from '@testing-library/react'
import history from 'core/utils/history'
import { Router } from 'react-router'
import Home from '..'

test('should render Home', () => {
  render(
    <Router history={ history }>
      <Home />
    </Router>
  )

  // screen.debug()
  const titleElement = screen.getByText('Conheça o melhor catálogo de produtos')
  const subtitleElement = screen.getByText('Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.')

  expect(titleElement).toBeInTheDocument()
  expect(subtitleElement).toBeInTheDocument()
  expect(screen.getByTestId('main-image')).toBeInTheDocument()
  expect(screen.getByText(/inicie agora a sua busca/i)).toBeInTheDocument()
})