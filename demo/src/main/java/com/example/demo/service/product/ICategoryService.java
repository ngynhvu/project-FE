package com.example.demo.service.product;

import com.example.demo.model.product.Category;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ICategoryService {
    List<Category> findAllCategories();
    Category findCategoryById(int id);
    void saveCategory(Category category);
    void deleteCategory(int id);
}
