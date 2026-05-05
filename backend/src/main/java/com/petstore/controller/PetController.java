package com.petstore.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/pets")
public class PetController {
    private final PetRepository repository;

    public PetController(PetRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Pet> listAll(@RequestParam(value = "q", required = false) String q,
                             @RequestParam(value = "species", required = false) String species) {
        if (q != null && !q.isEmpty()) return repository.findByNameContainingIgnoreCase(q);
        if (species != null && !species.isEmpty()) return repository.findBySpeciesContainingIgnoreCase(species);
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getOne(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pet> create(@RequestBody Pet pet) {
        Pet saved = repository.save(pet);
        return ResponseEntity.created(URI.create("/api/pets/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> update(@PathVariable Long id, @RequestBody Pet pet) {
        return repository.findById(id).map(existing -> {
            existing.setName(pet.getName());
            existing.setSpecies(pet.getSpecies());
            existing.setAge(pet.getAge());
            existing.setDescription(pet.getDescription());
            existing.setImageUrl(pet.getImageUrl());
            existing.setPrice(pet.getPrice());
            repository.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repository.findById(id).map(existing -> {
            repository.deleteById(id);
            return ResponseEntity.noContent().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
