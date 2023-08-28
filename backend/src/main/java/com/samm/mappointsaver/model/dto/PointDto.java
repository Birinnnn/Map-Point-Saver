package com.samm.mappointsaver.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PointDto {
    private Long id;
    private String lat;
    private String lng;
    private LocalDateTime dateTime;
}
