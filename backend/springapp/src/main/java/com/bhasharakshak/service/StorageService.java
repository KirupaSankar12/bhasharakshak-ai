package com.bhasharakshak.service;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final GridFsTemplate gridFsTemplate;

    public String storeFile(MultipartFile file) {
        try {
            ObjectId objectId = gridFsTemplate.store(
                    file.getInputStream(),
                    file.getOriginalFilename(),
                    file.getContentType());
            return objectId.toString();
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file in GridFS", ex);
        }
    }

    public GridFsResource getFile(String id) {
        return java.util.Optional.ofNullable(gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id))))
                .map(gridFsTemplate::getResource)
                .orElseThrow(() -> new RuntimeException("File not found with id " + id));
    }
}
