package com.isa.customerservice.dto.customerAccountDto;

import com.isa.customerservice.model.customerAccountModel.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerAccountDto {

    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private int age;
    private String gender;
    private String profilePicture;
    private List<Vehicle> ownerVehicles;

}
