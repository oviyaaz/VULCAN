"use client";

import {
  Grid,
  Typography,
  TextField,
  RadioGroup,
  Paper,
  FormControlLabel,
  Button,
  Autocomplete,
  createFilterOptions,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FilterOptionsState,
  Radio,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getUser } from "@/app/vulcan/workspace/WorkspaceListLayout";
import { CurrentUser } from "../../../service/ServerDetail";
import { containerTypes } from "@/service/model/OnboardingSchema";
import {
  getSor,
  getContainer,
  addItem,
} from "@/service/onboard/OnboardService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "@/app/page.module.css";
import { addContainer } from "@/service/onboard/OnboardService";
import { SorTypes } from "@/service/model/OnboardingSchema";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const SorOnboard = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState<CurrentUser>();
  const [sor, setSor] = useState<any>();
  const [selectedValue, setSelectedValue] = useState("");
  const [onClickIndex, setonClickIndex] = useState<number>();
  const [sorData, setSorData] = useState<any[]>();
  const [click, setClick] = useState(false);
  const [value, setValue] = useState();
  const [container, setContainer] = useState([]);
  const [selectedSorValue, setSelectedSorValue] = useState("");
  const [sorOnClickIndex, setSorOnClickIndex] = useState<number>();
  const [allowedAdapter, setAllowedAdapter] = useState("");
  const [restrictedAdapter,setRestrictedAdapter] = useState("");
  const validationSchema = yup.object().shape({
    // username: yup.string().required("Enter Username"),
    // password: yup.string().required("Enter Password"),
  });
  const formik = useFormik({
    initialValues: {
      itemName: "",
      allowedAdapter: "",
      restrictedAdapter: "",
      wordLimit: null,
      wordThreshold: null,
      charLimit: null,
      charThreshold: null,
      validatorThreshold: null,
      allowedCharacters: "",
      comparableCharacters: "",
      restrictedAdapterFlag: null,
      container: {
        containerName: "",
        newInstance: false,
        containerId: null,
      },
      votingCutOff: null,
      sor: [],
      selectedSor: {
        itemName: "",
        allowedAdapter: "",
        restrictedAdapter: "",
        wordLimit: null,
        wordThreshold: null,
        charLimit: null,
        charThreshold: null,
        validatorThreshold: null,
        allowedCharacters: "",
        comparableCharacters: "",
        restrictedAdapterFlag: null,
        containerName: "",
        containerId: null,
        container: {
          containerName: "",
          containerId: null,
          newInstance: false,
        },
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let payload = {
        itemName: formik.values.itemName,
        allowedAdapter: formik.values.allowedAdapter,
        restrictedAdapter: formik.values.restrictedAdapter,
        wordLimit: formik.values.wordLimit,
        wordThreshold: formik.values.wordThreshold,
        charLimit: formik.values.charLimit,
        charThreshold: formik.values.charThreshold,
        validatorThreshold: formik.values.validatorThreshold,
        allowedCharacters: formik.values.allowedCharacters,
        comparableCharacters: formik.values.comparableCharacters,
        restrictedAdapterFlag: formik.values.restrictedAdapterFlag,
        containerId: formik.values.container.containerId,
      };
      user &&
        addItem(user, payload).then((res) =>
          getContainer(user).then((value: any) => {
            if (value.success) {
              let container: any = value.payload;
              setContainer(container);
            }
          })
        );
    },
  });

  const changeHandlerSor = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any,
    asset: SorTypes
  ) => {
    const selectedValue = event.target.value;
    setSelectedValue(event.target.value);
    setonClickIndex(index);
    const selectedIndex = parseInt(selectedValue.split("-")[1]) - 1;
    // props.fetchHandler && props.fetchHandler(field[selectedIndex])
  };
  const handleClick = (): void => {
    // TODO: Clear the search input
  };

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);
  useEffect(() => {
    if (user) {
      getSor(user).then((value: any) => {
        if (value.success) {
          let sor: SorTypes[] = value.payload;
          formik.setFieldValue("sor", sor);
          formik.setFieldValue("selectedSor", value.payload[0] ?? "");
        }
      });
      getContainer(user).then((value: any) => {
        if (value.success) {
          let container: any = value.payload;
          setContainer(container);
          formik.setFieldValue("selectedSor", value.payload[0] ?? "");
        }
      });
    }
  }, [user]);
  const newItemAddHandler = () => {
    formik.setFieldValue("selectedSor", {
      itemName: "",
      allowedAdapter: "",
      restrictedAdapter: "",
      wordLimit: null,
      wordThreshold: null,
      charLimit: null,
      charThreshold: null,
      validatorThreshold: null,
      allowedCharacters: "",
      comparableCharacters: "",
      restrictedAdapterFlag: null,
      container: {
        containerName: "",
        newInstance: false,
        containerId: "",
      },
    });
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // const checkboxHandler = (clickCheckbox: any) => {
  //   setClick(!click);
  //   setValue(clickCheckbox);
  // };
  const filterSorContainer = createFilterOptions<containerTypes>({
    matchFrom: "start",
    stringify: (option) => option.containerName,
  });
  useEffect(() => {}, [formik.values]);
  const addContainerHanlder = () => {
    let payload = {
      containerName: formik.values.container.containerName,
      votingOut: formik.values.votingCutOff,
    };
    user && addContainer(user, payload).then((res) => res);
  };

  const allowedAdapterHandleChange = (event: SelectChangeEvent) => {
    setAllowedAdapter(event.target.value as string);
  };

  const restrictedAdapterHandleChange = (event: SelectChangeEvent) => {
    setRestrictedAdapter(event.target.value as string);
  };
  
  // const saveHandler = () => {
  //   let payload = {
  //     itemName: formik.values.itemName,
  //     allowedAdapter: formik.values.allowedAdapter,
  //     restrictedAdapter: formik.values.restrictedAdapter,
  //     wordLimit: formik.values.wordLimit,
  //     wordThreshold: formik.values.wordThreshold,
  //     charLimit: formik.values.charLimit,
  //     charThreshold: formik.values.charThreshold,
  //     validatorThreshold: formik.values.validatorThreshold,
  //     allowedCharacters: formik.values.allowedCharacters,
  //     comparableCharacters: formik.values.comparableCharacters,
  //     restrictedAdapterFlag: formik.values.restrictedAdapterFlag,
  //     containerId: formik.values.containerId,
  //   };
  //   user &&
  //     addItem(user, payload).then((res) =>
  //       getContainer(user).then((value: any) => {
  //         if (value.success) {
  //           let container: any = value.payload;
  //           setContainer(container);
  //         }
  //       })
  //     );
  // };
  return (
    <Grid
      sx={{
        "& > *": { marginBottom: "30px" },
      }}
      className={styles.synonymnonboard_container}
    >
      {/* <div
        style={{ display: "flex", justifyContent: "flex-end", width: "90%" }}
      >
        <Fab
          // onClick={checkboxHandler}
          color="primary"
          aria-label="add"
          sx={{ width: "4rem", height: "4rem" }}
        >
          <AddIcon />
        </Fab>
      </div> */}
      <Grid>
        {formik.values.sor && (
          <Carousel
            responsive={responsive}
            autoPlay={false}
            infinite={false}
            arrows={true}
            showDots={false}
            draggable={false}
            swipeable={true}
            className={styles.carousel__view}
          >
            {formik.values.sor.map((asset: SorTypes, key: any) => {
              const index = key;
              return (
                <RadioGroup
                  id="1"
                  value={selectedSorValue}
                  onChange={(event) => changeHandlerSor(event, asset, index)}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      display: "flex",
                      width: "18vw !important",
                      height: "20vh",
                      // margin: "0 2% !important",
                      borderRadius: "30px 30px 20px 20px",
                      background:
                        sorOnClickIndex == index ? "#deedff" : "#ffff",
                      border:
                        sorOnClickIndex == index
                          ? " 1px solid #80b5f3"
                          : "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        margin: "0 !important",
                        display: "flex",
                        justifyContent: "center",
                      }} // Update this line
                      value={`option-${index + 1}`}
                      control={<Radio className={styles.custom__radio} />}
                      label={
                        <div>
                          <Typography
                            sx={{
                              textAlign: "left",
                              fontWeight: "900",
                            }}
                          >
                            {asset.itemName}
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "left",
                              fontWeight: "500",
                            }}
                          >
                            {"Container: "}
                            {asset.containerName}
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "left",
                              fontWeight: "500",
                            }}
                          >
                            {"Question Count: "}
                            {asset.questionCount}
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "left",
                              fontWeight: "500",
                            }}
                          >
                            {"Synonym Count: "}
                            {asset.synonymCount}
                          </Typography>
                        </div>
                      }
                    />
                  </Paper>
                </RadioGroup>
              );
            })}
          </Carousel>
        )}
      </Grid>
      <Paper
        sx={{
          "& > *": { marginBottom: "16px" },
          columnGap: "20px",
          // width: "90vw",
          justifyContent: "center",
          // margin: "5%",
          // padding: "20px",
          // margin: "auto",
          borderRadius: "40px 40px 20px 20px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            sx={{
              "& > *": { margin: "30px 30px 0 30px" },
            }}
          >
            <Autocomplete
              id="free-solo-with-text-demo"
              disableClearable
              // value={formik.values.selectedSor?.containerName??""}
              onBlur={formik.handleBlur}
              onChange={(event: any, newValue: any) => {
                if (typeof newValue === "string") {
                  setTimeout(() => {
                    const newVar = {
                      containerName: newValue,
                      containerId: 0,
                    };
                    formik.setFieldValue("container", newVar);
                  });
                } else {
                  if (newValue != null) {
                    formik.setFieldValue("container", newValue);
                  }
                }
              }}
              filterOptions={(
                options: containerTypes[],
                params: FilterOptionsState<containerTypes>
              ) => {
                const filtered = filterSorContainer(options, params);

                if (params.inputValue !== "") {
                  filtered?.push({
                    containerId: 0,
                    containerName: `${params.inputValue}`,
                    newInstance: true,
                  });
                }
                return filtered;
              }}
              options={container}
              getOptionLabel={(option: any) => {
                if (typeof option === "string") {
                  return option;
                } else {
                  return option.containerName ? option.containerName : "";
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li
                  key={option.containerId}
                  {...props}
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  {option.newInstance
                    ? "click to add new " + option.containerName
                    : option.containerName}
                </li>
              )}
              sx={{ width: "45%" }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  multiline
                  maxRows={4}
                  {...params}
                  label={"Container"}
                  name="container"
                  onBlur={formik.handleBlur}
                  fullWidth
                />
              )}
            />
            <Button
              variant="contained"
              sx={{
                width: "15%",
                margin: "3% 2% 0 0",
                transform: "None",
                backgroundColor: "#FFA500",
                // maxHeight: "40px",
              }}
              onClick={() => newItemAddHandler()}
            >
              Add new item
            </Button>
          </Grid>
          <Dialog open={formik.values.container.newInstance}>
            <DialogTitle sx={{ textAlign: "center" }}>
              Add Container
            </DialogTitle>
            <DialogContent>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="container"
                  label="container"
                  name="container.containerName"
                  value={formik.values.container.containerName}
                  sx={{ width: "45%" }}
                  variant="standard"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  margin="dense"
                  id="votingcutoff"
                  type="number"
                  label="Voting-cut-off"
                  name="votingCutOff"
                  sx={{ width: "45%" }}
                  value={formik.values.votingCutOff}
                  autoComplete="off"
                  variant="standard"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => addContainerHanlder()}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    formik.setFieldValue("container.newInstance", false)
                  }
                >
                  Cancel
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Grid
            container
            sx={{
              "& > *": { marginBottom: "30px", marginTop: "30px" },
            }}
          >
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Item Name"
                variant="outlined"
                name="itemName"
                value={formik.values.selectedSor?.itemName ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Allowed Adapter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="allowedAdapter"
                  value={allowedAdapter}
                  label="Allowed Adapter"
                  onChange={allowedAdapterHandleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={1}>alpha</MenuItem>
                  <MenuItem value={2}>alphanumeric</MenuItem>
                  <MenuItem value={3}>date</MenuItem>
                  <MenuItem value={4}>numeric_reg</MenuItem>
                  <MenuItem value={5}>phone_reg</MenuItem>
                  <MenuItem value={6}>ner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Restricted Adapter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="restrictedAdapter"
                  value={restrictedAdapter}
                  label="Restricted Adapter"
                  onChange={restrictedAdapterHandleChange}
                >
                  <MenuItem value={1}>alpha</MenuItem>
                  <MenuItem value={2}>alphanumeric</MenuItem>
                  <MenuItem value={3}>date</MenuItem>
                  <MenuItem value={4}>numeric_reg</MenuItem>
                  <MenuItem value={5}>phone_reg</MenuItem>
                  <MenuItem value={6}>ner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Word Limit"
                variant="outlined"
                name="wordLimit"
                value={formik.values.selectedSor?.wordLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              "& > *": { marginBottom: "30px" },
            }}
          >
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Word Threshold"
                variant="outlined"
                name="wordThreshold"
                value={formik.values.selectedSor?.wordThreshold}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Char Limit"
                variant="outlined"
                name="charLimit"
                value={formik.values.selectedSor?.charLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Char Threshold"
                variant="outlined"
                name="charThreshold"
                value={formik.values.selectedSor?.charThreshold}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Validator Threshold"
                variant="outlined"
                name="validatorThreshold"
                value={formik.values.selectedSor?.validatorThreshold}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              "& > *": { marginBottom: "30px" },
            }}
          >
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Allowed Characters"
                variant="outlined"
                name="allowedCharacters"
                value={formik.values.selectedSor?.allowedCharacters}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Comparable Characters"
                variant="outlined"
                name="comparableCharacters"
                value={formik.values.selectedSor?.comparableCharacters}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Restricted Adapter Flag"
                variant="outlined"
                name="restrictedAdapterFlag"
                value={formik.values.selectedSor?.restrictedAdapterFlag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                label="Container ID"
                variant="outlined"
                name="containerId"
                value={formik.values.selectedSor?.containerId ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              justifyContent: "flex-end",
              padding: "0 3% 2% 0",
              gap: "5px",
            }}
          >
            <Grid>
              <Button
                variant="contained"
                size="small"
                sx={{
                  fontSize: "16px",
                  minWidth: "76px",
                  padding: "8px 10px",
                  marginRight: "8px",
                  textTransform: "none",
                  backgroundColor: "#FFA500",
                }}
                type="submit"
              >
                Save
              </Button>
            </Grid>

            <Grid>
              <Button
                variant="contained"
                size="small"
                sx={{
                  fontSize: "16px",
                  minWidth: "76px",
                  padding: "8px 10px",
                  textTransform: "none",
                  backgroundColor: "#FFA500",
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SorOnboard;
