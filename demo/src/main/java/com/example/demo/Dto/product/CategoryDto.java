package com.example.demo.Dto.product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto implements Validator {
    private String categoryCode;
    private String categoryName;
    private String categoryImgUrl;

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        CategoryDto categoryDto = (CategoryDto) target;
        if (categoryDto.getCategoryName().equals("")){
            errors.rejectValue("categoryName", null, "Not empty");
        }
    }
}
