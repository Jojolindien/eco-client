import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import showAverage from "../../functions/rating";

import { Card, Skeleton } from "antd";
const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
  //destructure
  const { title, description, images, slug } = product;

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
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
              <Link to={`/product/${slug}`}>
                <EyeOutlined key="view" />
              </Link>,
              <ShoppingCartOutlined
                key="add"
                onClick={() => console.log(slug)}
              />,
            ]}
          >
            <Meta
              title={title}
              description={`${description && description.substring(0, 25)}...`}
            />
          </Card>
        </Link>
      )}
    </>
  );
};

export default ProductCard;
