import { Modal, Rate } from "antd";
import { toast } from "react-toastify";
import { shallowEqual, useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RatingModal = ({ children, newStar, onStarClick, loadSingleProduct }) => {
  const [modalVisible, setModalVisible] = useState(false);
  let { slug } = useParams();
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      // le state est recupéré dans pages/auth/login : roleBasedRedirect()
      navigate("/login", { state: { from: `/product/${slug}` } });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br /> {user && user.token ? "Leave rating" : "Login to leave rating"}
      </div>
      <h1 className="d-flex justify-content-center">
        <Modal
          className="text-center"
          title="Leave your rating"
          centered
          open={modalVisible}
          onOk={() => {
            onStarClick(newStar);
            setModalVisible(false);
            toast.success("Thanks for rating");
          }}
          onCancel={() => {
            loadSingleProduct();
            setModalVisible(false);
          }}
        >
          {children}
        </Modal>
      </h1>
    </>
  );
};

export default RatingModal;
