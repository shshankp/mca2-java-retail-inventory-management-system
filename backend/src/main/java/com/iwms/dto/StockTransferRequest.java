package com.iwms.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class StockTransferRequest {
    @NotNull @Positive
    private Long sourceWarehouseId;

    @NotNull @Positive
    private Long targetWarehouseId;

    @NotNull @Positive
    private Long productId;

    @NotNull
    @Min(1) @Max(100000000)
    private Integer quantity;
}
