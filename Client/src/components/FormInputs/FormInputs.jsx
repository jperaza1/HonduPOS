import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";
import MaskedInput from "react-text-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function FieldGroup({ label, ...props }) {
  let Input = {};
  if (props.masked) {
    Input = <MaskedInput {...props} />;
  } else if (props.date) {
    Input = <DatePicker {...props} />;
  } else {
    Input = <FormControl {...props} />;
  }
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      {Input}
    </FormGroup>
  );
}

export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.properties[i]} />
        </div>
      );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;
