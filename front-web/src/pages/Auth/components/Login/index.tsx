import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import AuthCard from '../Card'
import ButtonIcon from 'core/components/ButtonIcon'

import './styles.scss'
import { makeLogin } from 'core/utils/request';

// Definindo o modelo de dados do formulário
type FormData = {
  username: string
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    makeLogin(data)
  }

  return (
    <AuthCard title="Login">
      <form className="login-form" onSubmit={ handleSubmit(onSubmit) }>
        <input
          type="email"
          className="form-control input-base margin-bottom-30"
          placeholder="Email"
          name="username"
          ref={ register }
        />
        <input
          type="password"
          className="form-control input-base"
          placeholder="Senha"
          name="senha"
          ref={ register }
        />
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