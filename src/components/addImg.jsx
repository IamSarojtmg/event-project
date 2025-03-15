import axios from "axios";
import { useState } from "react";

function AddingImg() {
  const [img, setImg] = useState(null);
  const uploadFile = async (image) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "images_preset");

    try {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);

      const { secure_url } = res.data;

      // setUrl(secure_url)

      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  // await uploadFile("image");
  // setImg(null);
  // console.log("image uploaded");

  return (
    <>
      <label htmlFor="img">Image Upload</label>
      <input
        type="file"
        accept="image/*"
        id="img"
        onChange={(e) => {
          console.log(e.target.files[0], "saving to setImg");

          // setImg(() => e.target.files[0]);
        }}
      />
    </>
  );
}

export default AddingImg;
