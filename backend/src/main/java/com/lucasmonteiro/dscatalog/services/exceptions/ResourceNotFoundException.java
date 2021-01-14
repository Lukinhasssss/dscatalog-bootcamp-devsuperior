package com.lucasmonteiro.dscatalog.services.exceptions;

public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String msg) {
		super(msg); // Desta forma eu consigo repassar o argumento para o construtor da superclasse
	}

}
