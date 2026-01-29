package com.bhasharakshak.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "assets")
public class LanguageAsset {
    @Id
    private String assetId;

    private String contributorId; // Anonymized
    private String languageName;
    private String dialect;
    private String targetLanguage;

    private String transcript; // Original text/transcript
    private String englishTranslation;

    // File paths or URLs
    private String audioUrl;

    private boolean consentGiven;
    private LocalDateTime consentTimestamp;

    private String status; // "pending", "verified"

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
