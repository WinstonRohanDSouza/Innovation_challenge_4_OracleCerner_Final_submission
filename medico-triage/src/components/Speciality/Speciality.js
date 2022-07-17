import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ListItemSecondaryAction,
  Paper,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Speciality(props) {
  const data = props.values;
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={7}>
      <CardHeader
        avatar={<FontAwesomeIcon icon={Icons.faHospital} size="3x" />}
        titleTypographyProps={{ variant: "h5" }}
        title="Recommended Speciality"
        subheader="Showing recommendations based on the diagnosis"
      />
      <CardContent>
        <Paper
          style={{ maxHeight: 150, minHeight: 150, overflow: "auto" }}
          elevation={0}
        >
          <List className={classes.root}>
            {data.length > 0 ? (
              data.map((parameter) => (
                <div>
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={() => alert("Book an Appointmnet")}
                  >
                    <ListItemAvatar>
                      {
                        <FontAwesomeIcon
                          icon={Icons.faHospitalAlt}
                          size="1x"
                          color="black"
                        />
                      }
                    </ListItemAvatar>
                    <ListItemText primary={parameter} />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={() => alert("Book an Appointmnet")}
                      >
                        Book Appointmnet
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))
            ) : (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {
                    <FontAwesomeIcon
                      icon={Icons.faHospitalAlt}
                      size="1x"
                      color="black"
                    />
                  }
                </ListItemAvatar>
                <ListItemText primary="No Speciality Found" />
              </ListItem>
            )}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
}
