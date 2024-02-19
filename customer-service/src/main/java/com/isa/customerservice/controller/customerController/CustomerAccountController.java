package com.isa.customerservice.controller.customerController;

import com.isa.customerservice.dto.customerAccountDto.CustomerAccountDto;
import com.isa.customerservice.service.customerAccountService.CustomerAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer-account/")
public class CustomerAccountController {


    private final CustomerAccountService customerAccountService;


    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @GetMapping("{email}")
    public ResponseEntity<Optional<CustomerAccountDto>> profileDetails(@PathVariable("email") String email) {
        return ResponseEntity.ok(customerAccountService.getProfileDetails(email));
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @PostMapping
    public ResponseEntity<String> createProfile(@RequestBody CustomerAccountDto ownerAccountDto) {
        return ResponseEntity.ok(customerAccountService.createCustomerProfile(ownerAccountDto));
    }

    @PreAuthorize("hasRole('ROLE_NORMAL_USER')")
    @PutMapping
    public ResponseEntity<String> updateProfile(@RequestBody CustomerAccountDto customerAccountDto) {
        return ResponseEntity.ok(customerAccountService.updateCustomerProfile(customerAccountDto));
    }

}
