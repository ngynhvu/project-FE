import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {createCategory, getAllCategories, getCategoryById, updateCategory} from "../../service/product/CategoryService";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import "../product/create-update/create-update.css"
function CategoryCreateUpdate() {
    const [category, setCategory] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const [nextCode, setNextCode] = useState("");
    const [initialValues, setInitialValues] = useState({
        categoryCode: "",
        categoryName: ""
    });
    useEffect(() => {
        if (id){
            getCategoryById(id).then((data) => {
                console.log(data)
                setCategory(data);
                setInitialValues((prevValue) => ({
                    ...prevValue,
                    categoryCode: data.categoryCode,
                    categoryName: data.categoryName
                }))
            })
        }else {
            getAllCategories().then((data) => {
                if (data && data.length > 0){
                    const lastCode = data[data.length - 1].categoryCode;
                    const lastNumber = parseInt(lastCode.split("-")[1]);
                    const newCode = `C-${lastNumber + 1}`;
                    setNextCode(newCode);
                    setInitialValues((prevState) => ({
                        ...prevState,
                        categoryCode: newCode
                    }));
                }
                else {
                    setNextCode("C-1");
                    setInitialValues((prevState) => ({
                        ...prevState,
                        categoryCode: "C-1"
                    }));
                }
            })
        }
    },[id])
    const validate = {
        categoryCode: Yup.string().matches(/^C-\d+$/, "Follow form C-X").required("categoryCode must be available"),
        categoryName: Yup.string().min(3, "Category name must be at least 3 characters").required("Not empty")
    }
    const handleSubmit = (value) => {
        if (id){
            updateCategory(value, id).then(() => {
                toast.success("Add new category success");
                navigate("/category")
            })
        }else {
            createCategory(value).then(() => {
                toast.success("Update category success");
                navigate("/category")
            })
        }
    }
    return(
        <>
            <div className="outer-div">
                <div className="container mt-5">
                    <div className="row g-3">
                        <h1 style={{
                            textAlign: "center",
                            color: "#2a2a2a",
                            backgroundColor: "#d3d3d3",
                            borderRadius: "10px",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
                        }}>
                            {id ? "Update Category" : "Create Category"}
                        </h1>
                        <div className="col-md-2">
                            <div className="container-fluid">
                                <div className="row">
                                    <nav className="col-md-3 vertical-nav">
                                        <div className="nav flex-column">
                                            <Link to={'/product'} className="nav-link">Home</Link>
                                            <a className="nav-link active" href="#">Create Product</a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <Formik initialValues={initialValues}
                                    enableReinitialize={true} // Allow Formik to reinitialize when initialValues change
                                    validationSchema={Yup.object(validate)}
                                    validateOnMount={true}
                                    onSubmit={handleSubmit}
                            >
                                {() => (
                                    <Form>
                                        {/* Input cho tên sản phẩm */}
                                        <div className="mb-3">
                                            <label htmlFor="categoryName" className="form-label">Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text" id="name-icon"><i className="bi bi-cup"></i></span>
                                                <Field
                                                    type="text"
                                                    name="categoryName"
                                                    className="form-control form-input-custom"
                                                    placeholder="Enter product name"
                                                />
                                            </div>
                                            <ErrorMessage name="categoryName" component="p" className="text-danger" />
                                        </div>

                                        {/* Input cho mã sản phẩm */}
                                        <div className="mb-3">
                                            <label htmlFor="categoryCode" className="form-label">Code</label>
                                            <div className="input-group">
                                                <span className="input-group-text" id="code-icon"><i className="bi bi-qr-code"></i></span>
                                                <Field
                                                    type="text"
                                                    name="categoryCode"
                                                    className="form-control form-input-custom"
                                                    readOnly
                                                />
                                            </div>
                                            <ErrorMessage name="categoryCode" component="p" className="text-danger" />
                                        </div>


                                        <hr />

                                        {/* Nút gửi */}
                                        <div className="d-flex justify-content-between">
                                            <Link to="/category" style={{ color: "black" }} className="btn-hover">Cancel</Link>
                                            <button type="submit"   onClick={() => console.log("Button clicked")} // Log để kiểm tra
                                                    className="btn btn-secondary btn-hover" style={{ border: "none", borderRadius: "50px", backgroundColor: "#bd965f" }}>
                                                {id ? "Update Category" : "Create Category"}
                                                <i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CategoryCreateUpdate;