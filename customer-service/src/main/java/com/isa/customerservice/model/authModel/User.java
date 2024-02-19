package com.isa.customerservice.model.authModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.couchbase.core.mapping.Document;
import org.springframework.data.couchbase.core.mapping.Field;
import org.springframework.data.couchbase.repository.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.List;

import static com.isa.customerservice.config.dbConfig.CollectionNames.USER_COLLECTION;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Collection(USER_COLLECTION)
@Document
public class User implements UserDetails {

    @Id
    private String id;

    @Field
    private String firstname;

    @Field
    private String lastname;

    @Field
    private String email;

    @Field
    private String password;

    @Field
    private Role role;

    @Field
    private List<Token> tokens;

    @LastModifiedBy
    private String lastModifiedBy;

    @LastModifiedDate
    private Date lastModification;

    @CreatedDate
    private Date creationDate;

    @Version
    private long version;

    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
