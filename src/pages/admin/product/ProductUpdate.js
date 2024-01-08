import { useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../../component/form/FileUpload";
import AdminNav from "../../../component/nav/AdminNav";
import { getProduct, updateProduct } from "../../../functions/product";
import { useEffect, useState } from "react";
import ProductUpdateForm from "../../../component/form/ProductUpdateForm";
import {
  getAllSubCategoriesFromCategory,
  getCategories,
} from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subCategories: [],
  shipping: "Yes",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductUpdate = (props) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubsIds, setArrayOfSubsIds] = useState();
  const [categories, setCategories] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }), shallowEqual);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = async () => {
    const product = await getProduct(slug);
    //1 load single product
    setValues({ ...values, ...product.data });
    //2 load single product subscategory based on the category in the product
    let subs = await getAllSubCategoriesFromCategory(product.data.category._id);
    setSubOptions(subs); // for the revalues default sub, depending of the category
    //3 prepare array of the id of the subs to show as default subs values
    let array = [];
    product.data.subCategories.map((s) => {
      array.push(s._id);
    });
    setArrayOfSubsIds((prev) => array); // required for antd to work;
    // prev utile pour quand prev est updaté par une nouvelle value
  };

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(arrayOfSubsIds);
    values.subCategories = arrayOfSubsIds;
    values.category = updatedCategory ? updatedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        // toast.success(`"${res.data.title}" has been updated with succes`);
        toast.success(`"${res.data.title}" has been created with succes`);
        console.log(values);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response);
      });
  };

  //=> function unique pour tous les champs : change the state : value [title, category ...]
  const handleChange = (e) => {
    console.log("TARGET", e.target, "ID", e.target.id, "VALUE", e.target.value);
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  // QUAND ON CLICK SUR UNE CATEGORY => CA REQ LES SUBS ENFANTS
  //=>fonction différentes des autres form, car ici on fait 2 choses :
  // 1 on set les states comme les autres form : sub vidé + category: e.target
  // 2 par contre ici seulement on doit faire une requete
  // la value qu'on choisi de prendre est : value={c._id}, car niveau back on fait : Sub.find({ parent: req.params._id }).exec()
  const handleCategoryChange = async (e) => {
    // console.log("e.target.value", e.target.value);
    // console.log("EXISTING CATEGORY", values.category._id);

    //On vide les subs categories de la categorie d'avant
    setValues({ ...values, subCategories: [] });
    // on enregistre une nouvelle categorie
    setUpdatedCategory(e.target.value);

    try {
      const subCategories = await getAllSubCategoriesFromCategory(
        e.target.value
      );
      setSubOptions(subCategories);

      //if click back to the original category
      //show its sub categorie (from the product) ind efault
      if (values.category._id === e.target.value) {
        loadProduct();
      } else {
        //clear olf sub categfory ids
        setArrayOfSubsIds([]);
      }
    } catch (error) {
      // Gestion des erreurs ici
      // Vous pouvez afficher un message à l'utilisateur ou prendre d'autres mesures appropriées
    }
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
              <LoadingOutlined /> Uploading
            </h4>
          ) : (
            <h4>Product update form</h4>
          )}
          <hr />
          {/* {JSON.stringify(values)} */}
          <div className="my-5">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            setValues={setValues}
            values={values}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            arrayOfSubsIds={arrayOfSubsIds}
            setArrayOfSubsIds={setArrayOfSubsIds}
            updatedCategory={updatedCategory}
            categories={categories}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
