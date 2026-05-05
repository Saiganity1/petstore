package com.petstore.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private DataSource dataSource;

    @PostMapping("/init-db")
    public ResponseEntity<String> initializeDatabase() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            // Create pets table
            String createTableSQL = "CREATE TABLE IF NOT EXISTS pets (" +
                    "id BIGSERIAL PRIMARY KEY," +
                    "age INTEGER," +
                    "description VARCHAR(255)," +
                    "image_url VARCHAR(255)," +
                    "name VARCHAR(255)," +
                    "price NUMERIC(38, 2)," +
                    "species VARCHAR(255)" +
                    ")";
            
            stmt.execute(createTableSQL);

            // Insert sample data
            String insertSQL = "INSERT INTO pets (name, species, age, description, image_url, price) " +
                    "VALUES " +
                    "('Buddy', 'Dog', 3, 'Friendly golden retriever.', 'https://placedog.net/400/300?id=1', 199.99), " +
                    "('Mittens', 'Cat', 2, 'Curious tabby cat.', 'https://placekitten.com/400/300', 149.99), " +
                    "('Polly', 'Bird', 1, 'Colorful parrot.', 'https://loremflickr.com/400/300/parrot', 89.99) " +
                    "ON CONFLICT DO NOTHING";
            
            stmt.execute(insertSQL);

            return ResponseEntity.ok("✓ Database initialized successfully! Pets table created with 3 sample pets.");

        } catch (SQLException e) {
            return ResponseEntity.status(500).body("✗ Database error: " + e.getMessage());
        }
    }
}
