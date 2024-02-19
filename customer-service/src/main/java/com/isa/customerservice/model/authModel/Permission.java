package com.isa.customerservice.model.authModel;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    NORMAL_USER_READ("normal_user:read"),
    NORMAL_USER_UPDATE("normal_user:update"),
    NORMAL_USER_CREATE("normal_user:create"),
    NORMAL_USER_DELETE("normal_user:delete");


    private final String permission;
}
