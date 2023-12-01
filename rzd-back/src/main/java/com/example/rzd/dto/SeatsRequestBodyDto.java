package com.example.rzd.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class SeatsRequestBodyDto {
    Long route_id;
    List<ReservationSeatsDto> reservationSeatsDtos;
}
