package com.isa.customerservice.model.customerAccountModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;

import java.util.Date;
import java.util.List;

import static com.isa.customerservice.config.dbConfig.CollectionNames.CUSTOMER_ACCOUNT_COLLECTION;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Collection(CUSTOMER_ACCOUNT_COLLECTION)
@Document
public class CustomerAccount {
    @Id
    private String id;
    @Field
    private String firstName;
    @Field
    private String lastName;
    @Field
    private String email;
    @Field
    private String address;
    @Field
    private int age;
    @Field
    private String phoneNumber;
    @Field
    private String gender;
    @Field
    private String profilePicture;
    @Field
    private List<Vehicle> ownerVehicles;

    @LastModifiedBy
    private String lastModifiedBy;
    @LastModifiedDate
    private Date lastModification;
    @CreatedDate
    private Date creationDate;
    @Version
    private long version;

}
