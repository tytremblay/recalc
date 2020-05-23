import React, { useState, useEffect } from "react";
import Qty from "js-quantities";

export function NumberInputCore(props) {
  // Prepare inputs
  const [magnitude, setMagnitude] = useState(props.number);

  // Update
  useEffect(() => {
    props.setQuery({
      [props.name]: Number(magnitude === "." ? 0 : magnitude),
    });
  }, [magnitude]);

  return (
    <div className="field has-addons">
      <p className="control is-expanded">
        <input
          className="input input-right"
          value={magnitude}
          onChange={(e) => {
            setMagnitude(e.target.value);
          }}
        />
      </p>
    </div>
  );
}

// not tested
export function NumberInput(props) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body">
        <NumberInputCore {...props} />
      </div>
    </div>
  );
}

export function NumberOutputCore(props) {
  let inputClasses = "input input-right";
  if (props.redIf && props.redIf()) {
    inputClasses += " is-danger";
  } else if (props.greenIf && props.greenIf()) {
    inputClasses += " is-success";
  }

  return (
    <div className="field has-addons">
      <p className="control is-expanded">
        <input
          disabled
          className={inputClasses}
          value={String(props.number.toFixed(props.precision))}
        />
      </p>
    </div>
  );
}

export function NumberOutput(props) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body">
        <NumberOutputCore {...props} />
      </div>
    </div>
  );
}
