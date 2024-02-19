package com.isa.customerservice.model.authModel;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.isa.customerservice.model.authModel.Permission.*;

@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    NORMAL_USER_READ,
                    NORMAL_USER_UPDATE,
                    NORMAL_USER_DELETE,
                    NORMAL_USER_CREATE
            )
    ),
    NORMAL_USER(
            Set.of(
                    NORMAL_USER_READ,
                    NORMAL_USER_UPDATE,
                    NORMAL_USER_DELETE,
                    NORMAL_USER_CREATE
            )
    );

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
