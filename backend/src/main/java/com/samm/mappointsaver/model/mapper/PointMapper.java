package com.samm.mappointsaver.model.mapper;

import com.samm.mappointsaver.model.dto.PointDto;
import com.samm.mappointsaver.model.entity.Point;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PointMapper {
    PointMapper INSTANCE = Mappers.getMapper(PointMapper.class);

    PointDto pointToPointDto(Point point);

    @Mapping(target = "id", ignore = true)
    Point pointDtoToPoint(PointDto pointDto);
}
