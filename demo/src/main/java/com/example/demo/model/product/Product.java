package com.example.demo.model.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Đây là mô tả của lớp Product
 * @author VuNH
 * @since 2024-10-13
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column(length = 30, nullable = false)
    private String productCode;

    @Column(length = 255, nullable = false)
    private String productName;

    @Column(nullable = false)
    private double productPrice;

    @Column(length = 255)
    private String productImgUrl;

    @Column(nullable = false)
    private boolean productStatus;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createDay;

    @UpdateTimestamp
    private LocalDateTime updateDay;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore // Ngăn chặn serialization vòng lặp
    @JsonManagedReference
    private Category category;

}
