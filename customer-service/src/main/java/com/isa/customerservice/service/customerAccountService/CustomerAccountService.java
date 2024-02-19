package com.isa.customerservice.service.customerAccountService;

import com.isa.customerservice.dto.customerAccountDto.CustomerAccountDto;

import java.util.Optional;

public interface CustomerAccountService {

    Optional<CustomerAccountDto> getProfileDetails(String email);

    String createCustomerProfile(CustomerAccountDto ownerAccountDto);

    String updateCustomerProfile(CustomerAccountDto customerAccountDto);
}
