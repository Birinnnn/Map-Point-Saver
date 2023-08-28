package com.samm.mappointsaver.controller;

import com.samm.mappointsaver.model.dto.PointDto;
import com.samm.mappointsaver.service.PointService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/points")
public class PointController {

    private final PointService pointService;

    @PostMapping("/add")
    public ResponseEntity<PointDto> savePoint(@RequestBody PointDto pointDto) {
        return ResponseEntity.ok(pointService.savePoint(pointDto));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<PointDto>> getAllPoints() {
        return ResponseEntity.ok(pointService.getAllPoints());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<PointDto> deletePoint(@RequestBody PointDto pointDto) {
        return ResponseEntity.ok(pointService.deletePoint(pointDto));
    }
}
