import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';

import BaseForm from '../../BaseForm'
import { makePrivateRequest, makeRequest } from 'core/utils/request'

import './styles.scss'

type FormState = {
  name: string
  price: string
  description: string
  imgUrl: string
}

type ParamsType = {
  productId: string
}

const Form = () => {
  const { register, handleSubmit, errors, setValue } = useForm<FormState>()
  const history = useHistory()
  const { productId } = useParams<ParamsType>()
  const isEditing = productId !== 'create'

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/products/${productId}` })
        .then(response => {
          setValue('name', response.data.name)
          setValue('price', response.data.price)
          setValue('imgUrl', response.data.imgUrl)
          setValue('description', response.data.description)
        })
    }
  }, [productId, isEditing, setValue])

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : '/products',
      method: isEditing ? 'PUT' : 'POST',
      data
    }).then(() => {
        toast.info(isEditing ? 'Produto editado com sucesso!' : 'Produto cadastrado com sucesso!')
        history.push('/admin/products')
    }).catch(() => {
        toast.error(isEditing ? 'Erro ao editar produto' : 'Erro ao cadastrar produto')
    })
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <BaseForm title={ isEditing ? "Editar um produto" : "Cadastrar um produto" }>
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                name="name" // É o atributo que identifica o campo
                type="text"
                className="form-control input-base"
                placeholder="Nome do produto"
                ref={register({
                  required: "Campo obrigatório",
                  minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres' },
                  maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres' }
                })}
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  { errors.name.message }
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                name="price" // É o atributo que identifica o campo
                type="number"
                className="form-control input-base"
                placeholder="Preço"
                ref={ register({ required: "Campo obrigatório" }) }
              />
              {errors.price && (
                <div className="invalid-feedback d-block">
                  { errors.price.message }
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                name="imgUrl" // É o atributo que identifica o campo
                type="text"
                className="form-control input-base"
                placeholder="Imagem"
                ref={ register({ required: "Campo obrigatório" }) }
              />
              {errors.imgUrl && (
                <div className="invalid-feedback d-block">
                  { errors.imgUrl.message }
                </div>
              )}
            </div>
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
            {errors.description && (
                <div className="invalid-feedback d-block">
                  { errors.description.message }
                </div>
              )}
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form