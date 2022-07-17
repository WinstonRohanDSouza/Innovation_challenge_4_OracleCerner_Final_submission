import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle, LocalHospitalRounded } from "@material-ui/icons";
import "./Header.module.css";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <LocalHospitalRounded className={classes.icon} />
        <Typography variant="h6" className={classes.title}>
          SmartTriage
        </Typography>
        <Typography variant="h6">
          Helping patients get to the right location and right specialist at the
          right time
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
