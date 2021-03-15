package com.lucasmonteiro.dscatalog.services; // Obs: O service tem dependência do resource(Controller)

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.lucasmonteiro.dscatalog.dto.CategoryDTO;
import com.lucasmonteiro.dscatalog.dto.ProductDTO;
import com.lucasmonteiro.dscatalog.dto.UriDTO;
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
	
	@Autowired
	private S3Service s3Service;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Long categoryId, String name, PageRequest pageRequest) {
		List<Category> categories = (categoryId == 0) ? null : Arrays.asList(categoryRepository.getOne(categoryId)); // Instancia a categoria a partir do categoryId e passa para o categoryRepository
		Page<Product> page = repository.find(categories, name, pageRequest);
		repository.find(page.toList());
		return page.map(product -> new ProductDTO(product, product.getCategories()));
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
		if (product.getCategories().size() == 0) {
			Category category = categoryRepository.getOne(1L);
			product.getCategories().add(category);
		}
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

	public UriDTO uploadFile(MultipartFile file) {
		URL url = s3Service.uploadFile(file);
		return new UriDTO(url.toString());
	}

}
