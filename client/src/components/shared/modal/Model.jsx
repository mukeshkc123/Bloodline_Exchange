import React, { useState } from "react";
import InputType  from "../Form/InputType";
import API from "../../../services/API"
import { useSelector } from "react-redux";



const Model = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  // const [,set] = useState("");

  const {user} = useSelector((state) => (state.auth))

  //handle modal data 
  const handleModelSubmit = async()=>{

    try {
           if(!bloodGroup || !quantity){
            return alert("Please Provide all fields");
           }
           const {data} =  await API.post("/inventory/create-inventory",{
            email,
            organisation:user?._id,
            inventoryType,
            bloodGroup,
            quantity
           });

    if (data?.success) {
      alert("New record created");
      window.location.reload();
    } else {
      alert("Error creating record");
      console.log("API response:", data);
    }
    } catch(error) {
      alert(error.response.data.message);
        console.log(error)
        window.location.reload();
    }

  }

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage blood record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                Blood type: &nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="bloodInOut"
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    defaultChecked
                    className="form-check-input"
                  />
                  <label htmlFor="in" className="form-check-label">
                    In
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="bloodInOut"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="Out" className="form-check-label">
                    Out
                  </label>
                </div>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChangeCapture={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue>Choose the blood group</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
              </select>
              <InputType labelText={"Donar email"}
                labelFor={"donarEmail"}
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></InputType>
              <InputType labelText={"Quantity(in ML)"}
                labelFor={"Quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></InputType>
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick ={handleModelSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
