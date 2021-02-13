package com.lucasmonteiro.dscatalog.dto;

import java.io.Serializable;

public class UriDTO implements Serializable { // DTO para retornar no corpo da resposta o caminho do arquivo salvo para que eu possa acessá-lo

	private static final long serialVersionUID = 1L;
	
	private String uri;
	
	public UriDTO() {}
	
	public UriDTO(String uri) {
		this.uri = uri;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

}
