import axios from "axios";

const URL_PRODUCT = "http://localhost:8080/api/product";
localStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5ndXllbnZ1Iiwic3ViIjoibmd1eWVudnUiLCJleHAiOjE3MzM5MDQwNDR9.3Dy69-ETp3rWQ1m13Ttw2VjjjFASdlzqdysshSKx_l0");
export const getAllProducts = async (page , size, sortBy, sortOrder) => {
    try {
        const response = await axios.get(`${URL_PRODUCT}?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }catch (e) {
        console.log(e.message);
    }
}
export const searchProductsByName = async (name, page, size) => {
    try {
        const response = await axios.get(`${URL_PRODUCT}/searchByProductName?productName=${name}&page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }catch (e) {
        console.log(e.message)
    }
}
export const searchProductsByCategory = async (categoryId, page, size) => {
    try {
        const response = await axios.get(`${URL_PRODUCT}/searchByCategory?categoryId=${categoryId}&page=${page}&size=${size}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
            });
        return response;
    }catch (e) {
        console.log(e.message);
    }
}
export const searchProductByCode = async (productCode) => {
    try {
        const response = await axios.get(`${URL_PRODUCT}/searchByProductCode?productCode=${productCode}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
}
export const createProduct = async (product) => {
    const token = localStorage.getItem('token');
    try {
        await axios.post(URL_PRODUCT, product, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Token cần phải tồn tại và hợp lệ
            }
        })
    }catch (e) {
        console.log(e.message)
    }
}
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${URL_PRODUCT}/${id}`, {
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        return response.data;
    }catch (e) {
        console.log(e.message)
    }
}
export const updateProduct = async (product, id) => {
    const token = localStorage.getItem('token');

    try {
        await axios.patch(`${URL_PRODUCT}/${id}`, product, {
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch (e) {
        console.log(e.message);
    }
}
export const deleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`${URL_PRODUCT}/${id}`, {
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch (e) {
        console.log(e.message)
    }
}