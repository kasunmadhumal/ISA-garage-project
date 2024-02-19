package com.isa.customerservice.service.bookingService;

import com.isa.customerservice.dto.bookingDto.AcceptedBookings;
import com.isa.customerservice.dto.bookingDto.AvailableTimeSlot;
import com.isa.customerservice.dto.bookingDto.BookedTimeSlotDetails;

import java.util.List;

public interface KafkaCommunicationService {
    void sendBookedTimeSlot(BookedTimeSlotDetails bookedTimeSlotDetails);

    List<AvailableTimeSlot> getAvailableTimeSlots();

    List<AcceptedBookings> getAcceptedBookings();
}