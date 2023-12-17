import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Card } from "antd";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  //destructure
  const { title, description, images, slug } = product;

  return (
    <>
      <Card
        hoverable
        className="m-2"
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
          <ShoppingCartOutlined key="add" onClick={() => console.log(slug)} />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 25)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
