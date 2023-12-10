import { useSelector } from "react-redux";
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

const CategoryCreate = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
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
    createCategory({ name }, user.token)
      .then((response) => {
        console.log("Category created successfully", response);
        toast.success(`${response.data.name} is created`);
        loadCategories();
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
        const response = await removeCategory(slug, user.token);
        console.log(response);
        toast.success(response.data);
        // Charge les catégories uniquement si la suppression réussit
        loadCategories();
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
            <h4>Create Category</h4>
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
            {categories.filter(searched(keyword)).map((c) => (
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
                    <DeleteOutlined
                    //   style={{
                    //     verticalAlign: "middle",
                    //   }}
                    //   className="text-danger"
                    />
                  </span>
                  <Link
                    to={`/admin/category/${c.slug}`}
                    className="btn btn-sm float-end"
                  >
                    <EditOutlined
                    //   style={{
                    //     verticalAlign: "middle",
                    //   }}
                    //   className="text-primary"
                    />
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

export default CategoryCreate;
