package com.bezkoder.spring.security.login.payload.request;

import jakarta.validation.constraints.NotNull;

public class VideoRequest {
    @NotNull
    private int speed;

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }
}
