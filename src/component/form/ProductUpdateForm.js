import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  arrayOfSubsIds,
  setArrayOfSubsIds,
  updatedCategory,
  categories,
  selectCategory,
}) => {
  //States destructure
  const {
    title,
    description,
    price,
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

  return (
    <form onSubmit={handleSubmit} className="col-6 offset-2">
      <div className="form-group ">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Enter a description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Enter a price"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="shipping">Shipping</label>
        <select
          className="form-control"
          id="shipping"
          value={shipping === "Yes" ? "Yes" : "No"}
          onChange={handleChange}
        >
          <option value={"No"}>No</option>
          <option defaultValue value="Yes">
            Yes
          </option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          placeholder="Enter a quantity"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Color</label>
        <select
          className="form-control"
          id="color"
          value={color}
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="brand">Brand</label>
        <select
          className="form-control"
          id="brand"
          value={brand}
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group my-2">
        <label>Category</label>
        <select
          id="category"
          className="form-control"
          onChange={handleCategoryChange}
          //est-ce-que j'ai une update la categorie (ecomparé au backend)
          value={updatedCategory ? updatedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Sub Categories</label>
        <Select
          id="subCategories"
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          //on doit utiliser un array a cause de antd qui exige un array en value, on peut pas passer l'objet product directement malheureusement
          onChange={(value) => setArrayOfSubsIds(value)}
          value={arrayOfSubsIds}
        >
          {subOptions &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
        <br />
      </div>

      <button type="submit" className="btn btn-primary my-3">
        Save
      </button>
    </form>
  );
};

export default ProductUpdateForm;
