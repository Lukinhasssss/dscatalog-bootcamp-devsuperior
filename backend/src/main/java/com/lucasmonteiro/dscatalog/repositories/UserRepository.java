package com.lucasmonteiro.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasmonteiro.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { 

}
