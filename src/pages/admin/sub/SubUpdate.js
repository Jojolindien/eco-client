import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { shallowEqual, useSelector } from "react-redux";
import { Button } from "antd";
import AdminNav from "../../../component/nav/AdminNav";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../component/form/CategoryForm";
import { getSub, getSubs, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";

const SubUpdate = () => {
  const user = useSelector((state) => state.user, shallowEqual);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadSub();
    loadCategories();
  }, []);

  const loadSub = () => {
    getSub(slug).then((s) => {
      setName(s.name);
      setParent(s.parent);
    });
  };

  const loadCategories = () => {
    setLoading("true");
    try {
      getCategories().then((c) => setCategories(c.data));
    } catch (error) {
      console.error("Error loading categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        toast.success(`${res.data.name} updated"`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        // if(err.response.status === 400) toast.error(err.response.data);
        toast.error(err.code);
      })
      .finally(() => {
        setLoading(false);
        setName("");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-4 offset-md-2 ">
          <h2>Sub update Admin Page</h2>
          <div className="form-group my-2">
            <label>Parent category</label>
            <select
              name="parent"
              className="form-control my-3"
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">Please select a parent category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
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

export default SubUpdate;
