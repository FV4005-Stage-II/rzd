package com.example.rzd.controllers;


import com.example.rzd.dto.*;

import com.example.rzd.entity.Route;
import com.example.rzd.service.MainRzdService;
import com.fasterxml.jackson.annotation.JsonFormat;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
public class RouteController {
    @Autowired
    MainRzdService mainRzdService;



    @GetMapping("/search-all-routes-day")
    @ResponseBody
    public List<RouteDetailsDTO> getAllRoutesInDay(@RequestParam String whence, @RequestParam String vhere,
                                                   @RequestParam @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate departureDate) {
        return mainRzdService.getAllDetailsRouteDay(whence, vhere, departureDate);
    }

    @GetMapping("/waggons-details")
    @ResponseBody
    public WaggonDetailsDto getDetailsAboutAvailableSeats(@RequestParam Long id) {
        return mainRzdService.getDetailsAvailableSeats(id);
    }

    @PostMapping("/reserve-seats")
    @ResponseBody
    public ResponseEntity<String> reserveSeats(@RequestBody SeatsRequestBodyDto seatsRequestBodyDto) {
        mainRzdService.reserveSeats(seatsRequestBodyDto);

//        if(seatsRequestBodyDto == null)
//            System.out.println("ДААААААААААААА");
//        if(seatsRequestBodyDto != null)
//            System.out.println("НЕЕЕЕЕТ");
//
//        if(seatsRequestBodyDto.getRoute_id() == 5)
//            System.out.println("ДА это 5");
        //System.out.println(seatsRequestBodyDto.getReservationSeatsDtos().get(0));
//        for (ReservationRequestDto reservation : request) {
//            String waggonName = reservation.getWaggonName();
//            List<Integer> selectedSeats = reservation.getSelectedSeats();
//            System.out.println("Вагон " + (Integer.parseInt(waggonName)) );
//            for (Integer i : selectedSeats)
//                System.out.println(i);
//        }
//
//        System.out.println();
//        {
//            "id": "5",
//            "waggons": [
//                {
//                    "waggonName": "1",
//                    "selectedSeats": [
//                        0
//                    ]
//                }
//            ]
//        }
        return new ResponseEntity<>("Места успешно забронированы", HttpStatus.OK);
    }
}


