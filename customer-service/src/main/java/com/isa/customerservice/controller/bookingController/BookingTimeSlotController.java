package com.isa.customerservice.controller.bookingController;

import com.isa.customerservice.dto.bookingDto.AcceptedBookings;
import com.isa.customerservice.dto.bookingDto.AvailableTimeSlot;
import com.isa.customerservice.dto.bookingDto.BookedTimeSlotDetails;
import com.isa.customerservice.model.bookingModel.BookedServiceTimeSlot;
import com.isa.customerservice.service.bookingService.BookingTimeSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/time-slots/")
public class BookingTimeSlotController {

    private final BookingTimeSlotService bookingTimeSlotService;


    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @GetMapping("booked/{userEmail}")
    public Optional<List<BookedServiceTimeSlot>> bookedServiceTimeSlots(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok(bookingTimeSlotService.bookedServiceTimeSlots(userEmail)).getBody();
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @PostMapping
    public Optional<String> bookServiceTimeSlot(@RequestBody BookedTimeSlotDetails bookedTimeSlotDetails) {
        return ResponseEntity.ok(bookingTimeSlotService.bookServiceTimeSlot(bookedTimeSlotDetails)).getBody();
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @PutMapping("{id}")
    public Optional<String> updateServiceTimeSlot(@PathVariable("id") String id, @RequestBody BookedTimeSlotDetails bookedTimeSlotDetails) {
        return ResponseEntity.ok(bookingTimeSlotService.updateServiceTimeSlot(bookedTimeSlotDetails, id)).getBody();
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @DeleteMapping("{id}")
    public String deleteServiceTimeSlot(@PathVariable("id") String id) {
        return ResponseEntity.ok(bookingTimeSlotService.deleteServiceTimeSlot(id).orElse(null)).getBody();
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @GetMapping("available")
    public List<AvailableTimeSlot> availableTimeSlots() {
        return ResponseEntity.ok(bookingTimeSlotService.getAvailableTimeSlots()).getBody();
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @GetMapping("accepted/{userEmail}")
    public List<AcceptedBookings> acceptedBookings(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok(bookingTimeSlotService.getAcceptedBookings(userEmail)).getBody();
    }

}
