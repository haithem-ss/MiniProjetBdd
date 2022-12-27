import React, { useState } from "react";
import "react-phone-number-input/style.css";
// import PhonkeInput from "react-phone-number-input";
import CreditCardInput from "react-credit-card-input";
import "../styles/ValidationPhase.css";
import "../styles/CartItems.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ValidationPhase = ({ divAnimation, getTotal }) => {
  const cart = useSelector(state => state.cart);

  const sumbitForm = event => {
    event.preventDefault();
    let data = {
      cardNumber: cardNumber,
      expiry: expiry,
      cvc: cvc,
      adress: adress,
      phone: phone,
      total: getTotal(),
      user: "user",
      items: cart.map(item => item.title),
      date: new Date().toLocaleString()
    };
    // console.log("data", { data });
    axios
      .post("http://localhost:5000/checkout/payment", data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const handleCardNumberChange = event => {
    setCardNumber(event.target.value);
    // console.log(event.target.value);
  };
  const handleCardExpiryChange = event => {
    setExpiry(event.target.value);
    // console.log(event.target.value);
  };
  const handleCardCvcChange = event => {
    setCvc(event.target.value);
    // console.log(event.target.value);
  };

  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const onChange = event => {
    setAdress(event.target.value);
    // console.log(event.target.value);
  };
  const onChangePhone = phone => {
    setPhone(phone);
    // console.log(phone);
  };

  return (
    <div className={`validation_wraper ${divAnimation}`}>
      <form className="validation_form" onSubmit={sumbitForm}>
        <div className="validation__header">
          <h1 className="validation__header__title">Validation</h1>
          <h2 className="validation__header__total">
            Total: {getTotal().toLocaleString()} DA
          </h2>
          <button className="validation__header__btn">confirmer</button>
        </div>
      </form>
      <div className="validation_form">
        <div className="validation_form__input">
          <div className="validation_form__input__phone">
            <label className="validation_form__label">Phone number</label>
            {/* <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={onChangePhone}
            /> */}
          </div>
          <div className="validation_form__input__card">
            <label className="validation_form__label">Card number</label>
            <CreditCardInput
              cardNumberInputProps={{
                value: cardNumber,
                onChange: handleCardNumberChange
              }}
              cardExpiryInputProps={{
                value: expiry,
                onChange: handleCardExpiryChange
              }}
              cardCVCInputProps={{ value: cvc, onChange: handleCardCvcChange }}
              fieldClassName="input"
            />
          </div>
          <div className="validation_form__adress">
            <label className="validation_form__label">Adress</label>
            <input
              className="validation_form__input__adress"
              placeholder="Enter your adress"
              type="text"
              value={adress}
              onChange={onChange}
              autoComplete="address-line1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationPhase;
