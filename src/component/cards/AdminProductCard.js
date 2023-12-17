import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  //destructure
  const { title, description, images, slug } = product;
  // console.log(product);
  return (
    <>
      <Card
        hoverable
        className="m-2"
        style={{
          width: 240,
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
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined key="edit" />
          </Link>,
          <DeleteOutlined key="delete" onClick={() => handleRemove(slug)} />,
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

export default AdminProductCard;
