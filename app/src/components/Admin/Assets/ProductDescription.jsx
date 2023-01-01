import React, { Fragment } from "react";
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

const ProductDescription = () => {
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
                      placeholder="saisir le nom du produit..."
                      {...fieldProps}
                    />
                  </Fragment>
                )}
              </Field>
              <Field
                label="Description"
                isRequired
                name="command"
                validate={validate}
                defaultValue=""
              >
                {({ fieldProps, error, meta: { valid } }) => (
                  <Fragment>
                    <TextArea
                      {...fieldProps}
                      resize="none"
                      placeholder="saisir la description..."
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
