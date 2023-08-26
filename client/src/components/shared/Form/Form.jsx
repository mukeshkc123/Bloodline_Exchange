import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              email,
              password,
              role,
              name,
              organisationName,
              hospitalName,
              website,
              address,
              phone
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          {/* donar checkbox */}
          <div className="form-check">
            <input
              id="donarRadio"
              type="radio"
              className="form-check-input"
              name="role"
              value={"donar"}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>

          {/* admin checkbox */}
          <div className="form-check ms-2">
            <input
              id="adminRadio"
              type="radio"
              className="form-check-input"
              name="role"
              value={"admin"}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          {/* hospital checkbox */}
          <div className="form-check ms-2">
            <input
              id="hospitalRadio"
              type="radio"
              className="form-check-input"
              name="role"
              value={"hospital"}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          {/* organisation checkbox */}
          <div className="form-check ms-2">
            <input
              id="organisationRadio"
              type="radio"
              className="form-check-input"
              name="role"
              value={"organisation"}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>
        {/* switch statement  */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></InputType>

                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></InputType>
                </>
              );
            }

            case formType === "register": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></InputType>

                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></InputType>

                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></InputType>
                  )}

                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"forOrganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    ></InputType>
                  )}

                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    ></InputType>
                  )}

                  {(role === "hospital" || role === "organisation") && (
                    <InputType
                      labelText={"Website"}
                      labelFor={"forWebsite"}
                      inputType={"text"}
                      name={"website"}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    ></InputType>
                  )}

                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></InputType>

                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></InputType>
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet?Register
              <Link to="/register"> Here!</Link>
            </p>
          ) : (
            <p>
              Alreday a user? Please
              <Link to="/login"> Login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
