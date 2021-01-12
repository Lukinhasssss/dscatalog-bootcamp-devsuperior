package com.lucasmonteiro.dscatalog.resources; // O pacote resources implementa o controlador REST

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasmonteiro.dscatalog.entities.Category;

@RestController // Serve para definir que a classe será um controlador REST
@RequestMapping(value = "/categories") // Recebe como valor qual é a rota(endpoind) REST do recurso
public class CategoryResource {
	
	@GetMapping
	public ResponseEntity<List<Category>> findAll() { // ResponseEntity -> É um objeto do Spring que vai encapsular uma responsta HTTP
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(1L, "Books"));
		categories.add(new Category(2L, "Electronics"));
		
		return ResponseEntity.ok().body(categories);
	}

}
