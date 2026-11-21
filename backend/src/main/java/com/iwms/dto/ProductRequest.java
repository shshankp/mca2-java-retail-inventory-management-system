package com.iwms.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Size(min = 2, max = 40)
    @Pattern(regexp = "^[A-Za-z0-9._-]+$", message = "SKU may contain only letters, numbers, dot, underscore and hyphen")
    private String sku;

    @Size(max = 1000)
    private String description;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotBlank
    @Size(max = 60)
    private String category;

    @Size(max = 64)
    private String barcode;
}
