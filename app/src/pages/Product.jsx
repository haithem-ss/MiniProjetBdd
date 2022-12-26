import React from "react"
import image1 from "../assets/ProductPhotos/image1.png"
import image2 from "../assets/ProductPhotos/image2.png"
import image3 from "../assets/ProductPhotos/image3.png"
import image4 from "../assets/ProductPhotos/image4.png"

export default function () {
    const [images,setImages]=React.useState([image1,image2,image3,image4])
    const [imageOnDisplay,setImageOnDisplay]=React.useState(images[0])
    return (
        <section className="Product">
            <div className="ProductImages">
                <div className="MainImage">
                    <img src={imageOnDisplay} alt="Main image" />
                </div>
                <div className="ImagesContainer">
                    {images.map((img)=>(
                    <img src={img} onClick={()=>setImageOnDisplay(img)} alt="Secondary image" />
                    ))}
                </div>
            </div>
        </section>
    )
}