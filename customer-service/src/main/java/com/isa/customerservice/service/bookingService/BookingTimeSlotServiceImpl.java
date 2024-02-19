package com.isa.customerservice.service.bookingService;

import com.isa.customerservice.dto.bookingDto.AcceptedBookings;
import com.isa.customerservice.dto.bookingDto.AvailableTimeSlot;
import com.isa.customerservice.dto.bookingDto.BookedTimeSlotDetails;
import com.isa.customerservice.model.bookingModel.AcceptedBookingTimeslot;
import com.isa.customerservice.model.bookingModel.AvailableTimeSlots;
import com.isa.customerservice.model.bookingModel.BookedServiceTimeSlot;
import com.isa.customerservice.repository.bookingRepository.IAcceptedBookingTimeSlotRepository;
import com.isa.customerservice.repository.bookingRepository.IAvailableTimeSlotRepository;
import com.isa.customerservice.repository.bookingRepository.IBookedTimeSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BookingTimeSlotServiceImpl implements BookingTimeSlotService {

    private final IBookedTimeSlotRepository bookedTimeSlotRepository;

    private final IAcceptedBookingTimeSlotRepository acceptedBookingTimeSlotRepository;

    private final KafkaCommunicationService kafkaCommunicationService;

    private final IAvailableTimeSlotRepository availableTimeSlotRepository;


    @Override
    public Optional<List<BookedServiceTimeSlot>> bookedServiceTimeSlots(String userEmail) {
        return Optional.ofNullable(bookedTimeSlotRepository.findByUserEmailAddress(userEmail));
    }

    @Override
    public Optional<String> bookServiceTimeSlot(BookedTimeSlotDetails bookedTimeSlotDetails) {

        BookedServiceTimeSlot bookedServiceTimeSlot = BookedServiceTimeSlot.builder()
                .id(UUID.randomUUID().toString())
                .key(bookedTimeSlotDetails.getKey())
                .userEmailAddress(bookedTimeSlotDetails.getUserEmailAddress())
                .status(bookedTimeSlotDetails.getStatus())
                .acceptedStatus(bookedTimeSlotDetails.getAcceptedStatus())
                .numberOfVehiclesMaxAllowedForService(bookedTimeSlotDetails.getNumberOfVehiclesMaxAllowedForService())
                .availableBookingCountForService(bookedTimeSlotDetails.getAvailableBookingCountForService())
                .timeSlotAllocatedDate(bookedTimeSlotDetails.getTimeSlotAllocatedDate())
                .timeSlotAllocatedTime(bookedTimeSlotDetails.getTimeSlotAllocatedTime())
                .timeSlotAllocatedDuration(bookedTimeSlotDetails.getTimeSlotAllocatedDuration())
                .timeSlotAllocatedService(bookedTimeSlotDetails.getTimeSlotAllocatedService())
                .timeSlotAllocatedServiceDiscount(bookedTimeSlotDetails.getTimeSlotAllocatedServiceDiscount())
                .timeSlotAllocatedVehicles(bookedTimeSlotDetails.getTimeSlotAllocatedVehicles())
                .build();

        kafkaCommunicationService.sendBookedTimeSlot(bookedTimeSlotDetails);
        availableTimeSlotRepository.deleteByKey(bookedTimeSlotDetails.getKey());
        bookedTimeSlotRepository.save(bookedServiceTimeSlot);
        return Optional.of("successfully booked");

    }

    @Override
    public Optional<String> updateServiceTimeSlot(BookedTimeSlotDetails bookedTimeSlotDetails, String id) {

        Optional<BookedServiceTimeSlot> bookedServiceTimeSlots = bookedTimeSlotRepository.findById(id);


        if (bookedServiceTimeSlots.isPresent()) {
            bookedServiceTimeSlots.get().setKey(bookedTimeSlotDetails.getKey());
            bookedServiceTimeSlots.get().setAcceptedStatus(bookedTimeSlotDetails.getAcceptedStatus());
            bookedServiceTimeSlots.get().setStatus(bookedTimeSlotDetails.getStatus());
            bookedServiceTimeSlots.get().setNumberOfVehiclesMaxAllowedForService(bookedTimeSlotDetails.getNumberOfVehiclesMaxAllowedForService());
            bookedServiceTimeSlots.get().setAvailableBookingCountForService(bookedTimeSlotDetails.getAvailableBookingCountForService());
            bookedServiceTimeSlots.get().setTimeSlotAllocatedDate(bookedTimeSlotDetails.getTimeSlotAllocatedDate());
            bookedServiceTimeSlots.get().setTimeSlotAllocatedTime(bookedTimeSlotDetails.getTimeSlotAllocatedTime());
            bookedServiceTimeSlots.get().setTimeSlotAllocatedDuration(bookedTimeSlotDetails.getTimeSlotAllocatedDuration());
            bookedServiceTimeSlots.get().setTimeSlotAllocatedService(bookedTimeSlotDetails.getTimeSlotAllocatedService());
            bookedServiceTimeSlots.get().setTimeSlotAllocatedServiceDiscount(bookedTimeSlotDetails.getTimeSlotAllocatedServiceDiscount());
            bookedServiceTimeSlots.get().setTimeSlotAllocatedVehicles(bookedTimeSlotDetails.getTimeSlotAllocatedVehicles());

            bookedTimeSlotRepository.save(bookedServiceTimeSlots.get());
        }

        return Optional.of("successfully updated");
    }


    @Override
    public Optional<String> deleteServiceTimeSlot(String id) {
        Optional<BookedServiceTimeSlot> bookedServiceTimeSlot = bookedTimeSlotRepository.findByKey(id);
        if (bookedServiceTimeSlot.isPresent()) {
            AvailableTimeSlots availableTimeSlots = AvailableTimeSlots.builder()
                    .id(UUID.randomUUID().toString())
                    .key(bookedServiceTimeSlot.get().getKey())
                    .status("available")
                    .userEmailAddress(bookedServiceTimeSlot.get().getUserEmailAddress())
                    .timeSlotAllocatedDate(bookedServiceTimeSlot.get().getTimeSlotAllocatedDate())
                    .timeSlotAllocatedTime(bookedServiceTimeSlot.get().getTimeSlotAllocatedTime())
                    .timeSlotAllocatedDuration(bookedServiceTimeSlot.get().getTimeSlotAllocatedDuration())
                    .timeSlotAllocatedService(bookedServiceTimeSlot.get().getTimeSlotAllocatedService())
                    .numberOfVehiclesMaxAllowedForService(bookedServiceTimeSlot.get().getNumberOfVehiclesMaxAllowedForService())
                    .availableBookingCountForService(bookedServiceTimeSlot.get().getAvailableBookingCountForService())
                    .timeSlotAllocatedServiceDiscount(bookedServiceTimeSlot.get().getTimeSlotAllocatedServiceDiscount())
                    .build();
            availableTimeSlotRepository.save(availableTimeSlots);
        }
        bookedTimeSlotRepository.deleteByKey(id);
        return Optional.of("successfully deleted");
    }


    @Override
    public List<AvailableTimeSlot> getAvailableTimeSlots() {
        List<AvailableTimeSlots> availableTimeSlots = availableTimeSlotRepository.findAll();
        List<AvailableTimeSlot> availableTimeSlotList = new ArrayList<>();
        for (AvailableTimeSlots availableTimeSlot : availableTimeSlots) {
            AvailableTimeSlot availableTimeSlotObj = AvailableTimeSlot.builder()
                    .key(availableTimeSlot.getKey())
                    .status(availableTimeSlot.getStatus())
                    .userEmailAddress(availableTimeSlot.getUserEmailAddress())
                    .timeSlotAllocatedDate(availableTimeSlot.getTimeSlotAllocatedDate())
                    .timeSlotAllocatedTime(availableTimeSlot.getTimeSlotAllocatedTime())
                    .timeSlotAllocatedDuration(availableTimeSlot.getTimeSlotAllocatedDuration())
                    .timeSlotAllocatedService(availableTimeSlot.getTimeSlotAllocatedService())
                    .numberOfVehiclesMaxAllowedForService(availableTimeSlot.getNumberOfVehiclesMaxAllowedForService())
                    .availableBookingCountForService(availableTimeSlot.getAvailableBookingCountForService())
                    .timeSlotAllocatedServiceDiscount(availableTimeSlot.getTimeSlotAllocatedServiceDiscount())
                    .build();
            availableTimeSlotList.add(availableTimeSlotObj);
        }

        return availableTimeSlotList;
    }

    @Override
    public List<AcceptedBookings> getAcceptedBookings(String userEmail) {

        List<AcceptedBookingTimeslot> acceptedBookingTimeslots = acceptedBookingTimeSlotRepository.findByUserEmailAddress(userEmail);
        List<AcceptedBookings> myBookings = new ArrayList<>();
        for (AcceptedBookingTimeslot acceptedBookingTimeslot : acceptedBookingTimeslots) {
            AcceptedBookings acceptedBookings = AcceptedBookings.builder()
                    .key(acceptedBookingTimeslot.getKey())
                    .status(acceptedBookingTimeslot.getStatus())
                    .acceptedStatus(acceptedBookingTimeslot.getAcceptedStatus())
                    .userEmailAddress(acceptedBookingTimeslot.getUserEmailAddress())
                    .timeSlotAllocatedDate(acceptedBookingTimeslot.getTimeSlotAllocatedDate())
                    .timeSlotAllocatedTime(acceptedBookingTimeslot.getTimeSlotAllocatedTime())
                    .timeSlotAllocatedDuration(acceptedBookingTimeslot.getTimeSlotAllocatedDuration())
                    .timeSlotAllocatedService(acceptedBookingTimeslot.getTimeSlotAllocatedService())
                    .numberOfVehiclesMaxAllowedForService(acceptedBookingTimeslot.getNumberOfVehiclesMaxAllowedForService())
                    .availableBookingCountForService(acceptedBookingTimeslot.getAvailableBookingCountForService())
                    .timeSlotAllocatedServiceDiscount(acceptedBookingTimeslot.getTimeSlotAllocatedServiceDiscount())
                    .timeSlotAllocatedVehicles(acceptedBookingTimeslot.getTimeSlotAllocatedVehicles())
                    .build();
            myBookings.add(acceptedBookings);
        }
        return myBookings;
    }

}
