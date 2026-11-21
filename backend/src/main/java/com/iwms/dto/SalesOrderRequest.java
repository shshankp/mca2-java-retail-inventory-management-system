package com.iwms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class SalesOrderRequest {
    @NotBlank
    @Size(min = 2, max = 120)
    private String customerName;

    @NotNull @Positive
    private Long warehouseId; // Dispatching warehouse

    @NotEmpty
    @Size(max = 50)
    private List<@Valid OrderItemRequest> items;
}
