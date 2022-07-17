import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Medico-triage.css";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import Diagnosis from "../Diagnosis/diagnosis";
import Speciality from "../Speciality/Speciality";
import Investigation from "../Investigation/Investigation";
import Treatment from "../Treatment/Treatment";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function MedicoTriage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [allOptions, setallOptions] = React.useState([]);
  const [showDiagnosis, setshowDiagnosis] = React.useState(false);
  const [dia, setDiagnosis] = React.useState([]);
  const [showResults, setshowResults] = React.useState(false);
  const [result, setResult] = React.useState({});
  const [selected, setSelected] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!loading) {
      return undefined;
    }

    return () => {};
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChangeHandle = async (value) => {
    setallOptions([]);
    if (value.length > 1) {
      const response = await fetch(
        "https://intelli-search-csh.herokuapp.com/autopredict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "intelli-search-csh",
          },
          body: JSON.stringify({ text: value, text_type: "symptoms" }),
        }
      );

      const symptoms = await response.json();
      const finalResponse = [];
      symptoms.predicted_words.forEach((element) => {
        finalResponse.push({ title: element, value: element });
      });
      setallOptions(finalResponse);
    }
  };

  const getDiagnosis = async () => {
    if (selected.length === 0) {
      setshowDiagnosis(false);
      setshowResults(false);
    } else {
      let value = [];
      selected.forEach((element) => {
        value.push(element.value);
      });
      if (value.length > 1) {
        const response = await fetch(
          "https://diagnosis-prediction-model.herokuapp.com/diagnoisPrediction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ symptoms: value }),
          }
        );

        const resDiagnosis = await response.json();

        setshowDiagnosis(true);
        setDiagnosis(resDiagnosis.predicted_diagnosis);
      }
    }
  };

  const getResult = async (value) => {
    console.log(value);

    const response = await fetch(
      "https://diagnosis-prediction-model.herokuapp.com/recommendationBasisDiagnosis",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diagnosis: [value] }),
      }
    );

    const resFinalRes = {
      investigation: ["Chest X-ray", "Gene-Xpert (CBNAAT)", "CT Scan"],
      treatment: ["Isoniazid"],
      department: ["General Medicine"],
    }; //await response.json();
    setshowResults(true);

    setResult(resFinalRes);
  };

  return (
    <>
      <div className="head">
        <div className={classes.root}>
          <Paper className={classes.paper} style={{ background: "#3f50b5" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm container>
                <Grid item xs container>
                  <Grid item xs={10}>
                    <Autocomplete
                      id="asynchronous"
                      noOptionsText={"No matches found"}
                      multiple
                      limitTags={3}
                      open={open}
                      onChange={(event, selectedValue) => {
                        setSelected(selectedValue);
                        setshowDiagnosis(false);
                        setshowResults(false);
                      }}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      getOptionSelected={(option, value) =>
                        option.name === value.title
                      }
                      getOptionLabel={(option) => option.title}
                      options={allOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter Symptoms Here...."
                          variant="outlined"
                          style={{ background: "#ffffff" }}
                          onChange={(ev) => {
                            // dont fire API if the user delete or not entered anything
                            if (
                              ev.target.value !== "" ||
                              ev.target.value !== null
                            ) {
                              onChangeHandle(ev.target.value);
                            }
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button onClick={getDiagnosis}>
                      <SearchOutlined
                        className="fa fa-plus-circle"
                        style={{ color: "white", fontSize: 35 }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>

      <div
        className={classes.root}
        style={{ marginTop: "10%", marginRight: "5%", marginLeft: "5%" }}
      >
        <Grid container spacing={3}>
          {showDiagnosis ? (
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ background: "none", boxShadow: "none" }}
              >
                <Diagnosis values={dia} getResult={getResult} />
              </Paper>
            </Grid>
          ) : (
            ""
          )}
          {showResults ? (
            <>
              <Grid item xs={12} sm={4}>
                <Speciality values={result.department} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Investigation values={result.investigation} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Treatment values={result.treatment} />
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
      </div>
    </>
  );
}
