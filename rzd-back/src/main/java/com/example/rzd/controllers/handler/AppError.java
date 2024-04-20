package com.example.rzd.controllers.handler;


import lombok.*;

@Data
@AllArgsConstructor
public class AppError {
    private int statusCode;
    private String message;
}
