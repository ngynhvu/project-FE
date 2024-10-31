package com.example.demo.service.product.impl;

import com.example.demo.model.product.Category;
import com.example.demo.model.product.Product;
import com.example.demo.repository.product.IProductRepository;
import com.example.demo.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    IProductRepository productRepository;

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product findProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> searchByName(String productName) {
        return productRepository.findProductsByProductNameContaining(productName);
    }

    @Override
    public Product searchByCode(String productCode) {
        return productRepository.findProductByProductCode(productCode);
    }

    @Override
    public List<Product> searchByCategory(Category category) {
        return productRepository.findProductsByCategory(category);
    }

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
}
