package com.isa.customerservice.service.authService;

import com.isa.customerservice.dto.authDto.AuthenticationRequest;
import com.isa.customerservice.dto.authDto.AuthenticationResponse;
import com.isa.customerservice.dto.authDto.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {

    String register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
