package com.lucasmonteiro.dscatalog.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class FileDTO implements Serializable { // DTO para receber o corpo da requisição "file"
	
	private static final long serialVersionUID = 1L;
	
	private MultipartFile file;
	
	public FileDTO() {}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

}
