package com.example.rzd.service;



import com.example.rzd.dto.*;
import com.example.rzd.entity.Place;
import com.example.rzd.entity.Route;
import com.example.rzd.entity.Train;
import com.example.rzd.entity.Waggon;
import com.example.rzd.repository.PlaceRepository;
import com.example.rzd.repository.RouteRepository;
import com.example.rzd.repository.TrainRepository;
import com.example.rzd.repository.WaggonRepository;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class MainRzdService {
    @Autowired
    RouteRepository routeRepository;
    @Autowired
    TrainRepository trainRepository;
    @Autowired
    WaggonRepository waggonRepository;
    @Autowired
    PlaceRepository placeRepository;



    @Transactional
    public List<RouteDetailsDTO> getAllDetailsRouteDay(String whence, String vhere, LocalDate departureDate) {
        List<RouteDetailsDTO> trainDetailsDTOs = new ArrayList<>();
        for (Route route : routeRepository.findByWhenceAndVhereAndDepartureDate(whence, vhere, departureDate)) {
            RouteDetailsDTO trainDetailsDTO = new RouteDetailsDTO();
            trainDetailsDTO.setRoute(route);

            Train train = route.getTrain();

            long totalAvailableSeats = 0;
            double minPrice = Double.MAX_VALUE;

            for (Waggon waggon : train.getWaggons()) {
                totalAvailableSeats += waggon.getPlaces().stream().filter(place -> !place.isOccupied()).count();
                double waggonMinPrice = waggon.getPlaces().stream()
                        .filter(place -> !place.isOccupied())
                        .mapToDouble(place -> Double.parseDouble(place.getPrice()))
                        .min()
                        .orElse(0);
                if (waggonMinPrice < minPrice) {
                    minPrice = waggonMinPrice;
                }
            }

            trainDetailsDTO.setNumberOfAvailableSeats(totalAvailableSeats);
            trainDetailsDTO.setMinPrice(minPrice);
            trainDetailsDTOs.add(trainDetailsDTO);
        }
        return trainDetailsDTOs;
    }

    @Transactional
    public WaggonDetailsDto getDetailsAvailableSeats(Long id) { // exception not find must add
        Train train = routeRepository.findById(id).get().getTrain();
        WaggonDetailsDto waggonDetailsDto = new WaggonDetailsDto();
        List<Pair<String, List<Place>>> waggonsWithPlaces = new ArrayList<>();
        for (Waggon waggon : train.getWaggons())
            waggonsWithPlaces.add(new Pair<>(waggon.getNumberWaggon(), waggon.getPlaces()));

        waggonDetailsDto.setWaggonsWithPlaces(waggonsWithPlaces);
        return waggonDetailsDto;
    }

    @Transactional
    public void reserveSeats(SeatsRequestBodyDto reservationSeatsDtos) {
        for (ReservationSeatsDto seats : reservationSeatsDtos.getReservationSeatsDtos())
            for (Integer seat : seats.getSelectedSeats())
                placeRepository.updatePlacesOfOccupied(reservationSeatsDtos.getRoute_id(), seats.getWaggonName(), Integer.toString(seat + 1));


//        for (ReservationSeatsDto reservation : reservationSeatsDtos) {
//            String waggonName = reservation.getWaggonName();
//            List<Integer> selectedSeats = reservation.getSelectedSeats();
//            System.out.println("Вагон " + (Integer.parseInt(waggonName)) );
//            for (Integer i : selectedSeats)
//                System.out.println(i);
//        }
//
//        System.out.println();
//select route.id,place.id,place.occupied,place.waggon_id from place join waggon on waggon.id=place.waggon_id join train on train.id = waggon.train_id join route on route.id=train.route_id where route.id = 5;
//        UPDATE table1
//        SET column_to_update = 'новое_значение'
//        FROM table2
//        WHERE table1.common_id = table2.common_id
//        AND table2.some_condition = 'некоторое_условие';
//
//
//
//        UPDATE table1
//        SET column_to_update = 'новое_значение'
//        FROM table2, table3, table4
//        WHERE table1.common_id = table2.common_id
//        AND table2.some_condition = 'некоторое_условие'
//        AND table1.common_id = table3.common_id
//        AND table3.another_condition = 'другое_условие'
//        AND table1.common_id = table4.common_id
//        AND table4.yet_another_condition = 'еще_одно_условие';

//        update place set occupied = false from route, train, waggon where route.id=5 and waggon.number_waggon = '1' and place.number_place = '1' and waggon.id=place.waggon_id and train.id = waggon.train_id and route.id=train.route_id;
    }

}

