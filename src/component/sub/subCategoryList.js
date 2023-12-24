import { useEffect, useState } from "react";
import { getSub, getSubcategories, getSubs } from "../../functions/sub";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const SubCategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((s) => {
      // console.log(c.data);
      setSubcategories(s.data);
    });
    setLoading(false);
  }, []);

  const showSubcategories = () =>
    subcategories.map((s) => {
      return (
        <Link
          to={`/sub/${s.slug}`}
          style={{ textDecoration: "none", color: "white" }}
          key={s._id}
          className="col btn btn-outline-secondary m-1"
        >
          {s.name}
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
        Sub-Categories
      </h4>
      <br />
      <div className="container">
        <div className="row my-3 mb-5">
          {loading ? (
            <h4 className="text-center">Loading ... </h4>
          ) : (
            showSubcategories()
          )}
        </div>
      </div>
    </>
  );
};

export default SubCategoryList;
