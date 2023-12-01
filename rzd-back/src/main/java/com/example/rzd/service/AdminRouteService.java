package com.example.rzd.service;


import com.example.rzd.dto.RouteDto;
import com.example.rzd.entity.Place;
import com.example.rzd.entity.Route;
import com.example.rzd.entity.Train;
import com.example.rzd.entity.Waggon;
import com.example.rzd.repository.PlaceRepository;
import com.example.rzd.repository.RouteRepository;
import com.example.rzd.repository.WaggonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;

@Service
public class AdminRouteService {
    @Autowired
    RouteRepository routeRepository;
    @Autowired
    WaggonRepository waggonRepository;
    @Autowired
    PlaceRepository placeRepository;

    @Transactional // переписать на ФАБРИКУ для создания купе, электричек и тд
    public Route saveRoute(RouteDto routeDto) {
        Route route = new Route(null, routeDto.getWhence(), routeDto.getVhere(),
                routeDto.getDepartureTime(), routeDto.getDepartureDate(),
                routeDto.getArrivalTime(), routeDto.getArrivalDate(),
                null);

        Train train = new Train(null, "птичка", route, null);
        route.setTrain(train);

        route = routeRepository.save(route);

        double basePrice = routeDto.getPrice();

        for (int i = 1; i < 5; i++) {
            Waggon waggon = new Waggon(null, Integer.toString(i), train, null);
            waggon = waggonRepository.save(waggon);

            List<Place> places = new ArrayList<>();
            for (int j = 1; j < 55; j++) {
                final int currentJ = j;
                Place place = new Place(null, Integer.toString(j), Double.toString(j % 2 != 0 ? basePrice * 1.3 : basePrice), false, waggon);
                places.add(place);
            }
            placeRepository.saveAll(places);

            waggon.setPlaces(places);
            waggonRepository.save(waggon);
        }
        return route;
    }

    @Transactional // переписать на ФАБРИКУ для создания купе, электричек и тд
    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}
