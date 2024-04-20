package com.example.rzd.controllers;


import com.example.rzd.dto.RouteDto;
import com.example.rzd.entity.Route;

import com.example.rzd.service.AdminRouteService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class RouteAdminController {

    private final AdminRouteService adminRouteService;


    @PostMapping("/add-route")
    @ResponseBody
    public Route addRoute(@RequestBody RouteDto routeDto) {
        return adminRouteService.saveRoute(routeDto);
    }

    @DeleteMapping("/delete-route")
    @ResponseBody
    public ResponseEntity<?> deleteRoute(@RequestParam Long id) {
        adminRouteService.deleteRoute(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
