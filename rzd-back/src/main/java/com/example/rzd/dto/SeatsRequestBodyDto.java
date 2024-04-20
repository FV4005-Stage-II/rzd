package com.example.rzd.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class SeatsRequestBodyDto {
    private Long route_id;
    private List<ReservationSeatsDto> reservationSeatsDtos;
}
