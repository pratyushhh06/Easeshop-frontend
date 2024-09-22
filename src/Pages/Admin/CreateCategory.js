import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";
import AdminMenu from "../../Components/AdminMenu";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Entering");
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/category/create-category",
        { name },
        {
          headers: { authorization: `${localStorage.getItem("token")}` },
        }
      );
      console.log("here");

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName, user: { _id: "66ab85d6e500f51629877188" } },
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFiODVkNmU1MDBmNTE2Mjk4NzcxODgiLCJpYXQiOjE3MjI4Njc3OTEsImV4cCI6MTcyMzQ3MjU5MX0.kkk2SzBlJEcydeLfU8JRkCy4QTc23UzGSMkGg_JWJq8",
          },
        }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async (pId) => {
    console.log("Delete function triggered with ID:", pId); 
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFiODVkNmU1MDBmNTE2Mjk4NzcxODgiLCJpYXQiOjE3MjI4Njc3OTEsImV4cCI6MTcyMzQ3MjU5MX0.kkk2SzBlJEcydeLfU8JRkCy4QTc23UzGSMkGg_JWJq8",
          },
        }
      );
      console.log("Delete Response:", data); 
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during delete:", error); 
      toast.error("Something went wrong during deletion");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 style={{ textAlign: "left" }}>Manage Category</h1>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2 m-1"
                        onClick={() => {
                          setOpen(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
