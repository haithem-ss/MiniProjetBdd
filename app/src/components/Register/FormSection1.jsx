import React, { Fragment } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/textfield';
import  {
    CheckboxField,
    ErrorMessage,
    Field,
    FormSection,
    HelperMessage,
    ValidMessage,
  } from '@atlaskit/form';
export default function FormSection1({formProps}){
    return (<>
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
            {/* Mot de passe*/}
            <Field
              aria-required={true}
              name="password"
              label="Mot de passe"
              defaultValue=""
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              isRequired
              validate={(value) =>
                value && !value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/) ? 'TOO_SHORT' : undefined
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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


            <CheckboxField name="remember" label="" defaultIsChecked>
              {({ fieldProps }) => (
                <Checkbox
                  {...fieldProps}
                  label="Toujours se connecter sur cet appareil"
                />
              )}
            </CheckboxField>
          </FormSection>
    </>)
}