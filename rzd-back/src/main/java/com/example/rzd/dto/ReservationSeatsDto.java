package com.example.rzd.dto;

import lombok.Data;

import java.util.List;



@Data
public class ReservationSeatsDto {
    private String waggonName;
    private List<Integer> selectedSeats;
}
