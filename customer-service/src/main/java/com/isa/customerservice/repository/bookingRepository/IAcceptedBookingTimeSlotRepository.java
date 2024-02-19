package com.isa.customerservice.repository.bookingRepository;


import com.isa.customerservice.model.bookingModel.AcceptedBookingTimeslot;
import org.springframework.data.couchbase.repository.Collection;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.isa.customerservice.config.dbConfig.CollectionNames.ACCEPTED_BOOKING_COLLECTION;

@Collection(ACCEPTED_BOOKING_COLLECTION)
@Repository
public interface IAcceptedBookingTimeSlotRepository extends CouchbaseRepository<AcceptedBookingTimeslot, String> {

    List<AcceptedBookingTimeslot> findByUserEmailAddress(String userEmailAddress);
}
