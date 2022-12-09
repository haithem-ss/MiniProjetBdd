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
const submitForm = (data) => {
  let userInfos = {
    email: data.email,
    password: data.password,
  }

  console.log(userInfos)
  axios.post("http://localhost:5000/users/login", userInfos)
    .then((response) => {
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
            title="Se connecter"
            description="* Champ obligatoire"
          />
          <FormSection>
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
                appearance="primary"
                isLoading={submitting}
              >
                Se connecter
              </LoadingButton>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);

export default Login;