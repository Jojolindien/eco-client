import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { getCategory, updateCategory } from "../../../functions/category";
import AdminNav from "../../../component/nav/AdminNav";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../component/form/CategoryForm";

const CategoryUpdate = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(slug).then((c) => setName(c.name));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, name, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.name} updated"`);
        // `${res.data.name} is created"`
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        // if(err.response.status === 400) toast.error(err.response.data);
        toast.error(err.code);
      });
    setLoading(false);
    setName("");
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h2>Category update Admin Page</h2>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
