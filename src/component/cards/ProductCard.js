import {
  EyeOutlined,
  ShoppingCartOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Icon } from "antd";

import { Link } from "react-router-dom";
import showAverage from "../../functions/rating";
//lodash fournit des fonctions utiles pour la manipulation de tableaux, d'objets, de chaînes, etc.
//_ est en alias lors de l'importation est une convention courante dans le monde JavaScript.
import _ from "lodash";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { Card, Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";
const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
  //destructure
  const { title, description, images, slug } = product;
  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }), shallowEqual);

  useEffect(() => {
    if (product.quantity < 1) {
      setTooltip("No stock");
    }
  }, []);

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
      //isUnique(cart, _.isEqual) Les éléments qui sont égaux dans le tableau cart ne seront présents qu'1 seule fois
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

      //3- show cart in sideDrawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
          {product && product.ratings && product.ratings.length > 0 ? (
            <div className="text-center">{showAverage(product)}</div>
          ) : (
            <div className="text-center pt-1 pb-3">"Not rating yet bitch"</div>
          )}
          <Card
            hoverable
            className="mx-auto"
            style={{
              width: 280,
            }}
            cover={
              <img
                alt=""
                src={
                  images && images.length
                    ? images[0].url
                    : "https://res.cloudinary.com/dplzntpqa/image/upload/v1702292867/xyyhzovdlaajyv5hj2wv.jpg"
                }
                style={{ objectFit: "cover", height: "200px" }}
              />
            }
            actions={[
              <Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
                <EyeOutlined key="view" />
              </Link>,
              <Tooltip title={tooltip}>
                <button
                  onClick={product.quantity >= 1 ? handleAddCard : undefined}
                  disabled={product.quantity < 1}
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  {product.quantity >= 1 ? (
                    <ShoppingCartOutlined key="add" />
                  ) : (
                    <StopOutlined />
                  )}
                </button>
              </Tooltip>,
            ]}
          >
            <Meta
              title={title}
              description={`${description && description.substring(0, 25)}...`}
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductCard;
