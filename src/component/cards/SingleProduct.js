import { Card, Tabs, Rate, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../index.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import ReactStars from "react-rating-stars-component";
import RatingModal from "../modal/RatingModal";
import { useState } from "react";
import showAverage from "../../functions/rating";
import { useDispatch } from "react-redux";

import _ from "lodash";

//this card is a children of page/product
const SingleProduct = ({ product, onStarClick, star, loadSingleProduct }) => {
  const { slug, title, images, description, _id } = product;
  const { TabPane } = Tabs;

  //nouveau state suite au vote du rating modal
  //une fois validé on envoie ce localState en tant que star state
  const [newStar, setNewStar] = useState(star);
  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();

  const handleAddCard = () => {
    //create card array
    let cart = [];

    //--1 ------- LE LOCAL STORAGE
    //"typeof" est utilisé pour obtenir le type de donnée
    if (typeof window !== "undefined") {
      //if card is in localstorage get it
      if (localStorage.getItem("cart")) {
        //JSON.parse est pour convertir en un objet (inverse de JSON.stringify)
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.push({ ...product, count: 1 });

      //---remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      //--- save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));

      //show toooltip
      setTooltip("Added");

      //--2 ------ LE REDUX STORE
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      <div className="col-md-7 mt-5">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img
                  src={i.url}
                  key={i.public_id}
                  style={{ objectFit: "contain" }}
                />
              ))}
          </Carousel>
        ) : (
          <Carousel>
            <img
              alt=""
              src={
                "https://res.cloudinary.com/dwo8d46qh/image/upload/v1674424612/ouulpxnrveexhlpgrhw4.jpg"
              }
            />
          </Carousel>
        )}
        <Tabs type="card" className="text-white">
          <TabPane tab="Description" key="1" className="text-white">
            {description && description}
          </TabPane>
          <TabPane tab="Contact" key="2">
            Call us on xxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5 my-5">
        <h1 className="text-center p-2">{title}</h1>
        <div className="m-2 d-flex justify-content-center pt-3 pb-3">
          {product && product.ratings && product.ratings.length > 0
            ? showAverage(product)
            : "Not rating yet bitch"}
        </div>
        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={() => handleAddCard()}>
                  <ShoppingCartOutlined key="add" />
                </a>
              </Tooltip>
              ,
            </>,
            <Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </Link>,
            <RatingModal
              onStarClick={onStarClick}
              loadSingleProduct={loadSingleProduct}
              newStar={newStar}
              setNewStar={setNewStar}
              isHalf={true}
            >
              {/* REACTSTAR
              {star}
              <ReactStars
                count={5}
                onChange={setNewStar}
                value={star}
                size={24}
                activeColor="#ffd700"
              /> */}
              {/* ANTD */}
              <Rate
                allowHalf
                allowClear
                defaultValue={star}
                onChange={setNewStar}
              />
              <br />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
