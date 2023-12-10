import { Input } from "antd";

const LocalSearch = ({ keyword, handleSearchChange }) => {
  return (
    <div className="container pt-4 mt-5 ">
      <h4>Search</h4>
      <Input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
        className="form-controle mb-5 col-sm-3"
      />
    </div>
  );
};

export default LocalSearch;
