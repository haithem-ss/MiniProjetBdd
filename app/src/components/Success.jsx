import React, { useEffect, useState } from "react";
import Spinner from "@atlaskit/spinner";

const Success = userDetails => {
  // console.log(userDetails);
  const user = userDetails.userDetails;
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phoneNumber);
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="success">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="success__container">
          <h1>Success</h1>
          <p>Thank you for your submission</p>
          <p>You will get an email with further instructions</p>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>
      )}
    </div>
  );
};

export default Success;
