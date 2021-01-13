package com.lucasmonteiro.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasmonteiro.dscatalog.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> { // Só com esta implementação já é possível ter várias operações prontas para acessar os dados no banco de dados 

}
