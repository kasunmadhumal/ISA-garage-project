package com.isa.customerservice.dto.customerAccountDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleDto {

    private String model;
    private String vehicleNumber;
    private String year;
    private String fuelType;
    private String vehicleType;
    private int numberOfSeats;
    private int numberOfDoors;
    private Double distanceLimit;
    private String vehicleImage;
    private String ownerEmail;

}
