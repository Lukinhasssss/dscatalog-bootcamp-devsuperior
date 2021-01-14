package com.lucasmonteiro.dscatalog.services; // Obs: O service tem dependência do resource(Controller)

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucasmonteiro.dscatalog.dto.CategoryDTO;
import com.lucasmonteiro.dscatalog.entities.Category;
import com.lucasmonteiro.dscatalog.repositories.CategoryRepository;
import com.lucasmonteiro.dscatalog.services.exceptions.ResourceNotFoundException;

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
		Category category = obj.orElseThrow(() -> new ResourceNotFoundException("Category not found"));
		return new CategoryDTO(category);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO categoryDTO) {
		// Convertendo o dto recebido como parâmetro para um objeto do tipo Category que é a minha entidade
		Category category = new Category();
		category.setName(categoryDTO.getName());
		
		// Salvando a operação
		category = repository.save(category);
		
		// Retornando a entidade category convertida novamente para um CategoryDTO
		return new CategoryDTO(category);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
		try {
			Category category = repository.getOne(id);
			category.setName(categoryDTO.getName());
			category = repository.save(category);
			return new CategoryDTO(category);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
	}

}
