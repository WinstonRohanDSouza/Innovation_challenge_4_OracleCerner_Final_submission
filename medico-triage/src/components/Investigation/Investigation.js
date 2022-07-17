import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ListItemIcon,
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

export default function Investigation(props) {
  const data = props.values;
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={7}>
      <CardHeader
        avatar={
          <FontAwesomeIcon icon={Icons.faFlask} size="3x" color="#673ab7" />
        }
        titleTypographyProps={{ variant: "h5" }}
        title="Recommended interventions"
        subheader="Interventions (lab tests) recommendations based on diagnosis "
      />
      <CardContent>
        <Paper
          style={{ maxHeight: 150, minHeight: 150, overflow: "auto" }}
          elevation={0}
        >
          <List className={classes.root}>
            {data.map((parameter) => (
              <div>
                <ListItem alignItems="flex-start" button>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={Icons.faVial}
                      size="1x"
                      color="black"
                    />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() => alert("Order lab test")}
                    id="switch-list-label-bluetooth"
                    primary={parameter}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      className={classes.button}
                    >
                      Add Lab test
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
}
