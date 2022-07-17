import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RolePage.module";

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
  Container,
  Box,
} from "@material-ui/core";

import { Person } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";

class RolePage extends Component {
  constructor(props) {
    super(props);
    this.url = "/";
  }
  state = {
    role: "",
  };

  handleChange = (name) => (e) => {
    // if (e.target.value === "");
    this.setState({
      [name]: e.target.value,
    });
    if (e.target.value === "nurse") {
      this.url = "/patient/" + e.target.value;
    } else if (e.target.value === "doctor") {
      this.url = "/triage/" + e.target.value;
    } else if (e.target.value === "patient") {
      this.url = "/patient/" + e.target.value;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Container style={{ height: "90vh", maxWidth: "fit-content" }}>
        <Box my={2}>
          <div className={classes.main}>
            <CssBaseline />

            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <Person
                  className={classes.icon}
                  style={{ color: blue[500], fontSize: 30 }}
                />
              </Avatar>

              <Typography
                variant="h5"
                gutterBottom
                style={{ marginTop: "10px" }}
              >
                SmartTriage
              </Typography>

              <form className={classes.form}>
                <Grid
                  item
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormControl component="fieldset">
                      <FormLabel htmlFor="role" className={classes.labels}>
                        Select Role
                      </FormLabel>
                      <RadioGroup
                        aria-label="role"
                        name="role"
                        onChange={this.handleChange("role")}
                      >
                        <FormControlLabel
                          value="nurse"
                          control={<Radio />}
                          label="Nurse"
                          className={classes.radio}
                        />
                        <FormControlLabel
                          value="doctor"
                          control={<Radio />}
                          label="Doctor"
                          className={classes.radio}
                        />
                        <FormControlLabel
                          value="patient"
                          control={<Radio />}
                          label="Patient"
                          className={classes.radio}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    {" "}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Button
                      disableRipple
                      variant="contained"
                      className={classes.button}
                      type="submit"
                      href={this.url}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>
        </Box>
      </Container>
    );
  }
}

export default withStyles(register)(RolePage);
