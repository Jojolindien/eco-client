import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
}) => {
  //States destructure
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
          onChange={handleChange}
          value={shipping}
        >
          Select
          <option value="No">No</option>
          <option value="Yes">Yes</option>
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
        <select className="form-control" id="color" onChange={handleChange}>
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
        <select className="form-control" id="brand" onChange={handleChange}>
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
        >
          <option>Please select a category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div className="form-group">
          <label>Sub Category</label>
          <Select
            id="subCategories"
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={(value) => setValues({ ...values, subCategories: value })}
            value={subCategories}
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
      )}
      <button type="submit" className="btn btn-primary my-3">
        Save
      </button>
    </form>
  );
};

export default ProductCreateForm;
