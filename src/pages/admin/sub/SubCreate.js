import { shallowEqual, useSelector } from "react-redux";
import AdminNav from "../../../component/nav/AdminNav";
import { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../component/form/CategoryForm";
import LocalSearch from "../../../component/form/LocalSearch";
import { createSub, getSubs, removeSub } from "../../../functions/sub";

const SubCreate = () => {
  const user = useSelector((state) => state.user, shallowEqual);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

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

  const loadSubs = async () => {
    setLoading("true");
    try {
      const response = await getSubs();
      setSubs(response.data);
    } catch (error) {
      console.error("Error loading categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ name });
    createSub({ name, parent: category }, user.token)
      .then((response) => {
        console.log("Category created successfully", response);
        toast.success(`${response.data.name} is created`);
        loadSubs();
      })
      .catch((error) => {
        console.error("Error creating category", error);
        toast.error(`${error.message}`);
      })
      .finally(() => {
        setLoading(false);
        setName("");
      });
  };

  const handleRemove = async (slug) => {
    try {
      const answer = window.confirm("Are you sure you want to delete ?");
      if (answer) {
        setLoading(true);
        const response = await removeSub(slug, user.token);
        console.log(response);
        toast.success(response.data);
        // Charge les catégories uniquement si la suppression réussit
        loadSubs();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-8">
          <div className="col-md-4 offset-md-1 py-5">
            <h4>Create Subcategory</h4>
            {/* //PARENT */}
            <div className="form-group my-2">
              <label>Parent category</label>
              <select
                name="category"
                className="form-control my-3"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Please select a category</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>{category}</div>

            <div>
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
          </div>

          {/* personnal component in component */}
          <LocalSearch
            keyword={keyword}
            handleSearchChange={handleSearchChange}
          />

          <div className="row mt-4 me-6">
            {subs.filter(searched(keyword)).map((c) => (
              <div key={c._id} className="col-md-2 mb-4">
                <Card
                  title={c.name}
                  bordered={false}
                  style={{
                    width: "100%", // Utiliser 100% de la largeur de la carte
                  }}
                >
                  {/* Ajouter d'autres détails de la catégorie ici si nécessaire */}
                  <span
                    className="btn btn-sm float-end"
                    onClick={() => handleRemove(c.slug)}
                  >
                    <DeleteOutlined />
                  </span>
                  <Link
                    to={`/admin/sub/${c.slug}`}
                    className="btn btn-sm float-end"
                  >
                    <EditOutlined />
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
