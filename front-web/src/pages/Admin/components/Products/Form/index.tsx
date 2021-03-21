import { Controller, useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Select from 'react-select';

import BaseForm from '../../BaseForm'
import { makePrivateRequest, makeRequest } from 'core/utils/request'
import { Category } from 'core/types/Product';
import PriceField from './PriceField';
import ImageUpload from '../ImageUpload';

import './styles.scss'

export type FormState = {
  name: string
  price: string
  description: string
  imgUrl: string
  categories: Category[]
}

type ParamsType = {
  productId: string
}

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>()
  const history = useHistory()
  const { productId } = useParams<ParamsType>()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [uploadedImgUrl, setUploadedImgUrl] = useState('')
  const [productImgUrl, setProductImgUrl] = useState('')
  const isEditing = productId !== 'create'

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/products/${productId}` })
        .then(response => {
          setValue('name', response.data.name)
          setValue('price', response.data.price)
          setValue('description', response.data.description)
          setValue('categories', response.data.categories)
          setProductImgUrl(response.data.imgUrl)
        })
    }
  }, [productId, isEditing, setValue])

  useEffect(() => {
    setIsLoadingCategories(true)
    makeRequest({ url: '/categories' })
      .then(response => setCategories(response.data.content))
      .finally(() => setIsLoadingCategories(false))
  }, [])

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
      imgUrl: uploadedImgUrl || productImgUrl
    }

    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : '/products',
      method: isEditing ? 'PUT' : 'POST',
      data: payload
    }).then(() => {
        toast.info(isEditing ? 'Produto editado com sucesso!' : 'Produto cadastrado com sucesso!')
        history.push('/admin/products')
    }).catch(() => {
        toast.error(isEditing ? 'Erro ao editar produto' : 'Erro ao cadastrar produto')
    })
  }

  const onUploadSuccess = (imgUrl: string) => {
    setUploadedImgUrl(imgUrl)
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <BaseForm title={ isEditing ? "Editar um produto" : "Cadastrar um produto" }>
        <div className="product-form-container">
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
              <Controller
                as={ Select }
                name="categories"
                control={ control }
                isLoading={ isLoadingCategories }
                options={ categories }
                getOptionValue={ (option: Category) => String(option.id) }
                getOptionLabel={ (option: Category) => option.name }
                classNamePrefix="categories-select"
                placeholder="Categorias"
                rules={{ required: true }}
                defaultValue=""
                isMulti
              />
              {errors.categories && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <PriceField control={ control } />
              {errors.price && (
                <div className="invalid-feedback d-block">
                  { errors.price.message }
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <ImageUpload
                onUploadSuccess={ onUploadSuccess }
                productImgUrl={ productImgUrl }
              />
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