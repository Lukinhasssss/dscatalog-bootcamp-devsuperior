import { useHistory } from 'react-router-dom'

import './styles.scss'

type Props = {
  title: string
  children: React.ReactNode
}

const BaseForm = ({ title, children }: Props) => {
  const history = useHistory()

  const handleCancel = () => {
    history.push('../') // Também é possível utilizar o goBack
  }

  return (
    <div className="admin-base-form card-base">
      <h1 className="base-form-title">
        { title }
      </h1>

      { children }

      <div className="base-form-actions">
        <button
          className="btn btn-outline-danger border-radius-10 mr-3 font-weight-bold"
          onClick={ handleCancel }
        >
          CANCELAR
        </button>
        <button className="btn btn-primary border-radius-10 font-weight-bold">
          SALVAR
        </button>
      </div>
    </div>
  )
}

export default BaseForm