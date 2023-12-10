import { Button } from "antd";

const CategoryForm = ({ handleSubmit, name, setName, loading }) => (
  <form>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        className="form-control my-3"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        autoFocus
        required
        placeholder="Enter category name"
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      {!loading ? (
        <Button
          type="primary"
          onClick={handleSubmit}
          block
          shape="round"
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Confirm
        </Button>
      ) : (
        <Button
          loading
          type="primary"
          onClick={handleSubmit}
          block
          shape="round"
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Saving loading ...
        </Button>
      )}
    </div>
  </form>
);

export default CategoryForm;
