package com.samm.mappointsaver;

import com.samm.mappointsaver.model.mapper.PointMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MapPointSaverApplication {

	@Bean
	public PointMapper pointMapper() {
		return PointMapper.INSTANCE;
	}

	public static void main(String[] args) {
		SpringApplication.run(MapPointSaverApplication.class, args);
	}

}
