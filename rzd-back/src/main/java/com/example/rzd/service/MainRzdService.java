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
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class MainRzdService {

    private final RouteRepository routeRepository;



    private final PlaceRepository placeRepository;




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
    }

}

