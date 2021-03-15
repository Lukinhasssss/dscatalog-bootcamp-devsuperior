import { useHistory } from 'react-router-dom'

import Card from '../Card'

const List = () => {
  const history = useHistory()

  const handleCreate = () => {
    history.push('/admin/products/create')
  }

  return (
    <div className="admin-products-list">
      <button
        className="btn btn-lg btn-primary border-radius-10"
        onClick={ handleCreate }
      >
        ADICIONAR
      </button>
      <div className="admin-list-container">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default List