package com.samm.mappointsaver.service;

import com.samm.mappointsaver.model.dto.PointDto;
import com.samm.mappointsaver.model.entity.Point;
import com.samm.mappointsaver.model.mapper.PointMapper;
import com.samm.mappointsaver.repository.PointRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PointService {

    private final PointRepository pointRepository;
    private final PointMapper pointMapper;

    public PointDto savePoint(@RequestBody PointDto pointDto) {

        Point point = pointMapper.pointDtoToPoint(pointDto);
        Point savedPoint = pointRepository.save(point);
        return pointMapper.pointToPointDto(savedPoint);
    }

    public PointDto deletePoint(@RequestBody PointDto pointDto) {
        Point point = pointRepository.getPointByInfo(pointDto.getLat(), pointDto.getLng(), pointDto.getDateTime());

        if(point == null) {
            return null;
        }

        PointDto removedPoint = pointMapper.pointToPointDto(point);
        pointRepository.deleteById(point.getId());
        return removedPoint;
    }

    public List<PointDto> getAllPoints() {
        List<Point> points = pointRepository.findAll();

        return points.stream()
                .map(pointMapper::pointToPointDto)
                .toList();
    }
}
