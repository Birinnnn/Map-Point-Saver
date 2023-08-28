package com.samm.mappointsaver.repository;

import com.samm.mappointsaver.model.dto.PointDto;
import com.samm.mappointsaver.model.entity.Point;
import jakarta.persistence.OrderBy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {

    @Query("SELECT p FROM Point p WHERE p.lat = :lat AND p.lng = :lng AND p.dateTime = :dateTime")
    Point getPointByInfo(String lat, String lng, LocalDateTime dateTime);
}
