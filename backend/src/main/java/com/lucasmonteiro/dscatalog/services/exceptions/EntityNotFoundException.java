package com.lucasmonteiro.dscatalog.services.exceptions;

public class EntityNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public EntityNotFoundException(String msg) {
		super(msg); // Desta forma eu consigo repassar o argumento para o construtor da superclasse
	}

}
