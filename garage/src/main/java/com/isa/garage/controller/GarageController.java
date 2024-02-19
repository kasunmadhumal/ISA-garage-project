package com.isa.garage.controller;

import com.isa.garage.dto.AcceptedBookings;
import com.isa.garage.dto.AvailableTimeSlot;
import com.isa.garage.dto.BookedTimeSlotDetails;
import com.isa.garage.service.GarageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("/garage")
public class GarageController {

    private final GarageService garageService;

    GarageController(GarageService garageService) {
        this.garageService = garageService;
    }


    @GetMapping("/booked-time-slots")
    public List<BookedTimeSlotDetails> bookedTimeSlots() {
        return garageService.bookedTimeSlotDetailsList();
    }

    @PostMapping("/accept-time-slot")
    public boolean acceptTimeSlot(@RequestBody AcceptedBookings acceptedBookings) {
        return garageService.acceptTimeSlot(acceptedBookings);
    }

    @PostMapping("/update-timeslot")
    public ResponseEntity<Map<String, String>> addServiceBookingTimeslot() throws InterruptedException {

        int range = 7;
        List<AvailableTimeSlot> availableTimeSlots = new ArrayList<>(Arrays.asList(
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-01")
                        .timeSlotAllocatedTime("09:00")
                        .timeSlotAllocatedDuration("2 hours")
                        .timeSlotAllocatedService("Oil Change")
                        .numberOfVehiclesMaxAllowedForService(5)
                        .availableBookingCountForService(5)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build(),
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-05")
                        .timeSlotAllocatedTime("14:00")
                        .timeSlotAllocatedDuration("3 hours")
                        .timeSlotAllocatedService("Tire Rotation")
                        .numberOfVehiclesMaxAllowedForService(8)
                        .availableBookingCountForService(8)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build(),
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-10")
                        .timeSlotAllocatedTime("10:30")
                        .timeSlotAllocatedDuration("1 hour")
                        .timeSlotAllocatedService("Car Wash")
                        .numberOfVehiclesMaxAllowedForService(3)
                        .availableBookingCountForService(3)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build(),
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-15")
                        .timeSlotAllocatedTime("11:00")
                        .timeSlotAllocatedDuration("2 hours")
                        .timeSlotAllocatedService("Brake Inspection")
                        .numberOfVehiclesMaxAllowedForService(6)
                        .availableBookingCountForService(6)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build(),
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-20")
                        .timeSlotAllocatedTime("13:30")
                        .timeSlotAllocatedDuration("1.5 hours")
                        .timeSlotAllocatedService("Wheel Alignment")
                        .numberOfVehiclesMaxAllowedForService(4)
                        .availableBookingCountForService(4)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build(),
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-25")
                        .timeSlotAllocatedTime("16:00")
                        .timeSlotAllocatedDuration("2.5 hours")
                        .timeSlotAllocatedService("Battery Replacement")
                        .numberOfVehiclesMaxAllowedForService(7)
                        .availableBookingCountForService(7)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build(),
                AvailableTimeSlot.builder()
                        .key(UUID.randomUUID().toString())
                        .status("available")
                        .userEmailAddress("")
                        .timeSlotAllocatedDate("2022-01-30")
                        .timeSlotAllocatedTime("08:00")
                        .timeSlotAllocatedDuration("4 hours")
                        .timeSlotAllocatedService("Full Service Maintenance")
                        .numberOfVehiclesMaxAllowedForService(10)
                        .availableBookingCountForService(10)
                        .timeSlotAllocatedServiceDiscount(0.0)
                        .build()
        ));
        while (range > 0) {
            boolean result = garageService.addServiceBookingTimeslot(
                    availableTimeSlots.get(range - 1)
            );
            System.out.println(result);
            Thread.sleep(1000);
            range--;
        }
        return new ResponseEntity<>(
                Map.of("message", "timeslot updated"),
                org.springframework.http.HttpStatus.OK
        );
    }

}
