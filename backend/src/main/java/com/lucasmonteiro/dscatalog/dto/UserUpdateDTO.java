package com.lucasmonteiro.dscatalog.dto;

import com.lucasmonteiro.dscatalog.services.validation.UserUpdateValid;

@UserUpdateValid // Vai verificar se o email que eu estou inserindo já existe no banco
public class UserUpdateDTO extends UserDTO {

	private static final long serialVersionUID = 1L;

}
