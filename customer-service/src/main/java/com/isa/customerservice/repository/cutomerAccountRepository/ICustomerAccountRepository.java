package com.isa.customerservice.repository.cutomerAccountRepository;

import com.isa.customerservice.model.customerAccountModel.CustomerAccount;
import org.springframework.data.couchbase.repository.Collection;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.isa.customerservice.config.dbConfig.CollectionNames.CUSTOMER_ACCOUNT_COLLECTION;

@Repository
@Collection(CUSTOMER_ACCOUNT_COLLECTION)
public interface ICustomerAccountRepository extends CouchbaseRepository<CustomerAccount, String>,
        PagingAndSortingRepository<CustomerAccount, String> {
    Optional<CustomerAccount> findByEmail(String email);
}
