import React from "react";
import InputColor from "react-input-color";

const ProductDescriptionColor = () => {
  const [color, setColor] = React.useState({});

  return (
    <div className="ProductDescription__color">
      <label for="color">sélectionner une couleur:</label>
      <InputColor
        className="color-picker"
        name="color"
        initialValue="#5e72e4"
        onChange={setColor}
        placement="right"
      />
    </div>
  );
};

export default ProductDescriptionColor;
