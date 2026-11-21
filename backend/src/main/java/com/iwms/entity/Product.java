package com.iwms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(min = 2, max = 120)
    @Column(nullable = false, length = 120)
    private String name;

    @NotBlank @Size(min = 2, max = 40) @Pattern(regexp = "^[A-Za-z0-9._-]+$")
    @Column(unique = true, nullable = false, length = 40)
    private String sku; // Stock Keeping Unit (e.g. PROD-1001)

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @NotNull @DecimalMin(value = "0.01") @Digits(integer = 10, fraction = 2)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @NotBlank @Size(max = 60)
    @Column(nullable = false, length = 60)
    private String category;

    @Size(max = 64)
    @Column(length = 64)
    private String barcode; // QR or barcode scan code

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
