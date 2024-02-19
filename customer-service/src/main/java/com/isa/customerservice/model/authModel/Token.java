package com.isa.customerservice.model.authModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;

import java.util.Date;

import static com.isa.customerservice.config.dbConfig.CollectionNames.TOKEN_COLLECTION;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Collection(TOKEN_COLLECTION)
@Document
public class Token {

    @Id
    private String id;

    @Field
    private String token;

    @Field
    private TokenType tokenType;

    @Field
    private boolean revoked;

    @Field
    private boolean expired;

    @Field
    private User user;

    @LastModifiedBy
    private String lastModifiedBy;

    @LastModifiedDate
    private Date lastModification;

    @CreatedDate
    private Date creationDate;

    @Version
    private long version;

}
