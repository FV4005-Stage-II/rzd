package com.example.rzd.dto;


import com.example.rzd.entity.Route;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteDetailsDTO {
    Route route;
    private long numberOfAvailableSeats;
    private double minPrice;
}
