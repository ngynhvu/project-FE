import axios from "axios";

const URL_CATEGORY = "http://localhost:8080/api/category";
localStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5ndXllbnZ1Iiwic3ViIjoibmd1eWVudnUiLCJleHAiOjE3MzQ0MTE2MjB9.7iLdP5H8RwI3gWyzwmwkL0jSz1BVKcptMSNt8yuNcsQ");
export const getAllCategories = async () => {
    try {
        const response = await axios.get(URL_CATEGORY);
        return response.data;
    }catch (e) {
        console.log(e)
    }
}
export const getCategoryById = async (id) => {
    try {
        const response = await  axios.get(`${URL_CATEGORY}/${id}`);
        return response.data;
    }catch (e){
        console.log(e)
    }
}
export const updateCategory = async (category, id) => {
    const token = localStorage.getItem('token');
    try {
        await axios.patch(`${URL_CATEGORY}/${id}`, category, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }catch (e){
        console.log(e);
    }
}
export const deleteCategory = async (id) => {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`${URL_CATEGORY}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch (e) {
        console.log(e.message);
    }
}
export const createCategory = async (category) => {
    const token = localStorage.getItem('token');
    try {
        await axios.post(`${URL_CATEGORY}`, category, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch (e) {
        console.log(e.message);
    }
}
export const checkCategoryName = async (categoryName) => {
    try {
        const response = await axios.get(`${URL_CATEGORY}?categoryName=${categoryName}`,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    }catch (e) {
        console.log(e.message)
    }
}
