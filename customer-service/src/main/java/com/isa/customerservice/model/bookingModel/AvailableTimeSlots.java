package com.isa.customerservice.model.bookingModel;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;

import static com.isa.customerservice.config.dbConfig.CollectionNames.AVAILABLE_TIME_SLOT_COLLECTION;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Collection(AVAILABLE_TIME_SLOT_COLLECTION)
@Document
public class AvailableTimeSlots {

    @Id
    private String id;

    @Field
    private String key;

    @Field
    private String status;

    @Field
    private String userEmailAddress;

    @Field
    private String timeSlotAllocatedDate;

    @Field
    private String timeSlotAllocatedTime;

    @Field
    private String timeSlotAllocatedDuration;

    @Field
    private String timeSlotAllocatedService;

    @Field
    private int numberOfVehiclesMaxAllowedForService;

    @Field
    private int availableBookingCountForService;

    @Field
    private Double timeSlotAllocatedServiceDiscount;
}
