package com.petstore.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;

@Component
public class DataLoader implements CommandLineRunner {
    private final PetRepository repository;

    public DataLoader(PetRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            if (repository.count() == 0) {
                Pet p1 = new Pet();
                p1.setName("Buddy");
                p1.setSpecies("Dog");
                p1.setAge(3);
                p1.setDescription("Friendly golden retriever.");
                p1.setImageUrl("https://placedog.net/400/300?id=1");
                p1.setPrice(new BigDecimal("199.99"));

                Pet p2 = new Pet();
                p2.setName("Mittens");
                p2.setSpecies("Cat");
                p2.setAge(2);
                p2.setDescription("Curious tabby cat.");
                p2.setImageUrl("https://placekitten.com/400/300");
                p2.setPrice(new BigDecimal("149.99"));

                Pet p3 = new Pet();
                p3.setName("Polly");
                p3.setSpecies("Bird");
                p3.setAge(1);
                p3.setDescription("Colorful parrot.");
                p3.setImageUrl("https://loremflickr.com/400/300/parrot");
                p3.setPrice(new BigDecimal("89.99"));

                repository.save(p1);
                repository.save(p2);
                repository.save(p3);
            }
        } catch (Exception e) {
            System.out.println("DataLoader: Skipping seed data - " + e.getMessage());
        }
    }
}
