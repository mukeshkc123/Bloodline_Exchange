import React from "react";

const InputType = ({labelText,labelFor,inputType,value,onChange,name}) => {
  return (
    <>
      <div className="mb-3">
        <label for={labelFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          class="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;