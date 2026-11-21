package com.iwms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "warehouses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(min = 2, max = 120)
    @Column(nullable = false, length = 120)
    private String name;

    @NotBlank @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String location;

    @NotNull @Min(1) @Max(100000000)
    @Column(nullable = false)
    private Integer capacity; // Max items it can store

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
