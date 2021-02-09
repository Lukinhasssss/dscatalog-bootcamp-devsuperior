package com.lucasmonteiro.dscatalog.dto;

import com.lucasmonteiro.dscatalog.services.validation.UserInsertValid;

@UserInsertValid // Vai verificar se o email que eu estou inserindo já existe no banco
public class UserInsertDTO extends UserDTO {

	private static final long serialVersionUID = 1L;
	
	private String password;
	
	public UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
