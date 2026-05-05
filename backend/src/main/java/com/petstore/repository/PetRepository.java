package com.petstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petstore.model.Pet;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findBySpeciesContainingIgnoreCase(String species);
    List<Pet> findByNameContainingIgnoreCase(String name);
}
