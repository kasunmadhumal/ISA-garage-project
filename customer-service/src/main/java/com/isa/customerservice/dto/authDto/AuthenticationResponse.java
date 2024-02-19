package com.isa.customerservice.dto.authDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.isa.customerservice.model.authModel.Permission;
import com.isa.customerservice.model.authModel.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("email")
    private String email;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    @JsonProperty("role")
    private Role role;
    @JsonProperty("permission")
    private Set<Permission> permission;


}
