package com.example.rzd.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteDto {

    private double price;


    private String whence;


    private String vhere;

    //@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "hh-mm-ss-nn")


    @DateTimeFormat(pattern = "kk:mm:ss")
    private LocalTime departureTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate departureDate;

    @DateTimeFormat(pattern = "kk:mm:ss")
    private LocalTime arrivalTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate arrivalDate;

}
