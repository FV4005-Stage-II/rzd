package com.example.rzd.repository;

import com.example.rzd.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    @Modifying
    @Query("UPDATE Place p " +
            "SET p.occupied = true " +
            "WHERE p.waggon.id IN (SELECT w.id FROM Waggon w WHERE w.numberWaggon = :number_waggon AND w.train.route.id = :route_id) " +
            "AND p.number_place = :number_place")
    void updatePlacesOfOccupied(@Param("route_id") Long routeId, @Param("number_waggon") String numberWaggon, @Param("number_place") String numberPlace);
}