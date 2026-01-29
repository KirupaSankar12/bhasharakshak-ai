package com.bhasharakshak.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthController {

    private final MongoTemplate mongoTemplate;

    @GetMapping
    public ResponseEntity<String> checkHealth() {
        try {
            // Simple command to check if DB is reachable
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            return ResponseEntity.ok("MongoDB Connection: OK");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("MongoDB Connection Failed: " + e.getMessage());
        }
    }
}
