package com.iwms.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class PurchaseOrderRequest {
    @NotNull @Positive
    private Long supplierId;

    @NotNull @Positive
    private Long warehouseId;

    @NotEmpty
    @Size(max = 50)
    private List<@Valid OrderItemRequest> items;
}
