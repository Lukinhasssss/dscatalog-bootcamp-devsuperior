import { useForm } from 'react-hook-form'

import BaseForm from '../../BaseForm'
import { makePrivateRequest } from 'core/utils/request'

import './styles.scss'

type FormState = {
  name: string
  price: string
  // category: string
  description: string
  imageUrl: string
}

const Form = () => {
  const { register, handleSubmit } = useForm<FormState>()

  const onSubmit = (data: FormState) => {
    // console.log(data)
    makePrivateRequest({ url:'/products', method: 'POST', data })
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <BaseForm title="Cadastrar um produto">
        <div className="row">
          <div className="col-6">
            <input
              name="name" // É o atributo que identifica o campo
              type="text"
              className="form-control margin-bottom-30 input-base"
              placeholder="Nome do produto"
              ref={ register({ required: "Campo obrigatório" }) }
            />
            <input
              name="price" // É o atributo que identifica o campo
              type="number"
              className="form-control margin-bottom-30 input-base"
              placeholder="Preço"
              ref={ register({ required: "Campo obrigatório" }) }
            />
            <input
              name="imageUrl" // É o atributo que identifica o campo
              type="text"
              className="form-control margin-bottom-30 input-base"
              placeholder="Imagem"
              ref={ register({ required: "Campo obrigatório" }) }
            />
          </div>
          <div className="col-6">
            <textarea
              name="description"
              className="form-control input-base"
              placeholder="Descrição"
              ref={ register({ required: "Campo obrigatório" }) }
              cols={30}
              rows={10}
            />
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form