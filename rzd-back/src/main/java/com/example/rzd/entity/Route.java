package com.example.rzd.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="route")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String whence;

    @Column(nullable=false)
    private String vhere;


    //@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "hh-mm-ss-nn")
    @DateTimeFormat(pattern = "kk:mm:ss")
    @Column(nullable = false)
    private LocalTime departureTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate departureDate;

    @DateTimeFormat(pattern = "kk:mm:ss")
    @Column(nullable = false)
    private LocalTime arrivalTime;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate arrivalDate;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "train_id", referencedColumnName = "id")
    private Train train;
}
