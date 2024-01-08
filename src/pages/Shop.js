import { useNavigate } from "react-router-dom";
import { fetchProductByFilter, getProductByCount } from "../functions/product";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "../component/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import Star from "../component/form/Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 5000]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkedCategoriesIds, setCheckedCategoriesIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Asus",
  ]);
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }), shallowEqual);
  let { text } = search;

  const navigate = useNavigate();

  //________________1er load by default on page load
  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductByCount(12);
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
      // Gérer les erreurs ici, par exemple, afficher un message à l'utilisateur
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //________________2e load on user Search input
  //   search input géré par le redux store
  const fetchProducts = async (arg) => {
    fetchProductByFilter(arg).then((res) => {
      setProducts(res);
      console.log(res);
    });
  };

  useEffect(() => {
    //delayed the req, to avoid too much request to backend, while typing
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //________________3 load product base on the price range
  const formatter = (value) => `${value} $`;

  const handleSlider = (value) => {
    //clear the text state in redux (no 2 req in once)
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCheckedCategoriesIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    //delayed the req, to limit number of request to backend
    const timerId = setTimeout(() => {
      setOk(!ok);
    }, 300);

    // Cleanup function
    return () => clearTimeout(timerId);
  };

  useEffect(() => {
    console.log("ok to request", price);
    fetchProducts({ price });
  }, [ok]);

  //________________4 load products base on the category
  const handleCheck = (e) => {
    //reset other filter
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    // console.log("CATEGORY CHECKED :", e.target.value);
    let inTheState = [...checkedCategoriesIds];
    let justChecked = e.target.value;

    //foundInTheState => check if the justChecked is in inTheState
    let foundInTheState = inTheState.indexOf(justChecked);
    console.log("foundInTheState :", foundInTheState);
    //indexOf =>  return index, ou -1 si introuvable
    if (foundInTheState === -1) {
      console.log("je le rajoute");
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      console.log("je l'enleve");
      inTheState.splice(foundInTheState, 1);
    }
    setCheckedCategoriesIds(inTheState);
    console.log("IN THE STATE :", inTheState);
    fetchProducts({ category: inTheState });
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 ps-4"
          value={c._id}
          name="category"
          checked={checkedCategoriesIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  //________________5 Show products by star rating
  const handleStarClick = (num) => {
    if (num === star) {
      setStar("");
      loadAllProducts();
    } else {
      console.log(num);
      //reset price and text
      dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
      setPrice([0, 0]);
      setCheckedCategoriesIds([]);
      setStar(num);
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");

      fetchProducts({ stars: num });
    }
  };

  const showStars = () => (
    <div className="pe-4 ps-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />

      <Star starClick={handleStarClick} numberOfStars={4} />

      <Star starClick={handleStarClick} numberOfStars={3} />

      <Star starClick={handleStarClick} numberOfStars={2} />

      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  //________________6 Show products by sub
  const handleSubmit = (s) => {
    if (s === sub) {
      console.log("SUBS", s);
      setSub("");
      loadAllProducts();
    } else {
      console.log("SUBS", s);
      setSub(s);
      dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
      setPrice([0, 0]);
      setCheckedCategoriesIds([]);
      setStar("");
      setBrand("");
      setColor("");
      setShipping("");

      fetchProducts({ sub: s });
    }
  };

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="p-1 m-1 badge bg-secondary"
        onClick={() => handleSubmit(s)}
        style={{ cursor: "pointer" }}
      >
        {s.name}
        <br />
      </div>
    ));

  //________________7 Show brands
  const handleBrand = (e) => {
    console.log("BRANDS");
    setSub("");
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategoriesIds([]);
    setStar("");
    setBrand(e.target.value);
    setColor("");
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b._id}
        value={b}
        name={b}
        checked={brand === b}
        onChange={(e) => handleBrand(e)}
        className="pb-1 pe-4"
      >
        {b}
      </Radio>
    ));

  //________________8 Show Colors
  const handleColor = (e) => {
    console.log("BRANDS");
    setSub("");
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategoriesIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c._id}
        value={c}
        name={c}
        checked={color === c}
        onChange={(e) => handleColor(e)}
        className="pb-1 pe-4"
      >
        {c}
      </Radio>
    ));

  //________________8 Show Shipping
  const handleShippingChange = (e) => {
    setSub("");
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCheckedCategoriesIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 ps-4 pe-4"
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 ps-4 pe-4"
        onChange={handleShippingChange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-3 pt-2">
          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            className="ps-4 pe-4"
            style={{ minHeight: "100vh" }}
          >
            {/* ________________________________________PRICE */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  range
                  // defaultValue={[20, 50]}

                  tooltip={{
                    formatter,
                  }}
                  value={price}
                  onChange={handleSlider}
                  max="5000"
                />
              </div>
            </SubMenu>
            {/* _____________________________________CATEGORY */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Category
                </span>
              }
            >
              <div>{showCategories()}</div>
            </SubMenu>
            {/* _____________________________________STAR */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div>{showStars()}</div>
            </SubMenu>
            {/* ___________________________________Sub */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Subcategories
                </span>
              }
            >
              <div className="ps-4 pe-4">{showSubs()}</div>
            </SubMenu>
            {/* ___________________________________Brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div className="ps-4 pe-4">{showBrands()}</div>
            </SubMenu>
            {/* ___________________________________Color */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div className="ps-4 pe-4">{showColors()}</div>
            </SubMenu>
            {/* ___________________________________Shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div className="ps-4 pe-4">{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4>Loading ...</h4>
          ) : (
            <h4 className="text-center my-5">Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
