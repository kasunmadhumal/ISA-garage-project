package com.isa.customerservice.service.customerAccountService;

import com.isa.customerservice.dto.customerAccountDto.VehicleDto;
import com.isa.customerservice.model.customerAccountModel.Vehicle;

import java.util.List;
import java.util.Optional;

public interface CustomerVehicleService {
    String addVehicle(VehicleDto vehicleDto);

    String updateVehicle(VehicleDto vehicleDto);

    List<Vehicle> getAllVehicles(String email);

    Optional<String> deleteVehicle(String email, String vehicleNumber);
}