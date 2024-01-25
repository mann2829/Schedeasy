import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ControlledRadioButtonsGroup(props) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <FormControl
      disabled={props.disabled || false}
      className="type-form-control"
    >
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        className="type-custom-radio"
      >
        <FormControlLabel
          checked={value === props.label[0]}
          control={<Radio />}
          label={props.label[0]}
          value={props.label[0]}
        />
        <FormControlLabel
          checked={value === props.label[1]}
          control={<Radio />}
          label={props.label[1]}
          value={props.label[1]}
        />
      </RadioGroup>
    </FormControl>
  );
}
