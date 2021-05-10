import { render, screen } from '@testing-library/react'
import { Product } from 'core/types/Product'
import ProductCard from '../ProductCard'

test('should render ProductCard', () => {
  const product = {
    name: 'computador',
    price: 20,
    imgUrl: 'image.jpg'
  } as Product


  render(
    <ProductCard product={ product } />
  )

  expect(screen.getByText('computador')).toBeInTheDocument()
  expect(screen.getByAltText('computador')).toBeInTheDocument()
  expect(screen.getByText('R$')).toBeInTheDocument()
  expect(screen.getByText('20,00')).toBeInTheDocument()
})