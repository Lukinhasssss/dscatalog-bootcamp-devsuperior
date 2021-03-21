import { Link } from 'react-router-dom'

import { Product } from 'core/types/Product'
import ProductPrice from 'core/components/ProductPrice'

import './styles.scss'

type Props = {
  product: Product
  onRemove: (productId: number) => void
}

const Card = ({ product, onRemove }: Props) => {
  return (
    <div className="card-base product-card-admin">
      <div className="text-center border-right py-3 border-img">
        <img
          src={ product.imgUrl }
          alt={ product.name }
          className="product-card-image-admin"
        />
      </div>

      <div className="card-content">
        <h3 className="product-card-name-admin">
          { product.name }
        </h3>
        <ProductPrice price={ product.price } />
        <div>
          {product.categories.map(category => (
            <span className="badge badge-pill badge-secondary mr-2" key={ category.id }>{ category.name }</span>
          ))}
          {/* <span className="badge badge-pill badge-secondary mr-2">Categoria 1</span>
          <span className="badge badge-pill badge-secondary mr-2">Categoria 2</span>
          <span className="badge badge-pill badge-secondary mr-2">Categoria 3</span> */}
        </div>
      </div>

      <div className="buttons-container">
        <Link
          to={ `/admin/products/${product.id}` }
          type="button"
          className="btn btn-outline-primary btn-block border-radius-10 font-weight-bold btn-product btn-edit"
        >
          EDITAR
        </Link>
        <button
          type="button"
          className="btn btn-outline-danger btn-block border-radius-10 font-weight-bold btn-product btn-delete"
          onClick={ () => onRemove(product.id) }
        >
          EXCLUIR
        </button>
      </div>
    </div>
  )
}

export default Card