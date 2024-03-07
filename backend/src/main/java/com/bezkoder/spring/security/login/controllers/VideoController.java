package com.bezkoder.spring.security.login.controllers;

import com.bezkoder.spring.security.login.payload.request.VideoRequest;
import com.bezkoder.spring.security.login.payload.response.MessageResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/video")
public class VideoController {

    @PostMapping("/speed")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> postSpeed(@Valid @RequestBody VideoRequest videoRequest) {
        int clicks = videoRequest.getSpeed();
        if (clicks > 30) {
            clicks = 30;
        }
        float speed = (float) clicks / 2;
        return ResponseEntity.ok(new MessageResponse(String.valueOf(speed)));
    }
}
