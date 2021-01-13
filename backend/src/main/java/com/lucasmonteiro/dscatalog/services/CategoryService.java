package com.lucasmonteiro.dscatalog.services; // Obs: O service tem dependência do resource(Controller)

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucasmonteiro.dscatalog.dto.CategoryDTO;
import com.lucasmonteiro.dscatalog.entities.Category;
import com.lucasmonteiro.dscatalog.repositories.CategoryRepository;
import com.lucasmonteiro.dscatalog.services.exceptions.EntityNotFoundException;

@Service // Essa anotation registra a classe como um componente que vai participar do sistema de injeção de dependência automatizado do Spring
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() { // Método que vai acessar o repository e chamar lá no banco de dados as categorias
		List<Category> categories = repository.findAll();
		
		// Agora é preciso converter a lista de Category para uma lista de CategoryDTO. É possível fazer isso com um for ou com uma expressão lambda
		return categories.stream().map(category -> new CategoryDTO(category)).collect(Collectors.toList()); // Para cada elemento da lista original eu crio um CategoryDTO passando o elemento
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category category = obj.orElseThrow(() -> new EntityNotFoundException("Category not found"));
		return new CategoryDTO(category);
	}

}
