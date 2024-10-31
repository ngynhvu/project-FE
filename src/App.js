import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";
import {ToastContainer} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import ProductList from "./component/product/list/ProductList";
import ProductCreate from "./component/product/create-update/ProductCreate";
import ProductUpdate from "./component/product/create-update/ProductUpdate";
import ProductDetail from "./component/product/create-update/ProductDetail";
import CategoryList from "./component/category/CategoryList";
import CategoryCreateUpdate from "./component/category/CategoryCreateUpdate";

function App() {
    return (
        <>
            <BrowserRouter>

                <Routes>
                    {/*<Route path="/" element={<Navigate to="/product" replace />} />*/}
                    <Route path="/product" element={<ProductList/>}/>
                    <Route path="/create" element={<ProductCreate/>}/>
                    <Route path="/product/:id" element={<ProductUpdate/>}/>
                    <Route path="/productDetail/:id" element={<ProductDetail/>}/>
                    <Route path="/category" element={<CategoryList/>}/>
                    <Route path="/createCategory/:id?" element={<CategoryCreateUpdate/>}/>


                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    )
}

export default App;
