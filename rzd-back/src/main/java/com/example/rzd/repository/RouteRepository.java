package com.example.rzd.repository;


import com.example.rzd.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByWhenceAndVhereAndDepartureDate(String whence, String vhere, LocalDate departureDate);
    Route findByWhenceAndVhereAndDepartureDateAndDepartureTime(String whence, String vhere, LocalDate departureDate, LocalTime departureTime);

}