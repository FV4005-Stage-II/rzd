package com.example.rzd.controllers.handler;


import com.example.rzd.controllers.handler.responseEntity.ResourceTypeMismatchException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> catchMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException e) {
//        log.error(e.getMessage(), e);
        String message = "Неверный формат параметра: " + e.getName();
        return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), message), HttpStatus.BAD_REQUEST);
    }
     
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> catchHttpMessageNotReadableException(HttpMessageNotReadableException e) {
//        log.error(e.getMessage(), e);
        String message = e.getMessage();
        return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), message), HttpStatus.BAD_REQUEST);
    }
}
