package com.example.rzd.controllers.handler.responseEntity;

public class ResourceTypeMismatchException extends RuntimeException {
    public ResourceTypeMismatchException(String message) {
        super(message);
    }
}
