import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subCategories, shipping, brand, quantity, sold } =
    product;

  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        Price
        <span className="float-end">$ {price}</span>
      </li>
      {/* Categorie --------------------------*/}
      {category && (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="float-right"
            style={{ textDecoration: "none" }}
          >
            {category.name}
          </Link>
        </li>
      )}
      {/* subcategorie -----------------------*/}
      {subCategories && (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Subcategories{" "}
          {subCategories.map((s) => (
            <Link
              style={{ textDecoration: "none" }}
              key={s._id}
              to={`/sub/${s.slug}`}
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Shipping <span>{shipping}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Brand <span>{brand}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Available{" "}
        {/* <span className="badge badge-primary badge-pill">{quantity}</span> */}
        <span className="float-end"> {quantity}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        Sold
        {/* <span className="badge badge-primary badge-pill">{sold}</span> */}
        <span className="float-end"> {sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
