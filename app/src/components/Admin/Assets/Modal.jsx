import React, { Fragment, useCallback, useState } from "react";
import "../../../styles/Modal.css";
import "../../../styles/AdminProduct.css";
import AddIcon from "@atlaskit/icon/glyph/add";
import Form, { Field, FormFooter, HelperMessage } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import LoadingButton from "@atlaskit/button/loading-button";
import axios from "axios";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [nameCategory, setNameCategory] = useState("");

  const onChange = useCallback((event) => {
    setNameCategory(event.target.value);
  }, []);
  console.log(nameCategory);
  const toggleModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    console.log("submit");
  }, []);
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const addCategory = (e) => {
    // e.preventDefault();
    axios
      .post("http://localhost:5000/categories/addCategory", {
        categoryName: nameCategory,
        categoryDescription: `description de la catégorie ${nameCategory}`,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toggleModal();
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <button className="btn-add" onClick={toggleModal}>
        <AddIcon size="small" />
        Ajouter une catégorie
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3 className="modal-title">Ajouter une catégorie</h3>
            <form className="form">
              <Field label="Catégorie" name="example-text">
                {({ fieldProps, error }) => (
                  <Fragment>
                    <Textfield
                      placeholder="saisir le nom de la catégorie"
                      {...fieldProps}
                      onChange={onChange}
                    />
                    <HelperMessage>
                      {error || "Entrez un nom de catégorie valide"}
                    </HelperMessage>
                  </Fragment>
                )}
              </Field>
            </form>
            <div className="modal-footer">
              <button
                className="btn btn-primary btn-footer"
                onClick={addCategory}
              >
                confirmer
              </button>
              <button
                className="btn btn-secondary btn-footer"
                onClick={toggleModal}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
