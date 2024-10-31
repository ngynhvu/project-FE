package com.example.demo.repository.product;

import com.example.demo.model.product.Category;
import com.example.demo.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findProductsByProductNameContaining(String productName);
    List<Product> findProductsByCategory(Category category);
    Product findProductByProductCode(String productCode);
}
