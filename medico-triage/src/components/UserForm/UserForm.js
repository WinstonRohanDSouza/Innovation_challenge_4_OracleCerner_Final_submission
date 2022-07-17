import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./UserForm.module";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import { LocalHospitalRounded } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";

class Registration extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    age: "",
    phoneNumber: true,
    error: null,
    errorOpen: false,
    showPage: false,
  };

  errorClose = (e) => {
    this.setState({
      errorOpen: false,
    });
  };

  handleChange = (name) => (e) => {
    // if (e.target.value === "");
    this.setState({
      [name]: e.target.value,
    });

    localStorage.setItem([name], e.target.value);
  };

  calculateAge = (dob) => (e) => {
    var today = new Date();
    var birthDate = new Date(e.target.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(age);
    this.setState({
      age: age,
    });
  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    }
    return true;
  };

  submitRegistration = (e) => {
    // localStorage.setItem("PatientInfo", this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalHospitalRounded
              className={classes.icon}
              style={{ color: blue[500], fontSize: 30 }}
            />
          </Avatar>

          <Typography variant="h6" gutterBottom>
            Add Patient Details
          </Typography>

          <form className={classes.form}>
            <Grid item container spacing={1} justify="center">
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    onChange={this.handleChange("firstName")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={this.handleChange("lastName")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl component="fieldset">
                  <FormLabel htmlFor="gender" className={classes.labels}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    onChange={this.handleChange("gender")}
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      className={classes.radio}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      className={classes.radio}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      className={classes.radio}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <InputLabel htmlFor="dob" className={classes.labels}>
                  Date of Birth
                </InputLabel>
                <FormControl fullWidth margin="normal">
                  <Input
                    name="dob"
                    type="date"
                    className={classes.inputs}
                    disableUnderline={true}
                    onChange={
                      (this.handleChange("dob"), this.calculateAge("dob"))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    name="age"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="age"
                    label="Age in years"
                    disabled
                    value={this.state.age}
                    onChange={this.handleChange("age")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    name="phoneNumber"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    onChange={this.handleChange("phoneNumber")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {" "}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  disabled={!this.isValid()}
                  disableRipple
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.submitRegistration}
                  type="submit"
                  href="/triage"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(register)(Registration);
