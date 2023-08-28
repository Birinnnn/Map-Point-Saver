package com.samm.mappointsaver.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.processing.Generated;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lat;
    private String lng;

    private LocalDateTime dateTime;
}
