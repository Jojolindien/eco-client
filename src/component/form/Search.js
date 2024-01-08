import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

//ici le state est géré directement dans redux
const Search = () => {
  let dispatch = useDispatch();

  //on recupere seulement l'état de search
  let { search } = useSelector((state) => ({ ...state }), shallowEqual);
  const { text } = search;

  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <input
          onChange={handleChange}
          type="search"
          value={text}
          className="form-control outline-ligh me-1"
          placeholder="Search"
        />
        <button type="submit" className="btn btn-outline-light my-2 my-sm-0">
          <SearchOutlined style={{ cursor: "pointer" }} />
        </button>
      </div>
    </form>
  );
};

export default Search;
