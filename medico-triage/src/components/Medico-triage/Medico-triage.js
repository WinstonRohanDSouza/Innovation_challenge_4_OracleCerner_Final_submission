import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Medico-triage.css";
import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  Switch,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import Diagnosis from "../Diagnosis/diagnosis";
import Speciality from "../Speciality/Speciality";
import Investigation from "../Investigation/Investigation";
import Treatment from "../Treatment/Treatment";

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
  const [role, setRole] = React.useState(
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
  );
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("en");
  const [options, setOptions] = React.useState([]);
  const [allOptions, setallOptions] = React.useState([]);
  const [showDiagnosis, setshowDiagnosis] = React.useState(false);
  const [dia, setDiagnosis] = React.useState([]);
  const [showResults, setshowResults] = React.useState(false);
  const [result, setResult] = React.useState({});
  const [selected, setSelected] = React.useState([]);
  const [hindi, setHindi] = React.useState([]);
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

  const handleSearchChange = (val) => {
    setHindi(val);
  };

  const translate = async (val, from, to) => {
    const res = await fetch("http://localhost:8080/translate", {
      method: "POST",
      body: JSON.stringify({
        text: val,
        from: from,
        to: to,
      }),
      headers: { "Content-Type": "application/json" },
    });
    let response = await res.text();
    return response;
  };

  const getDiagnosis = async () => {
    setshowDiagnosis(false);
    setshowResults(false);
    if (language === "hi") {
      let translateresponse = await translate(hindi, "hi", "en");

      if (translateresponse) {
        let value = translateresponse.split(",");
        let final = [];
        value.forEach((currentItem) => {
          final.push({ title: currentItem, value: currentItem });
        });
        setSelected(final);
      }
    }

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

        if (language === "hi") {
          let arrayofdiag = [];
          JSON.parse(resDiagnosis.predicted_diagnosis).forEach((element) => {
            arrayofdiag.push(element.Diagnosis);
          });

          let translateresponse = await translate(arrayofdiag, "en", "hi");
          translateresponse = translateresponse.split(",");
          resDiagnosis.predicted_diagnosis = JSON.parse(
            resDiagnosis.predicted_diagnosis
          );
          for (let index = 0; index < translateresponse.length; index++) {
            resDiagnosis.predicted_diagnosis[index]["Diagnosis"] =
              translateresponse[index];
          }
          setshowDiagnosis(true);
          setDiagnosis(resDiagnosis.predicted_diagnosis);
        } else {
          setshowDiagnosis(true);
          setDiagnosis(JSON.parse(resDiagnosis.predicted_diagnosis));
        }
      }
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setshowDiagnosis(false);
    setshowResults(false);
  };

  const getResult = async (value) => {
    setshowResults(false);
    setResult([]);
    let val;
    if (language === "hi") {
      val = await translate(value, "hi", "en");
      value = val;
    }
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
    const resFinalRes = await response.json();

    setshowResults(true);
    if (resFinalRes.recommendation === "no recommendation") {
      setResult([]);
    } else {
      if (language === "hi") {
        let departs = await translate(
          resFinalRes.recommendation.department.toString(),
          "en",
          "hi"
        );
        resFinalRes.recommendation.department = departs.split(",");

        let investigation = await translate(
          resFinalRes.recommendation.investigation.toString(),
          "en",
          "hi"
        );
        resFinalRes.recommendation.investigation = investigation.split(",");
        let treatment = await translate(
          resFinalRes.recommendation.treatment.toString(),
          "en",
          "hi"
        );
        resFinalRes.recommendation.treatment = treatment.split(",");
        setResult(resFinalRes.recommendation);
      } else {
        setResult(resFinalRes.recommendation);
      }
    }
  };

  return (
    <>
      <div className="head">
        <div className={classes.root}>
          <Paper className={classes.paper} style={{ background: "#3f50b5" }}>
            <Typography component="div">
              <Grid
                component="label"
                container
                alignItems="center"
                spacing={1}
                justifyContent="left"
                style={{ justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Select
                    native
                    value={language}
                    onChange={handleLanguageChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                  >
                    <option value={"en"}>
                      <Typography style={{ color: "#ffffff" }}>
                        English
                      </Typography>
                    </option>
                    <option value={"hi"}>
                      <Typography style={{ color: "#ffffff" }}>
                        Hindi
                      </Typography>
                    </option>
                  </Select>
                </Grid>
              </Grid>
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm container>
                <Grid item xs container>
                  <Grid item xs={10}>
                    {language === "en" ? (
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
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        id="search"
                        placeholder="search with hindi language"
                        variant="outlined"
                        style={{ background: "#ffffff", width: "550px" }}
                        onChange={(e) => handleSearchChange(e.target.value)}
                      />
                    )}
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
        <Grid container spacing={3} justify="center">
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
              {role === "patient" || role === "nurse" ? (
                <Grid item xs={12} sm={4}>
                  <Speciality
                    values={"department" in result ? result.department : []}
                  />
                </Grid>
              ) : (
                ""
              )}
              {role === "doctor" || role === "nurse" ? (
                <>
                  <Grid item xs={12} sm={4}>
                    <Investigation
                      values={
                        "investigation" in result ? result.investigation : []
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Treatment
                      values={"treatment" in result ? result.treatment : []}
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </Grid>
      </div>
    </>
  );
}
