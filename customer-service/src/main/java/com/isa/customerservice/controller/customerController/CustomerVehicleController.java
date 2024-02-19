package com.isa.customerservice.controller.customerController;


import com.isa.customerservice.dto.customerAccountDto.VehicleDto;
import com.isa.customerservice.model.customerAccountModel.Vehicle;
import com.isa.customerservice.service.customerAccountService.CustomerVehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer-vehicle/")
public class CustomerVehicleController {


    private final CustomerVehicleService customerVehicleService;


    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @PostMapping
    public ResponseEntity<String> addVehicle(@RequestBody VehicleDto vehicleDto) {
        return ResponseEntity.ok(customerVehicleService.addVehicle(vehicleDto));
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @PutMapping
    public ResponseEntity<String> updateVehicle(@RequestBody VehicleDto vehicleDto) {
        return ResponseEntity.ok(customerVehicleService.updateVehicle(vehicleDto));
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @GetMapping("all-vehicles/{email}")
    public ResponseEntity<List<Vehicle>> getAllVehicles(@PathVariable("email") String email) {
        return ResponseEntity.ok(customerVehicleService.getAllVehicles(email));
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @DeleteMapping("{email}/{vehicleNumber}")
    public ResponseEntity<Optional<String>> deleteVehicle(@PathVariable("email") String email,
                                                          @PathVariable("vehicleNumber") String vehicleNumber) {
        return ResponseEntity.ok(customerVehicleService.deleteVehicle(email, vehicleNumber));
    }

}
