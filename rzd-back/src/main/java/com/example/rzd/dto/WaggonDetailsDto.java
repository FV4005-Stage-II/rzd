package com.example.rzd.dto;

import com.example.rzd.entity.Place;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.Pair;

import java.util.List;

@Setter
@Getter
public class WaggonDetailsDto {
    List<Pair<String, List<Place>>> waggonsWithPlaces;
}
