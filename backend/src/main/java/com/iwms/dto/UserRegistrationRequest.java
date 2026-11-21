package com.iwms.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UserRegistrationRequest {
    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9._-]+$", message = "Username may contain letters, numbers, dot, underscore and hyphen only")
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 64)
    private String password;

    @NotBlank
    @Pattern(regexp = "ADMIN|WAREHOUSE_MANAGER|CUSTOMER", message = "Role must be ADMIN, WAREHOUSE_MANAGER or CUSTOMER")
    private String role; // Role enum name e.g. WAREHOUSE_MANAGER

    @Positive
    private Long warehouseId; // Optional link to warehouse
}
