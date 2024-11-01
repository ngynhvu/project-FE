import axios from "axios";

const URL_CATEGORY = "http://localhost:8080/api/category";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5ndXllbnZ1Iiwic3ViIjoibmd1eWVudnUiLCJleHAiOjE3MzM4ODkzNTN9.24Q3_H3BDt1PdJ2qV2go-RnBJP0EFS7hIOOF1f2gzPQ";
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
