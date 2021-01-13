package com.lucasmonteiro.dscatalog.resources; // O pacote resources implementa o controlador REST que tem dependência do Service

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasmonteiro.dscatalog.dto.CategoryDTO;
import com.lucasmonteiro.dscatalog.services.CategoryService;

@RestController // Serve para definir que a classe será um controlador REST
@RequestMapping(value = "/categories") // Recebe como valor qual é a rota(endpoind) REST do recurso
public class CategoryResource {
	
	@Autowired
	private CategoryService service;
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll() { // ResponseEntity -> É um objeto do Spring que vai encapsular uma resposta HTTP
		List<CategoryDTO> categories = service.findAll();
		return ResponseEntity.ok().body(categories);
	}

}
// Obs: O Resource(Controller) chama o Service que por sua vez chama o Repository que por sua vez foi lá no banco de dados
//      e trouxe os objetos então instanciou todo mundo, trouxe para cá e guardou na lista.