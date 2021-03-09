import { makePrivateRequest } from 'core/utils/request'
import { useState } from 'react'
import BaseForm from '../../BaseForm'
import './styles.scss'


type FormState = {
  name: string
  price: string
  category: string
  description: string
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    price: '',
    category: '',
    description: ''
  })

  const handleOnChange =(event: FormEvent) => { // Também é possível colocar o event do tipo any --> event: any
    const name = event.target.name
    const value = event.target.value

    // console.log({ name, value })
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      ...formData, // Significa que o payload vai ter tudo que tem no formData
      imgUrl: 'https://images7.kabum.com.br/produtos/fotos/115737/console-sony-playstation-5-midia-fisica_1598984720_g.jpg',
      categories: [{ id: formData.category }]
    }

    makePrivateRequest({ url:'/products', method: 'POST', data: payload })
      .then(() => {
        setFormData({ name: '', category: '', price: '', description: '' })
      })
  }

  return (
    <form onSubmit={ handleOnSubmit }>
      <BaseForm title="Cadastrar um produto">
        <div className="row">
          <div className="col-6">
            <input
              value={ formData.name }
              name="name" // É o atributo que identifica o campo
              type="text"
              className="form-control mb-5"
              onChange={ handleOnChange }
              placeholder="Nome do produto"
            />
            <select
              value={ formData.category }
              className="form-control mb-5"
              name="category" // É o atributo que identifica o campo
              onChange={ handleOnChange }
              >
              <option value="1">Livros</option>
              <option value="3">Computadores</option>
              <option value="2">Eletrônicos</option>
            </select>
            <input
              value={ formData.price }
              name="price" // É o atributo que identifica o campo
              type="text"
              className="form-control"
              onChange={ handleOnChange }
              placeholder="Preço"
            />
          </div>
          <div className="col-6">
            <textarea
              name="description"
              value={ formData.description }
              onChange={ handleOnChange }
              className="form-control"
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