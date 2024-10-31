package com.example.demo.controller.product;
import com.example.demo.Dto.product.ProductDto;
import com.example.demo.model.product.Category;
import com.example.demo.model.product.Product;
import com.example.demo.service.product.ICategoryService;
import com.example.demo.service.product.IProductService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    IProductService productService;
    @Autowired
    ICategoryService categoryService;
    /**
     * Hiển thị tất cả Product
     */
    @GetMapping("")
    public ResponseEntity<List<Product>> getListProduct(){
        List<Product> productList = productService.findAllProducts();
        if (productList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    /**
     * Hiển thị chi tiết Product
     */
    @GetMapping("/detail/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable int id){
        Product product = productService.findProductById(id);
        if (product == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    /**
     * Tìm kiếm theo productName
     */
    @GetMapping("/searchByProductName")
    public ResponseEntity<List<Product>> searchByProductName(@RequestParam(required = false) String productName){
        List<Product> productList = productService.searchByName(productName);
        if (productList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    /**
     * Tìm kiếm theo productCode
     */
    @GetMapping("/searchByProductCode")
    public ResponseEntity<Object> searchByProductCode(@RequestParam(required = false) String productCode){
        Product product = productService.searchByCode(productCode);
        if (product == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    /**
     * Tìm kiếm theo Category
     */
    @GetMapping("/searchByCategory")
    public ResponseEntity<List<Product>> searchByCategory(@RequestParam int categoryId){
        Category category = categoryService.findCategoryById(categoryId);
        if (category == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Product> productList = productService.searchByCategory(category);
        if (productList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    /**
     * Thêm mới Product
     */
    @PostMapping("/createProduct")
    public ResponseEntity<Object> addProduct(@Valid @RequestBody ProductDto productDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        productService.saveProduct(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    /**
     * Chỉnh sửa Product
     */
    @PatchMapping("/editProduct/{id}")
    public ResponseEntity<Object> editProduct(@PathVariable int id, @Valid @RequestBody ProductDto productDto, BindingResult bindingResult){
        Product existProduct = productService.findProductById(id);
        if (existProduct == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (bindingResult.hasErrors()){
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        BeanUtils.copyProperties(productDto, existProduct);
        productService.saveProduct(existProduct);
        return new ResponseEntity<>(existProduct, HttpStatus.OK);
    }
    /**
     * Xoá Product
     */
    @DeleteMapping("deleteProduct/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable int id){
        Product product = productService.findProductById(id);
        if (product == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteProduct(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
