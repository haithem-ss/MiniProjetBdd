import React, { Fragment } from 'react';
import axios from "axios"
import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import Button from '@atlaskit/button/standard-button';
import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/textfield';
import { DatePicker, DateTimePicker } from '@atlaskit/datetime-picker';
import Select, { components } from '@atlaskit/select';

import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';
const submitForm =(data)=>{
  let userInfos={
    firstName:data.nom,
    lastName:data.prenom,
    email:data.email,
    // sexe:data.sexe,
    // dateOfBirth:data.dateOfBirth,
    // phoneNumber:data.phoneNumber,
    password:data.password,
    confirmationPassword:data.confirmationPassword,
  }
  console.log(userInfos)
  axios.post("http://localhost:5000/users/register",userInfos)
  .then((response )=>{
    console.log(response)
  })
}
const Login = () => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      maxWidth: '100%',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form
      onSubmit={(data) => {
        submitForm(data)
      }}
    >
      {({ formProps, submitting }) => (
        <form  {...formProps}>
          <FormHeader
            title="S'identifier"
            description="* Champ obligatoire"
          />
          <FormSection>
            <div
            style={{
              display:"flex",
              justifyContent:"space-between",
            }}>
            {/* Nom */}
            <Field
              aria-required={true}
              name="nom"
              label="Nom"
              isRequired
              defaultValue=""

            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />
                  {error && (
                    <ErrorMessage>
                      This username is already in use, try another one.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            {/* Prénom*/}
            <Field
              aria-required={true}
              name="prenom"
              label="Prénom"
              isRequired
              defaultValue=""
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />

                  {error && (
                    <ErrorMessage>
                      This username is already in use, try another one.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            </div>
            {/* Mot de passe*/}
            <Field
              aria-required={true}
              name="password"
              label="Mot de passe"
              defaultValue=""
              isRequired
              validate={(value) =>
                value && value.length < 8 ? 'TOO_SHORT' : undefined
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
            {/* Confirmation de mot de passe*/}
            <Field
              aria-required={true}
              name="confirmationPassword"
              label="Confirmer le mot de passe"
              defaultValue=""
              isRequired
              validate={(value) =>
                value && value!==formProps.ref.current.password.value ? 'DIFFERENT_PASSWORD' : undefined
              }
            >
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <Fragment>
                    <TextField type="password" {...fieldProps} />

                    {error && (
                      <ErrorMessage>
                        Veuillez verifier le mot de passe.
                      </ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                      <ValidMessage>Awesome password!</ValidMessage>
                    ) : null}
                  </Fragment>
                );
              }}
            </Field>
            {/* Email */}
            <Field 
            name="email" 
            label="Email" 
            defaultValue="" 
            isRequired>
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField {...fieldProps} />

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </Fragment>
                )}
              </Field>
            {/* Sexe*/}

            {/* Date de naissance*/}
            {/* <Field name="dateOfBirth" label="Date de naissance" defaultValue="" isRequired>
              {({ fieldProps: { id, ...rest }, error }) => (
                <Fragment>
                  <DatePicker selectProps={{ inputId: id }} {...rest} />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
              )}
            </Field> */}


            <CheckboxField name="remember" label="Remember me" defaultIsChecked>
              {({ fieldProps }) => (
                <Checkbox
                  {...fieldProps}
                  label="Always sign in on this device"
                />
              )}
            </CheckboxField>
          </FormSection>

          <FormFooter>
            <ButtonGroup>
              <LoadingButton
              type="submit"
                // onClick={()=>validateForm(formProps)}
                appearance="primary"
                isLoading={submitting}
              >
                S'identifier
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);

export default Login;