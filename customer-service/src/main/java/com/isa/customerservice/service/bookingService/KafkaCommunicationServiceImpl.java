package com.isa.customerservice.service.bookingService;

import com.couchbase.client.core.deps.com.fasterxml.jackson.databind.ObjectMapper;
import com.isa.customerservice.dto.bookingDto.AcceptedBookings;
import com.isa.customerservice.dto.bookingDto.AvailableTimeSlot;
import com.isa.customerservice.dto.bookingDto.BookedTimeSlotDetails;
import com.isa.customerservice.model.bookingModel.AcceptedBookingTimeslot;
import com.isa.customerservice.model.bookingModel.AvailableTimeSlots;
import com.isa.customerservice.repository.bookingRepository.IAcceptedBookingTimeSlotRepository;
import com.isa.customerservice.repository.bookingRepository.IAvailableTimeSlotRepository;
import com.isa.customerservice.repository.bookingRepository.IBookedTimeSlotRepository;
import com.isa.customerservice.config.kafkaConfig.constant.TopicsNames;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Getter
@RequiredArgsConstructor
@Service
public class KafkaCommunicationServiceImpl implements KafkaCommunicationService {


    private final List<AvailableTimeSlot> availableTimeSlots = new ArrayList<>();

    private final List<AcceptedBookings> acceptedBookings = new ArrayList<>();

    private final KafkaTemplate<String, BookedTimeSlotDetails> kafkaTemplateForBookedTimeSlot;

    private final IAcceptedBookingTimeSlotRepository acceptedBookingTimeSlotRepository;

    private final IBookedTimeSlotRepository bookedTimeSlotRepository;

    private final IAvailableTimeSlotRepository availableTimeSlotRepository;



    @KafkaListener(topics = TopicsNames.AVAILABLE_TIME_SLOTS, groupId = "user-group")
    public void availableTimeSlots(List<AvailableTimeSlot> availableTimeSlot) {
        try {
            if (!availableTimeSlot.isEmpty()) {
                String object = availableTimeSlot.toString();
                String json = object.substring(1, object.length() - 1);
                ObjectMapper objectMapper = new ObjectMapper();
                AvailableTimeSlot resultObject = objectMapper.readValue(json, AvailableTimeSlot.class);
                if (resultObject.getStatus().equals("available")) {
                    availableTimeSlots.add(resultObject);
                    AvailableTimeSlots availableTimeSlotsObject = AvailableTimeSlots.builder()
                            .id(UUID.randomUUID().toString())
                            .key(resultObject.getKey())
                            .status(resultObject.getStatus())
                            .userEmailAddress(resultObject.getUserEmailAddress())
                            .timeSlotAllocatedDate(resultObject.getTimeSlotAllocatedDate())
                            .timeSlotAllocatedTime(resultObject.getTimeSlotAllocatedTime())
                            .timeSlotAllocatedDuration(resultObject.getTimeSlotAllocatedDuration())
                            .timeSlotAllocatedService(resultObject.getTimeSlotAllocatedService())
                            .numberOfVehiclesMaxAllowedForService(resultObject.getNumberOfVehiclesMaxAllowedForService())
                            .availableBookingCountForService(resultObject.getAvailableBookingCountForService())
                            .timeSlotAllocatedServiceDiscount(resultObject.getTimeSlotAllocatedServiceDiscount())
                            .build();
                    availableTimeSlotRepository.save(availableTimeSlotsObject);

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @KafkaListener(topics = TopicsNames.ACCEPTED_BOOKING, groupId = "user-group")
    public void acceptedTimeSlots(List<AcceptedBookings> acceptedBookings) {
        try {
            if (!acceptedBookings.isEmpty()) {
                System.out.println(acceptedBookings);
                String object = acceptedBookings.toString();
                String json = object.substring(1, object.length() - 1);
                ObjectMapper objectMapper = new ObjectMapper();
                AcceptedBookings resultObject = objectMapper.readValue(json, AcceptedBookings.class);
                this.acceptedBookings.add(resultObject);
                bookedTimeSlotRepository.deleteByKey(resultObject.getKey());

                AcceptedBookingTimeslot acceptedBookingTimeslot = AcceptedBookingTimeslot.builder()
                        .id(UUID.randomUUID().toString())
                        .key(resultObject.getKey())
                        .status(resultObject.getStatus())
                        .acceptedStatus(resultObject.getAcceptedStatus())
                        .userEmailAddress(resultObject.getUserEmailAddress())
                        .timeSlotAllocatedDate(resultObject.getTimeSlotAllocatedDate())
                        .timeSlotAllocatedTime(resultObject.getTimeSlotAllocatedTime())
                        .timeSlotAllocatedDuration(resultObject.getTimeSlotAllocatedDuration())
                        .timeSlotAllocatedService(resultObject.getTimeSlotAllocatedService())
                        .numberOfVehiclesMaxAllowedForService(resultObject.getNumberOfVehiclesMaxAllowedForService())
                        .availableBookingCountForService(resultObject.getAvailableBookingCountForService())
                        .timeSlotAllocatedServiceDiscount(resultObject.getTimeSlotAllocatedServiceDiscount())
                        .timeSlotAllocatedVehicles(resultObject.getTimeSlotAllocatedVehicles())
                        .build();

                acceptedBookingTimeSlotRepository.save(acceptedBookingTimeslot);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Override
    public void sendBookedTimeSlot(BookedTimeSlotDetails bookedTimeSlotDetails) {
        kafkaTemplateForBookedTimeSlot.send(TopicsNames.BOOKED_TIME_SLOTS, bookedTimeSlotDetails);
    }


}
