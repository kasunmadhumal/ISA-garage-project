package com.isa.customerservice.repository.authRepository;

import com.isa.customerservice.model.authModel.User;
import org.springframework.data.couchbase.repository.Collection;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.isa.customerservice.config.dbConfig.CollectionNames.USER_COLLECTION;


@Collection(USER_COLLECTION)
@Repository
public interface UserRepository extends CouchbaseRepository<User, String> {
    Optional<User> findByEmail(String email);
}
