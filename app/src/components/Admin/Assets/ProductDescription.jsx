import React, { Fragment, useState } from "react";
import "../../../styles/AdminProduct.css";
import Form, { Field, ErrorMessage, ValidMessage } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import TextArea from "@atlaskit/textarea";
import { css, jsx } from "@emotion/react";

function validate(value) {
  if (value !== "open sesame") {
    return "INCORRECT_PHRASE";
  }
  return undefined;
}

const ProductDescription = ({ setProductName, setProductDescription }) => {
  const [name, setName] = React.useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
    setProductName(e.target.value);
  };
  const [description, setDescription] = React.useState("");
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    setProductDescription(e.target.value);
  };
  // console.log("name", name);
  // console.log("description", description);
  return (
    <div>
      <div className="ProductDescription">
        <Form
          onSubmit={(formState) => console.log("form submitted", formState)}
        >
          {({ formProps }) => (
            <form {...formProps}>
              <Field label="Nom du produit" isRequired name="example-text">
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      placeholder="saisir le nom du produit..."
                      onChange={onChangeName}
                      value={name}
                    />
                  </Fragment>
                )}
              </Field>
              <Field
                label="Description du produit"
                isRequired
                name="example-textarea"
                value={description}
                validate={validate}
                onChange={onChangeDescription}
              >
                {({ fieldProps, error, meta: { valid } }) => (
                  <Fragment>
                    <TextArea
                      {...fieldProps}
                      resize="none"
                      placeholder="saisir la description..."
                      onChange={onChangeDescription}
                      value={description}
                    />
                    {valid && (
                      <ValidMessage>
                        Votre description est validée{" "}
                      </ValidMessage>
                    )}
                    {error === "INCORRECT_PHRASE" && (
                      <ErrorMessage>
                        Ce champ est requis. Essayez de saisir du texte dans ce
                        champ.
                      </ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ProductDescription;
