package com.example.demo.Dto.product;

import com.example.demo.model.product.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
public class ProductDto implements Validator {
    private String productCode;
    private String productName;
    private double productPrice;
    private String productImgUrl;
    private boolean productStatus;
    private LocalDateTime createDay;
    private LocalDateTime updateDay;
    private Category category;

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductDto productDto = (ProductDto) target;
        if (productDto.getProductName().equals("")){
            errors.rejectValue("productName", null, "Not empty");
        }
        if (productDto.getProductPrice() == -1.0){
            errors.rejectValue("productPrice", null, "Price is required");
        } else if (productDto.getProductPrice() <= 0){
            errors.rejectValue("productPrice", null, "Price can not less than 0 VND");
        }
    }
}
