import { Card, Tabs } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../index.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";

const contentStyle = {
  //   height: "50px",
  //   object-fit: "cover",
};

const SingleProduct = ({ product }) => {
  const { slug, title, images, description } = product;
  const { TabPane } = Tabs;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
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
        <h1 className="text-center p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-info" />
              Add to card
            </>,
            <Link to={`/product/${slug}`} style={{ textDecoration: "none" }}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
