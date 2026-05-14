package com.petstore.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    
    @Value("${allowed.origins:http://localhost:5173,http://127.0.0.1:5173}")
    private String allowedOrigins;
    
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        
        // Get allowed origins from environment, with defaults for development
        String originsToUse = System.getenv("ALLOWED_ORIGINS");
        if (originsToUse == null || originsToUse.trim().isEmpty()) {
            // Default for development and Render deployment with auto-detected URLs
            originsToUse = "http://localhost:5173,http://127.0.0.1:5173,https://*.onrender.com";
        }
        
        List<String> origins = Arrays.asList(originsToUse.split(","));
        for (String origin : origins) {
            config.addAllowedOriginPattern(origin.trim());
        }
        
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
