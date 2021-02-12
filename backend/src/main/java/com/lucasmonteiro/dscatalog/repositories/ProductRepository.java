package com.lucasmonteiro.dscatalog.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lucasmonteiro.dscatalog.entities.Category;
import com.lucasmonteiro.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query("SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE (:category IS NULL OR :category IN cats) AND "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')) )")
	Page<Product> find(Category category, String name, Pageable pageable);

}

// :category vai refenciar o mesmo parâmetro que estiver no método

/*
@Query("SELECT obj FROM Product obj WHERE "
		+ ":category = obj.category") // Se a consulta fosse para 1 funcionaria desta forma
*/

// DISTINCT --> Ele vai garantir que não haja repetição de produto