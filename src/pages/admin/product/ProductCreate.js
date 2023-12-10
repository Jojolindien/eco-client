import { useSelector } from "react-redux";
import AdminNav from "../../../component/nav/AdminNav";
import { createProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ProductCreateForm from "../../../component/form/ProductCreateForm";
import {
  getAllSubCategoriesFromCategory,
  getCategories,
} from "../../../functions/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [keyword, setKeyword] = useState("");
  const [showSub, setShowSub] = useState(false);
  const [subOptions, setSubOptions] = useState([]);

  //redux
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });
  };

  //destructure state
  const {
    title,
    description,
    price,
    categories,
    category,
    subCategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        // window.alert(`"${res.data.title}" has been created with succes`);
        toast.success(`"${res.data.title}" has been created with succes`);
        setValues(initialState);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  //=> function unique pour tous les champs : change the state : value [title, category ...]
  const handleChange = (e) => {
    console.log("TARGET", e.target, "ID", e.target.id, "VALUE", e.target.value);
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  //=>fonction différentes des autres form, car ici on fait 2 choses :
  // 1 on set les states comme les autres form
  // 2 par contre ici seulement on doit faire une requete
  // la value qu'on choisi de prendre est : value={c._id}, car niveau back on fait : Sub.find({ parent: req.params._id }).exec()
  const handleCategoryChange = async (e) => {
    // e.preventDefault();
    setValues({ ...values, subCategories: [], category: e.target.value });
    try {
      const subCategories = await getAllSubCategoriesFromCategory(
        e.target.value
      );
      setSubOptions(subCategories);
    } catch (error) {
      // Gestion des erreurs ici
      // Vous pouvez afficher un message à l'utilisateur ou prendre d'autres mesures appropriées
    }
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4>
              <LoadingOutlined /> Product create form
            </h4>
          ) : (
            <h4>Product create form</h4>
          )}
          <hr />
          <div className="p3">
            {/* <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            /> */}
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
        </div>
        {/* personnal component in component */}
      </div>
    </div>
  );
};

export default ProductCreate;
