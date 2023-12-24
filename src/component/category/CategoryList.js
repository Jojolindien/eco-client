import { useEffect, useState } from "react";
import { getCategories } from "../../functions/category";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      // console.log(c.data);
      setCategories(c.data);
    });
    setLoading(false);
  }, []);

  const showCategories = () =>
    categories.map((c) => {
      return (
        <Link
          to={`/category/${c.slug}`}
          style={{ textDecoration: "none", color: "white" }}
          key={c._id}
          className="col btn btn-outline-secondary m-1"
        >
          {c.name}
        </Link>
      );
    });

  //
  return (
    <>
      <h4
        className="text-center p-3 mt-5 mb-5 display-7 jumbotron"
        style={{
          backgroundColor: "#000000", // Remplacez par la couleur de fond souhaitée
          padding: "20px", // Ajoutez un remplissage pour améliorer l'apparence
        }}
      >
        Categories
      </h4>
      <br />
      <div className="container">
        <div className="row my-3 mb-5">
          {loading ? (
            <h4 className="text-center">Loading ... </h4>
          ) : (
            showCategories()
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
