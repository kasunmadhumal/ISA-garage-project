package com.isa.customerservice.service.bookingService;

import com.isa.customerservice.dto.bookingDto.AcceptedBookings;
import com.isa.customerservice.dto.bookingDto.AvailableTimeSlot;
import com.isa.customerservice.dto.bookingDto.BookedTimeSlotDetails;
import com.isa.customerservice.model.bookingModel.BookedServiceTimeSlot;

import java.util.List;
import java.util.Optional;

public interface BookingTimeSlotService {
    Optional<List<BookedServiceTimeSlot>> bookedServiceTimeSlots(String userEmail);

    Optional<String> bookServiceTimeSlot(BookedTimeSlotDetails bookedTimeSlotDetails);

    Optional<String> updateServiceTimeSlot(BookedTimeSlotDetails bookedTimeSlotDetails, String id);

    Optional<String> deleteServiceTimeSlot(String id);

    List<AvailableTimeSlot> getAvailableTimeSlots();

    List<AcceptedBookings> getAcceptedBookings(String userEmail);
}
