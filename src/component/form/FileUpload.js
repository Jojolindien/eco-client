import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from "antd";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";

const FileUpload = ({ values, setValues, setLoading }) => {
  const user = useSelector((state) => state.user);

  const fileUploadAndResize = async (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;
    // console.log(files);
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        try {
          await Resizer.imageFileResizer(
            files[i],
            720,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              console.log(uri);
              // image is the name in the controler
              axios
                .post(
                  `${process.env.REACT_APP_API}/uploadimages`,
                  {
                    image: uri,
                  },
                  { headers: { authtoken: user ? user.token : "" } }
                )
                .then((res) => {
                  console.log("Image upload res date", res);

                  allUploadedFiles.push(res.data);
                  setLoading(false);

                  setValues({ ...values, images: allUploadedFiles });
                })
                .catch((err) => {
                  setLoading(false);
                  console.log("CLOUDINARY UPLOAD ERROR", err);
                });
            },
            "base64"
          );
        } catch (error) {
          console.log("ERR", error);
        }
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log("remove image : ", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeImage`,
        { image_id: public_id },
        { headers: { authtoken: user ? user.token : "" } }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
        toast.success("Image Delected");
        console.log(res);
      })
      .catch((err) => {
        console.log("remove err : ", err.response.data.err);
        toast.error("Remove error : " + err.response.data.err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row my-3">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              className="col-1 ms-3"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={image.url} size={100} shape="square" />
            </Badge>
          ))}
      </div>
      <div className="row offset-2">
        <label className="col-md-2 btn btn-primary mx-2">
          Choose image file
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
