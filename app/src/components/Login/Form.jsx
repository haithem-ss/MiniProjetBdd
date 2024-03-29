import React, { Fragment } from "react";
import axios from "axios";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import { Checkbox } from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import { DatePicker, DateTimePicker } from "@atlaskit/datetime-picker";
import Select, { components } from "@atlaskit/select";
import GoogleIcon from "../../assets/Google.jsx";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  ValidMessage
} from "@atlaskit/form";
const submitForm = (data,Navigate) => {
  let userInfos = {
    email: data.email,
    password: data.password
  };
   return axios.post("http://localhost:5000/users/login", userInfos).then(response => {
    console.log(response)
    if (response.status===204){
        return toast.error("Veuillez verifiez l'email et le mot de passe")
    }
    if (response.status===205){
      return toast.error("Veuillez verifiez le mot de passe")
  }
      toast.success("Wellcome back")
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setTimeout(()=>{
          Navigate("/")
          window.location.reload();
        },1000)
    
     });
};
const googleAuth = () => {
  const url = `${process.env.REACT_APP_API_URL}/users/auth/google`;
  console.log(url);
  window.open(url, "_self");
};

function LoginForm  ()  {
  let Navigate=useNavigate()
return(

  <div
  style={{
    display: 'flex',
    width: '50%',
    maxWidth: '100%',
    margin: 'auto',
    flexDirection: 'column',
    alignItems: "center",
  }}
  >
          <div>
        <Toaster />
      </div>
    <Form
      onSubmit={data => {
        return submitForm(data,Navigate);
      }}
    >
      {({ formProps, submitting }) => (
          <form
          style={{ width: '65%' }}  {...formProps}>          <FormHeader title="Bienvenue" />
          <span className="formSubtitle">
            Entrez vos informations pour vous connecter à votre compte.
          </span>

          <FormSection>
            {/* Email */}
            <Field name="email" label="Email" defaultValue="" isRequired>
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField type="email" {...fieldProps} />

                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
              )}
            </Field>
            {/* Mot de passe*/}
            <Field
              aria-required={true}
              name="password"
              label="Mot de passe"
              defaultValue=""
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              isRequired
              validate={value =>
                value && !value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
                  ? "TOO_SHORT"
                  : undefined
              }
            >
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <Fragment>
                    <TextField type="password" {...fieldProps} />
                    {error && !valid && (
                      <HelperMessage>
                        Use 8 or more characters with a mix of letters, numbers
                        and symbols.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        Password needs to be more than 8 characters.
                      </ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                      <ValidMessage>Awesome password!</ValidMessage>
                    ) : null}
                  </Fragment>
                );
              }}
            </Field>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
                alignItems: "center"
              }}
            >
              <CheckboxField name="remember" defaultIsChecked>
                {({ fieldProps }) => (
                  <Checkbox {...fieldProps} label="Se souvenir de moi" />
                )}
              </CheckboxField>
              <Button appearance="link">J'ai oublié le mot de passe</Button>
            </div>
          </FormSection>
          <FormFooter>
            <div className="formButtons">
              <LoadingButton
                type="submit"
                style={{
                  width: "100%"
                }}
                appearance="primary"
                isLoading={submitting}
              >
                S'identifier
              </LoadingButton>
              <Button
                onClick={googleAuth}
                appearance="default"
                style={{
                  border: "1px solid #ADB5BD"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <GoogleIcon size="small" />
                  <span>Continuez avec google</span>
                </div>
              </Button>
            </div>
          </FormFooter>
          <p
            style={{
              textAlign: "center",
              lineHeight: "3rem !important"
            }}
          >
            Vous n'avez pas de compte ?
            <Button appearance="link">S'inscrire maintenant</Button>
          </p>
        </form>
      )}
    </Form>
  </div>
);}

export default LoginForm;
