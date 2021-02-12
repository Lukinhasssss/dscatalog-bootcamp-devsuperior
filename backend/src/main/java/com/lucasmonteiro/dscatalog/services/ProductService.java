package com.lucasmonteiro.dscatalog.services; // Obs: O service tem dependência do resource(Controller)

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucasmonteiro.dscatalog.dto.CategoryDTO;
import com.lucasmonteiro.dscatalog.dto.ProductDTO;
import com.lucasmonteiro.dscatalog.entities.Category;
import com.lucasmonteiro.dscatalog.entities.Product;
import com.lucasmonteiro.dscatalog.repositories.CategoryRepository;
import com.lucasmonteiro.dscatalog.repositories.ProductRepository;
import com.lucasmonteiro.dscatalog.services.exceptions.DatabaseException;
import com.lucasmonteiro.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Long categoryId, String name, PageRequest pageRequest) {
		Category category = (categoryId == 0) ? null : categoryRepository.getOne(categoryId); // Instancia a categoria a partir do categoryId e passa para o categoryRepository
		Page<Product> products = repository.find(category, name, pageRequest);
		return products.map(product -> new ProductDTO(product));
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product product = obj.orElseThrow(() -> new ResourceNotFoundException("Product not found"));
		return new ProductDTO(product, product.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO productDTO) {
		Product product = new Product();
		copyDtoToEntity(productDTO, product);
		product = repository.save(product);
		return new ProductDTO(product);
	}
	
	@Transactional
	public ProductDTO update(Long id, ProductDTO productDTO) {
		try {
			Product product = repository.getOne(id);
			copyDtoToEntity(productDTO, product);
			product = repository.save(product);
			return new ProductDTO(product);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(ProductDTO productDTO, Product product) { // Método que copia os dados do productDTO para o product
		product.setName(productDTO.getName());
		product.setPrice(productDTO.getPrice());
		product.setDescription(productDTO.getDescription());
		product.setImgUrl(productDTO.getImgUrl());
		product.setDate(productDTO.getDate());
		
		product.getCategories().clear();
		
		for(CategoryDTO categoryDTO : productDTO.getCategories()) { // forEach para percorrer todas as categoriasDTO que estão associadas ao meu DTO(productDTO)
			Category category = categoryRepository.getOne(categoryDTO.getId());
			product.getCategories().add(category);
		}
	}

}
