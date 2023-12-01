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


//    @Modifying
//    @Query("UPDATE Place p SET p.occupied = true WHERE p.waggon.id IN (SELECT w.id FROM Waggon w WHERE w.numberWaggon = :number_waggon AND w.train.route.id = :route_id) AND p.numberPlace = :number_place")
//    void updatePlacesOfOccupied(@Param("route_id") Long routeId, @Param("number_waggon") String numberWaggon, @Param("number_place") String numberPlace);

//    @Modifying
//    @Query("update Place p set p.occupied = true where p.waggon.id in (select w.id from Waggon w where w.numberWaggon = :number_waggon and w.train.route.id = :route_id) and p.numberPlace = :number_place")
//    void updatePlacesOfOccupied(@Param(value = "route_id") Long id, @Param(value = "number_waggon") String numberWaggon, @Param(value = "number_place") String numberPlace);

//    @Modifying
//    @Query("update Place p set p.occupied = true where p.waggon.id in (select w.id from Waggon w where w.numberWaggon = :number_waggon and w.train.id in (select t.id from Train t where t.route.id = :route_id)) and p.numberPlace = :number_place")
//    void updatePlacesOfOccupied(@Param(value = "route_id") Long id, @Param(value = "number_waggon") String numberWaggon, @Param(value = "number_place") String numberPlace);


//    @Modifying
//    @Query("update place set occupied = true from route, train, waggon where route.id= :route_id and waggon.number_waggon = :number_waggon and place.number_place = :number_place and waggon.id=place.waggon_id and train.id = waggon.train_id and route.id=train.route_id")
//    void updatePlacesOfOccupied(@Param(value = "route_id") Long id, @Param(value = "number_waggon") String numberWaggon, @Param(value = "number_place") String numberPlace);
}
//    update place set occupied = true from route, train, waggon where route.id=5 and waggon.number_waggon = '1' and place.number_place = '1' and waggon.id=place.waggon_id and train.id = waggon.train_id and route.id=train.route_id;