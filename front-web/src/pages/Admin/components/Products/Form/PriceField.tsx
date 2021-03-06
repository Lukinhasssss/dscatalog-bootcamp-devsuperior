import { Control, Controller } from "react-hook-form"
import CurrencyInput from "react-currency-input-field"

import { FormState } from "./index"

type Props = {
  control: Control<FormState>
}

const PriceField = ({ control }: Props) => (
  <Controller
    name="price"
    control={ control }
    defaultValue=""
    rules={{ required: "Campo obrigatório" }}
    render={({ value, onChange }) => (
      <CurrencyInput
        placeholder="Preço"
        className="form-control input-base"
        value={ value }
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        onValueChange={ onChange }
        data-testid="price"
      />
    )}
  />
)

export default PriceField