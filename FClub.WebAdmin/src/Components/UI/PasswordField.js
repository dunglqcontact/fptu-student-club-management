import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

const PasswordField = (props) => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth variant="standard" required>
      <InputLabel error={props.isError} htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <Input
        inputRef={props.inputRef}
        id={props.id}
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        placeholder={props.placeholder}
        onChange={handleChange("password")}
        error={props.isError}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.isError && (
        <FormHelperText error>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordField;
