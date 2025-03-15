import axios from "axios";
import { useState } from "react";

function AddingImg({sendUrl}) {
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState("");
  const [imgUploaded, setimgUploaded] = useState(false)

  const uploadFile = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images_preset");

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;


      setimgUploaded(true)
      sendUrl(secure_url)

      
      
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <label htmlFor="img">Image Upload</label>
      <input
        type="file"
        accept="image/*"
        id="img"
        onChange={(e) => {

          const file = e.target.files[0];
          setImg(file);
          uploadFile(file);
        }}
      />
      <span>{imgUploaded ? "Image Uploaded" : "Please upload image"}</span>
    </>
  );
}

export default AddingImg;
