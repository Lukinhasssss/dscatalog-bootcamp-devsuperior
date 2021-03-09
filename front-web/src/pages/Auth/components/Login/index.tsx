import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import AuthCard from '../Card'
import ButtonIcon from 'core/components/ButtonIcon'
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

import './styles.scss'

// Definindo o modelo de dados do formulário
type FormData = {
  username: string
  password: string
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [hasError, setHasError] = useState(false)
  const history = useHistory()

  const onSubmit = (data: FormData) => {
    makeLogin(data)
      .then(response => {
        setHasError(false)
        saveSessionData(response.data) // Salva os dados da sessão do usuário no local storage
        history.push('/admin')
      })
      .catch(() => {
        setHasError(true)
      })
  }

  return (
    <AuthCard title="Login">
      {hasError && (
        <div className="alert alert-danger mt-5">
          Usuário ou senha inválidos!
        </div>
      )}
      <form className="login-form" onSubmit={ handleSubmit(onSubmit) }>
        <div className="margin-bottom-30">
          <input
            type="email"
            className={ `form-control input-base ${errors.username ? 'is-invalid' : ''}` }
            placeholder="Email"
            name="username"
            ref={register({
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
          />
          {errors.username && (
            <div className="invalid-feedback d-block">
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="margin-bottom-30">
          <input
            type="password"
            className={ `form-control input-base ${errors.password ? 'is-invalid' : ''}` }
            placeholder="Senha"
            name="password"
            ref={ register({ required: "Campo obrigatório" }) }
          />
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha?
        </Link>

        <div className="login-submit">
          <ButtonIcon text="Logar" />
        </div>

        <div className="text-center"> {/* text-center é uma classe do Bootstrap */}
          <span className="not-registered">
            Não tem cadastro?
          </span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}

export default Login