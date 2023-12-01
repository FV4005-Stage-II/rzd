package com.example.rzd.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;



@Getter
@Setter
public class ReservationSeatsDto {
    private String waggonName;
    private List<Integer> selectedSeats;
}
