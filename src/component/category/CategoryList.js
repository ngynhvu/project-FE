import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "../product/list/list.css"
import {getAllCategories} from "../../service/product/CategoryService";
import ModalDeleteCategory from "./ModalDeleteCategory";
function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [show, setShow] = useState(false);
    useEffect(() => {
        getCategories();
    },[])
    const getCategories = () => {
        getAllCategories().then((data) => {
            console.log(data)
            setCategories(data);
        });
        }
    const handleShow = (item) => {
        setCategory(item);
        setShow(true);
    }
    if (!categories){
        return <div>Loading...</div>
    }
    return (
        <div className="outer-div-1">
            <h3 className="container-1">Category Management</h3>
            <div className="container-1 mt-5">
                <div className="d-flex justify-content-between">
                    <h5 style={{marginRight: 'auto'}}>
                        <Link to="/product" className="btn btn-primary btn-create-1" style={{
                            borderRadius: '50px',
                            border: 'none',
                            backgroundColor: '#6c757d',
                            color: '#f5f5f5'
                        }}>
                             Back
                        </Link>
                    </h5>
                    <h5 style={{marginLeft: 'auto'}}>
                        <Link to="/createCategory" className="btn btn-primary btn-create-1" style={{
                            borderRadius: '50px',
                            border: 'none',
                            backgroundColor: '#bd965f',
                            color: '#f5f5f5'
                        }}>
                            <i className="fa-solid fa-circle-plus" style={{color: '#f5f5f5'}}></i> Create Category
                        </Link>
                    </h5>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr className="title-1">
                        <th style={{color: '#a1a3a3'}}>Name</th>
                        <th style={{color: '#a1a3a3'}}>Code</th>
                        <th style={{color: '#a1a3a3'}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories && categories.map((item) => (
                        <tr key={item.categoryId}>
                            <td>{item.categoryName}</td>
                            <td>{item.categoryCode}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="link"
                                        id="dropdown-basic"
                                        className="btn-dots-1"
                                        style={{
                                            border: 'none',
                                            borderRadius: '50px',
                                            backgroundColor: 'white',
                                            color: '#a1a3a3',
                                            padding: '0.5rem',
                                        }}
                                    >
                                        <i className="bi bi-three-dots"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="dropdown-item-1" as={Link} to={`/createCategory/${item.categoryId}`}>
                                            Update <i className="fa-solid fa-pen-to-square icon-hover-1"></i>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="dropdown-item-1" onClick={() => handleShow(item)}>
                                            Delete <i className="fa-solid fa-trash-can icon-hover-1"></i>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    {category && (
                        <ModalDeleteCategory
                            show={show}
                            setShow={setShow}
                            category={category}
                            getCategories={getCategories}
                        />
                    )}
                </table>
            </div>
        </div>
    )
}
export default CategoryList;