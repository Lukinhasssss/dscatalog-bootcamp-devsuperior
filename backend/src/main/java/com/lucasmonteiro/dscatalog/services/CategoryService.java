package com.lucasmonteiro.dscatalog.services; // Obs: O service tem dependência do resource(Controller)

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucasmonteiro.dscatalog.entities.Category;
import com.lucasmonteiro.dscatalog.repositories.CategoryRepository;

@Service // Essa anotation registra a classe como um componente que vai participar do sistema de injeção de dependência automatizado do Spring
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<Category> findAll() { // Método que vai acessar o repository e chamar lá no banco de dados as categorias
		return repository.findAll();
	}

}
