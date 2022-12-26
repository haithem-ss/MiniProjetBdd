import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import ImageContainer from "./ImageContainer";
import ImageOutline from "./ImageOutline";
import MediaServicesScaleLargeIcon from "@atlaskit/icon/glyph/media-services/scale-large";
const fileTypes = ["JPG", "PNG", "GIF"];

const ProductImages = () => {
  const [file, setFile] = useState(null);
  const [imgURL, setImgURL] = useState();
  const handleChange = files => {
    console.log(Object.values(files));
    setImgURL(Object.values(files).map(file => URL.createObjectURL(file)));
  };

  return (
    <div className="ProductDescription">
      <div className="product__images_wraper__Header">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          multiple={true}
          maxSize={4}
          label="ajouter des images"
          hoverTitle="Glissez et déposez votre image ici"
          onTypeError={file => {
            alert("Seuls les fichiers JPG, PNG et GIF sont autorisés");
          }}
        />{" "}
      </div>
      <div className="product__images_wraper">
        {!imgURL && (
          <>
            <div className="child">
              <MediaServicesScaleLargeIcon size="xlarge" />
            </div>{" "}
            <div className="child">
              <MediaServicesScaleLargeIcon size="xlarge" />
            </div>{" "}
            <div className="child">
              <MediaServicesScaleLargeIcon size="xlarge" />
            </div>{" "}
            <div className="child">
              <MediaServicesScaleLargeIcon size="xlarge" />
            </div>
          </>
        )}
        {imgURL &&
          imgURL.map((url, index) => <ImageContainer key={index} src={url} />)}
      </div>
    </div>
  );
};

export default ProductImages;
