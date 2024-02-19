package com.isa.customerservice.repository.bookingRepository;

import com.isa.customerservice.model.bookingModel.BookedServiceTimeSlot;
import org.springframework.data.couchbase.repository.Collection;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.isa.customerservice.config.dbConfig.CollectionNames.BOOKED_SERVICE_TIME_SLOT_COLLECTION;

@Collection(BOOKED_SERVICE_TIME_SLOT_COLLECTION)
@Repository
public interface IBookedTimeSlotRepository extends CouchbaseRepository<BookedServiceTimeSlot, String> {

    void deleteByKey(String key);

    Optional<BookedServiceTimeSlot> findByKey(String key);

    List<BookedServiceTimeSlot> findByUserEmailAddress(String userEmail);
}
