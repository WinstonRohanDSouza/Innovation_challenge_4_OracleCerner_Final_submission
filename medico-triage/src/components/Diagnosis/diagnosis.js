import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {
  Card,
  CardContent,
  CardHeader,
  ListItemSecondaryAction,
  Paper,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";
import CircularProgressWithLabel from "../CircularProgressBar/CircularProgressBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Diagnosis(props) {
  const data = props.values;
  console.log(props);
  const classes = useStyles();
  const passData = (diagnosis) => {
    props.getResult(diagnosis);
  };
  return (
    <Card className={classes.root} elevation={7}>
      <CardHeader
        avatar={
          <FontAwesomeIcon icon={Icons.faDiagnoses} size="3x" color="#2196f3" />
        }
        titleTypographyProps={{ variant: "h5" }}
        title="Probable Diagnosis"
        subheader="This is only the probable diagnosis based on symptoms provided. Please visit the doctor (in-person or virtual) for a diagnosis and interventions."
      />
      <CardContent>
        <Paper
          style={{ maxHeight: 200, minHeight: 200, overflow: "auto" }}
          elevation={0}
        >
          Total Results : {data.length}
          <List className={classes.root}>
            {data.length > 0 ? (
              data.map((parameter) => (
                <div>
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={() => passData(parameter["Diagnosis"])}
                  >
                    <ListItemAvatar>
                      {
                        <FontAwesomeIcon
                          icon={Icons.faFileMedicalAlt}
                          size="1x"
                          color="black"
                        />
                      }
                    </ListItemAvatar>
                    <ListItemText primary={parameter.Diagnosis} />
                    <ListItemSecondaryAction>
                      <CircularProgressWithLabel
                        variant="determinate"
                        value={parameter["Similarity-Score"] * 100}
                      />
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
                      icon={Icons.faFileMedicalAlt}
                      size="1x"
                      color="black"
                    />
                  }
                </ListItemAvatar>
                <ListItemText primary="No Diagnosis Found, Please search with other symptoms" />
              </ListItem>
            )}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
}
