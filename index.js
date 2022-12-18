cart.map((item) => {
  return (
    <div className="ShoppingCart__item">
      <input
        className="checkBox"
        type="checkbox"
        name="CarteElement"
        value="CartElement"
        onChange={onChange2}
      />
      <label for="CarteElement">
        <ShoppingCartElement
          syleCss="ShoppingCartElement__Info__CartItems"
          styleTitle="product__title__style"
          styleCat="info__category__style"
          styleDate="info__date__style"
          styleTrash="removeBtn__display"
          imageDiv="ShoppingCartElement__Image__style"
          imgStyle="image__style"
          img={item.img}
          title={item.title}
          category={item.category}
          date={item.date}
          price={item.price}
          quantity={item.quantity}
        />
      </label>
    </div>
  );
});
