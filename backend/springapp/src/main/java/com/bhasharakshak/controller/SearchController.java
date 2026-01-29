package com.bhasharakshak.controller;

import com.bhasharakshak.model.LanguageAsset;
import com.bhasharakshak.repository.AssetRepository;
import com.bhasharakshak.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SearchController {

    private final AssetRepository assetRepository;
    private final AIService aiService;

    @GetMapping("/search")
    public ResponseEntity<List<LanguageAsset>> searchAssets(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            return ResponseEntity.ok(assetRepository.findAll());
        }
        return ResponseEntity.ok(assetRepository.findByLanguageNameContainingIgnoreCase(query));
    }

    @GetMapping("/tts")
    public ResponseEntity<?> generateTTS(@RequestParam String text, @RequestParam(defaultValue = "en") String lang) {
        String audioData = aiService.generateSpeech(text, lang);
        return ResponseEntity.ok(Map.of("audioData", audioData));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        List<LanguageAsset> allAssets = assetRepository.findAll();

        long totalAssets = allAssets.size();
        // Determine active languages (count by languageName)
        Map<String, Long> languageDistribution = allAssets.stream()
                .filter(asset -> asset.getLanguageName() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        LanguageAsset::getLanguageName,
                        java.util.stream.Collectors.counting()));

        // Simple mock-ish calculation for hours based on standard length (e.g. 10s per
        // clip)
        double totalHours = totalAssets * 10.0 / 3600.0;

        return ResponseEntity.ok(Map.of(
                "totalHours", String.format("%.2f", totalHours),
                "totalAssets", totalAssets,
                "languageCount", languageDistribution.size(),
                "distribution", languageDistribution.entrySet().stream()
                        .map(e -> Map.of("name", e.getKey(), "value", e.getValue()))
                        .sorted((a, b) -> {
                            long valA = ((Number) a.get("value")).longValue();
                            long valB = ((Number) b.get("value")).longValue();
                            return Long.compare(valB, valA);
                        })
                        .limit(5)
                        .collect(java.util.stream.Collectors.toList())));
    }
}
