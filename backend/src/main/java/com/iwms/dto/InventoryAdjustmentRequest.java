package com.iwms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class InventoryAdjustmentRequest {
    @NotNull @Positive
    private Long productId;

    @NotNull @Positive
    private Long warehouseId;

    @NotNull
    @Min(0) @Max(100000000)
    private Integer quantity; // Quantity to set or adjust by

    @NotBlank
    @Pattern(regexp = "SET|ADD|SUBTRACT", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Type must be SET, ADD or SUBTRACT")
    private String type; // "SET", "ADD", "SUBTRACT"

    @Min(0) @Max(100000000)
    private Integer reorderLevel; // Optional new reorder level to set
}
