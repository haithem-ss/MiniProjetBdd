
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
import { useNavigate } from "react-router-dom";


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

const whileUsingSelect=()=>{
    console.log("You can")
    document.getElementsByClassName("css-n5adxy-ButtonBase")[0].style.zIndex =-1
    document.getElementsByClassName("css-in3me7-ButtonBase")[0].style.zIndex =-1
}
const whileNotUsingSelect=()=>{
    console.log("You cannot")
    document.getElementsByClassName("css-n5adxy-ButtonBase")[0].style.zIndex =1
    document.getElementsByClassName("css-in3me7-ButtonBase")[0].style.zIndex =1
}


const submitForm = (data) => {
    let userInfos = {
        firstName: data.nom,
        lastName: data.prenom,
        email: data.email,
        // sexe:data.sexe,
        // dateOfBirth:data.dateOfBirth,
        // phoneNumber:data.phoneNumber,
        password: data.password,
        confirmationPassword: data.confirmationPassword,
    }

    console.log(userInfos)
    axios.post("http://localhost:5000/users/register", userInfos)
        .then((response) => {
            console.log(response)
        })
}
function RegisterForm() {
    const redirect = ()=>{
        window.location.href = "http://localhost:5000/users/auth/google"
    }
    const genders = [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' },
        
    ]
    const jours=[]
    const mois=[]
    const années=[]
    for (let i =1; i<=31;i++){
        jours.push({ label:i,value:i})
    }
    for (let i =1; i<=12;i++){
        mois.push({ label:i,value:i})
    }
    for (let i =1; i<=100;i++){
        années.push({ label:2023-i,value:2023-i})
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
                    // submitForm(data)

                    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                        setSection(2)
                    }
                    );
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
                                    {/* <Field
              aria-required={true}
              name="confirmationPassword"
              label="Confirmer le mot de passe"
              defaultValue=""
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              isRequired
              validate={(value) =>
                true ? 'DIFFERENT_PASSWORD' : undefined
                // value && value!==formProps.ref.current.password.value ? 'DIFFERENT_PASSWORD' : undefined
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
            </Field>*/}
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
                                        {({ fieldProps: { id, ...rest }, error }) => (
                                            <Fragment>
                                                <Select
                                                
                                                    inputId={id}
                                                    options={genders}
                                                    isClearable
                                                />
                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                            </Fragment>
                                        )}
                                    </Field>
                                    {/* Date de naissance */}


                                    <Field
                                        name="dateOfBirth"
                                        label="Date de naissance"
                                    >
                                        {({ fieldProps: { id, ...rest }, error }) => (
                                            <Fragment>
                                                <div
                                                    id="dateDeNaissance"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        gap: "0.75rem",
                                                        flexDirection: "row"
                                                    }}
                                                >
                                                    
                                                    <Select
                                                                        {...rest}

                                                        inputId={id}
                                                        options={jours}
                                                        isClearable
                                                    />
                                                    <Select
                                                                        {...rest}

                                                        inputId={id}
                                                        options={mois}
                                                        isClearable
                                                    />
                                                    <Select
                                                                        {...rest}

                                                        inputId={id}
                                                        options={années}
                                                        isClearable
                                                    />
                                                </div>

                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                            </Fragment>
                                        )}
                                    </Field>
                                    {/* <Select options={genders} /> */}
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

                                    {/* <select 
   name="Birthday_day" 
   className='selectAttlassian'
   style={{}}
   >
            <option value="" disabled selected hidden>Jour</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
             
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
             
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
             
            <option value="31">31</option>
            </select>
             
            <select  name="Birthday_Month"className='selectAttlassian'>
              <option value="" disabled selected hidden>Mois</option>
            <option value="January">Jan</option>
            <option value="February">Feb</option>
            <option value="March">Mar</option>
            <option value="April">Apr</option>
            <option value="May">May</option>
            <option value="June">Jun</option>
            <option value="July">Jul</option>
            <option value="August">Aug</option>
            <option value="September">Sep</option>
            <option value="October">Oct</option>
            <option value="November">Nov</option>
            <option value="December">Dec</option>
            </select>
             
            <select name="Birthday_Year"  className='selectAttlassian'>
              <option value="" disabled selected hidden>Année</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
             
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
             
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            </select> */}
                                    {/* Adresse */}


                                    <Field
                                        name="adresse"
                                        label="Adresse de résidance">
                                        {({ fieldProps: { id, ...rest }, error }) => (
                                            <Fragment>


                                                <TextField type="text"
                                                />
                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                            </Fragment>
                                        )}
                                    </Field>
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
                                        onClick={redirect}
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