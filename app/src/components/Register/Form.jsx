
import React, { Fragment } from 'react';
import axios from "axios"
import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/textfield';
import { DatePicker, DateTimePicker } from '@atlaskit/datetime-picker';
import { motion } from "framer-motion";
import GoogleIcon from "../../assets/Google.jsx"
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
import Select, { components } from '@atlaskit/select';




const submitForm = (data) => {
    console.log(data)
    return axios.post("http://localhost:5000/users/register", data).then((res) => console.log(res))
}
const whenUsingSelect = () => {
    console.log("Using")
    for (let i of document.querySelectorAll("form button")) i.style.zIndex = -1
}
const whenNotUsingSelect = () => {
    console.log("Not using")
    for (let i of document.querySelectorAll("form button")) i.style.zIndex = 1
}
function RegisterForm() {
    const genders = [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' },]
    const jours = []
    const mois = []
    const années = []
    const wilayas = []
    for (let i = 1; i <= 31; i++) {
        jours.push({ label: i, value: i })
    }
    for (let i = 1; i <= 58; i++) {
        wilayas.push({ label: i, value: i })
    }
    for (let i = 1; i <= 12; i++) {
        mois.push({ label: i, value: i })
    }
    for (let i = 1; i <= 100; i++) {
        années.push({ label: 2023 - i, value: 2023 - i })
    }
    const [section, setSection] = React.useState(1)
    return (<>
        <div
            style={{
                display: 'flex',
                width: 'auto',
                maxWidth: '100%',
                margin: 'auto',
                flexDirection: 'column',
            }}
        >
            <Form
                onSubmit={(data) => {
                    if (section == 1) {
                        setSection(2)

                        // return axios.post("http://localhost:5000/users/verifyEmail",{email:data.email})
                        // .then((response)=>{
                        //     console.log(response)
                        //     if (response.data.code_msg==="GoodEmail"){
                        // setSection(2)

                        //     }else{
                        //         console.log("DuplicatedEmail")

                        //     }
                        // })

                    } else {
                        return submitForm(data)
                    }

                }}
            >
                {({ formProps, submitting }) => (
                    <form
                        style={{ width: "400px" }}  {...formProps}>
                        <FormHeader
                            title="Inscrivez-vous à Eden"
                        />
                        <span
                            className="formSubtitle"
                        >
                            Entrez vos informations pour créer votre compte eden.
                        </span>
                        <FormSection>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    width: "200%"
                                }}
                            >
                                <motion.div
                                    initial={section === 1 ? {} : {}}
                                    animate={section === 1 ? {} : {
                                        x: "-100%",
                                        opacity: 0,
                                        transition: {
                                            duration: 1
                                        }
                                    }}
                                    style={{
                                        width: "50%"
                                    }}
                                >
                                    {/* Nom & prénom */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: "1rem"
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
                                                    <TextField autoComplete="off" type="text" {...fieldProps} />
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
                                                    <TextField autoComplete="off" type="text"{...fieldProps} />

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
                                                <TextField type="text" {...fieldProps} />

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
                                            value && value !== formProps.ref.current.password.value ? 'DIFFERENT_PASSWORD' : undefined
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
                                </motion.div>
                                <motion.div
                                    initial={section === 1 ? { opacity: 0 } : {}}
                                    animate={section === 1 ? {} : {
                                        x: "-100%",
                                        opacity: 1,
                                        transition: {
                                            duration: 1
                                        }
                                    }}
                                    style={{
                                        width: "50%"
                                    }}
                                >
                                    <Field name="sexe" label="Genre">
                                        {({ fieldProps, error }) => (
                                            <Fragment>
                                                <Select

                                                    {...fieldProps}

                                                    options={genders}
                                                    isClearable
                                                />
                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                            </Fragment>
                                        )}
                                    </Field>
                                    {/* Date de naissance */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >


                                        <Field
                                            name="dayOfBirth"
                                            label="Date de naissance"
                                        >
                                            {({ fieldProps, error }) => (
                                                <Fragment>
                                                    <Select
                                                        onMenuClose={() => whenNotUsingSelect()}
                                                        onMenuOpen={() => whenUsingSelect()}
                                                        {...fieldProps}
                                                        options={jours}
                                                    />


                                                    {error && <ErrorMessage>{error}</ErrorMessage>}
                                                </Fragment>
                                            )}

                                        </Field>
                                        <Field
                                            name="monthOfBirth"
                                            label="        "
                                        >
                                            {({ fieldProps, error }) => (
                                                <Fragment>
                                                    <Select
                                                        {...fieldProps}
                                                        onMenuClose={() => whenNotUsingSelect()}
                                                        onMenuOpen={() => whenUsingSelect()}
                                                        options={mois}
                                                    />


                                                    {error && <ErrorMessage>{error}</ErrorMessage>}
                                                </Fragment>
                                            )}

                                        </Field>
                                        <Field
                                            name="yearOfBirth"
                                            label="        "
                                        >
                                            {({ fieldProps, error }) => (
                                                <Fragment>
                                                    <Select
                                                        {...fieldProps}
                                                        onMenuClose={() => whenNotUsingSelect()}
                                                        onMenuOpen={() => whenUsingSelect()}
                                                        options={années}
                                                    />


                                                    {error && <ErrorMessage>{error}</ErrorMessage>}
                                                </Fragment>
                                            )}

                                        </Field>
                                    </div>
                                    {/* N° de téléphone */}
                                    <Field
                                        name="phoneNumber"
                                        label="N° de téléphone"
                                        defaultValue=""
                                    >
                                        {({ fieldProps, error }) => (
                                            <Fragment>
                                                <TextField {...fieldProps} />

                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                            </Fragment>
                                        )}
                                    </Field>
                                    {/* Adresse */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: "0rem"
                                        }}
                                    >
                                        <Field
                                            name="wilaya"
                                            label="Adresse     ">
                                            {({ fieldProps, error }) => (
                                                <Fragment>
                                                    <Select
                                                        onMenuClose={() => whenNotUsingSelect()}
                                                        onMenuOpen={() => whenUsingSelect()}
                                                        {...fieldProps}
                                                        options={wilayas}
                                                        defaultValue=""
                                                    />
                                                    {error && <ErrorMessage>{error}</ErrorMessage>}
                                                </Fragment>
                                            )}
                                        </Field>
                                        <Field
                                            name="adresse"
                                            label="                "
                                        >
                                            {({ fieldProps, error }) => (
                                                <Fragment>
                                                    <TextField type="text"
                                                        {...fieldProps}
                                                    />
                                                    {error && <ErrorMessage>{error}</ErrorMessage>}
                                                </Fragment>
                                            )}
                                        </Field>
                                    </div>
                                    {section === 1 ? <></> : <CheckboxField name="remember" label="Termes et conditions d'utilisation" defaultIsChecked>
                                        {({ fieldProps }) => (
                                            <Checkbox
                                                {...fieldProps}
                                                label="J'accepte les termes d'utilisation"
                                            />
                                        )}
                                    </CheckboxField>}

                                </motion.div>
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
                                    {section === 1 ? "Continuer" : "S'identifier"}
                                </LoadingButton>
                                <Button
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
                                        <span>
                                            Continuez avec google
                                        </span>
                                    </div>
                                </Button>
                            </div>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </div>
    </>)
}




export default RegisterForm;