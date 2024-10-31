package com.example.demo.service.product;

import com.example.demo.model.product.Category;
import com.example.demo.model.product.Product;

import java.util.List;

public interface IProductService {
    List<Product> findAllProducts();
    Product findProductById(int id);
    List<Product> searchByName(String productName);
    Product searchByCode(String productCode);
    List<Product> searchByCategory(Category category);
    void saveProduct(Product product);
    void deleteProduct(int id);
}
