package com.bhasharakshak.controller;

import com.bhasharakshak.model.LanguageAsset;
import com.bhasharakshak.repository.AssetRepository;
import com.bhasharakshak.service.AIService;
import com.bhasharakshak.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.mongodb.gridfs.GridFsResource;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/preservation")
@RequiredArgsConstructor
public class FileUploadController {

    private final StorageService storageService;
    private final AIService aiService;
    private final AssetRepository assetRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAudio(
            @RequestParam("file") MultipartFile file,
            @RequestParam("language") String language,
            @RequestParam("dialect") String dialect,
            @RequestParam(value = "targetLanguage", defaultValue = "English") String targetLanguage,
            @RequestParam("consent") boolean consent) {
        try {
            if (!consent) {
                return ResponseEntity.badRequest().body("Consent is mandatory.");
            }

            // 1. Store File (Returns GridFS ID)
            String fileId = storageService.storeFile(file);
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/v1/preservation/files/")
                    .path(java.util.Objects.requireNonNull(fileId))
                    .toUriString();

            // 2. Perform STT (Safe execution)
            String transcript;
            try {
                transcript = aiService.transcribeAudio(file, language);
            } catch (Exception ex) {
                System.err.println("AI Service unavailable: " + ex.getMessage());
                transcript = "Transcription unavailable (AI Service down)";
            }

            // 3. Create Asset
            LanguageAsset asset = new LanguageAsset();
            asset.setAssetId(UUID.randomUUID().toString());
            asset.setContributorId("ANON-" + UUID.randomUUID().toString().substring(0, 8));
            asset.setLanguageName(language);
            asset.setDialect(dialect);
            asset.setTargetLanguage(targetLanguage);
            asset.setAudioUrl(fileUrl);
            asset.setTranscript(transcript);
            asset.setConsentGiven(consent);
            asset.setConsentTimestamp(LocalDateTime.now());
            asset.setStatus("pending");
            asset.setCreatedAt(LocalDateTime.now());
            asset.setUpdatedAt(LocalDateTime.now());

            assetRepository.save(asset);

            return ResponseEntity.ok(asset);

        } catch (Exception e) {
            e.printStackTrace();
            java.io.StringWriter sw = new java.io.StringWriter();
            java.io.PrintWriter pw = new java.io.PrintWriter(sw);
            e.printStackTrace(pw);
            return ResponseEntity.internalServerError()
                    .body("Upload failed: " + e.toString() + "\nStack: " + sw.toString());
        }
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable String id) {
        GridFsResource resource = storageService.getFile(id);
        return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType(resource.getContentType()))
                .body(resource);
    }
}
