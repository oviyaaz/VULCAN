"use client";

import {
  Grid,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  RadioGroup,
  createFilterOptions,
  Paper,
  Checkbox,
  FormControlLabel,
  FilterOptionsState,
  Button,
  Autocomplete,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";
// import Carousel from "react-material-ui-carousel";
import { getUser } from "@/app/vulcan/workspace/WorkspaceListLayout";
import { CurrentUser } from "../../../service/ServerDetail";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  addDocument,
  addsot,
  getDocument,
  getSot,
} from "@/service/onboard/OnboardService";
import * as yup from "yup";
import styles from "@/app/page.module.css";
import ToastMessage from "@/service/ErrorToast/ToastMessage";
import { ToastContainer } from "react-toastify";
import { SotTypes } from "@/service/model/OnboardingSchema";

export interface documentTypes {
  documentId: number;
  documentName: string;
  newInstance?: boolean;
}
const SotOnboard = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [flag, setFlag] = useState(false);
  const [document, setDocument] = useState([]);
  const [user, setUser] = useState<CurrentUser>();
  const [sor, setSor] = useState<any>();
  const [selectedValue, setSelectedValue] = useState("");
  const [onClickIndex, setonClickIndex] = useState<number>();
  const [sorData, setSorData] = useState<any[]>();
  const [click, setClick] = useState(false);
  const [sot, setSot] = useState<any[]>();
  const [selectedSotValue, setSelectedSotValue] = useState("");
  const [sotOnClickIndex, setSotOnClickIndex] = useState<number>();

  const changeHandlerSor = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
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

  const validationSchema = yup.object().shape({
    // username: yup.string().required("Enter Username"),
    // password: yup.string().required("Enter Password"),
  });

  const formik = useFormik({
    initialValues: {
      document: {
        documentName: "",
        newInstance: false,
        documentId: 0,
      },
      sot: [],
      sotSelected: {
        documentId: null,
        documentName: "",
        questionCount: null,
        synonymCount: null,
        truthEntity: "",
        truthEntityId: null,
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let payload = {
        truthEntity: formik.values.sotSelected.truthEntity,
      };
      user &&
        addsot(user, payload, formik.values.document.documentId).then((res) => {
          setClick(false);
          ToastMessage("SOT added successfully", "success");
        });
    },
  });

  const changeHandlerSot = (
    event: React.ChangeEvent<HTMLInputElement>,
    asset: SotTypes,
    index: any
  ) => {
    setSelectedSotValue(event.target.value);
    formik.setFieldValue("selectedSot", asset);
    setSotOnClickIndex(index);
    // const selectedIndex = parseInt(selectedValue.split('-')[1]) - 1
    // props.fetchHandler && props.fetchHandler(field[selectedIndex])
  };

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);
  useEffect(() => {
  }, [formik.values]);
  const getSorHandler = () => {
    user &&
      getSot(user).then((value: any) => {
        if (value.success) {
          let sot: SotTypes[] = value.payload;
          formik.setFieldValue("sot", sot);
          formik.setFieldValue("sotSelected", sot[0]);
        }
      });
  };
  const getDocumentHandler = () => {
    user &&
      getDocument(user).then((value) => {
        if (value.success) {
          let doc: any = value.payload;
          setDocument(doc);
        }
      });
  };
  useEffect(() => {
    if (user) {
      getSorHandler();
      getDocumentHandler();
    }
  }, [user]);
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

  const checkboxHandler = () => {
    setClick(!click);
  };
  const filterDocument = createFilterOptions<documentTypes>({
    matchFrom: "start",
    stringify: (option) => option.documentName,
  });
  const addDocumentHanlder = () => {
    let payload = {
      documentName: formik.values.document.documentName,
    };
    user &&
      addDocument(user, payload).then((res) => {
        getSorHandler();
        getDocumentHandler();
      });
  };

  const newEntityAddHandler = () => {
    formik.setFieldValue("sotSelected", {
      truthEntity: "",
    });
  };

  const saveHandler = () => {
    let payload = {
      truthEntity: formik.values.sotSelected.truthEntity,
    };
    // user &&
    //   addItem(user, payload).then((res) =>
    //     getContainer(user).then((value: any) => {
    //       if (value.success) {
    //         let container: any = value.payload;
    //         setContainer(container);
    //       }
    //     })
    //   );
  };

  return (
    <>
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
            onClick={checkboxHandler}
            color="primary"
            aria-label="add"
            sx={{ width: "4rem", height: "4rem" }}
          >
            <AddIcon />
          </Fab>
        </div> */}
        <Grid>
          {formik.values.sot && (
            <Carousel
              responsive={responsive}
              autoPlay={false}
              infinite={true}
              arrows={true}
              showDots={false}
              draggable={false}
              swipeable={true}
            >
              {formik.values.sot.map((asset: any, key: any) => {
                const index = key;
                return (
                  <RadioGroup
                    id="2"
                    value={selectedSotValue}
                    onChange={(event) => changeHandlerSot(event, asset, index)}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        display: "flex",
                        width: "18vw !important",
                        height: "20vh",
                        margin: "0 2% !important",
                        borderRadius: "30px 30px 20px 20px",
                        background:
                          sotOnClickIndex == index ? "#deedff" : "#ffff",
                        border:
                          sotOnClickIndex == index
                            ? " 1px solid #80b5f3"
                            : "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          width: "100%",
                          margin: "0 !important",
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
                              {asset.truthEntity}
                            </Typography>
                            <Typography sx={{ textAlign: "left" }}>
                              {"Document: "}
                              {asset.documentName}
                            </Typography>
                            <Typography sx={{ textAlign: "left" }}>
                              {"Question Count: "}
                              {asset.questionCount}
                            </Typography>
                            <Typography sx={{ textAlign: "left" }}>
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
            // width: "50vw",
            justifyContent: "center",
            padding: "20px",
            borderRadius: "40px 40px 20px 20px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              sx={{
                "& > *": { marginBottom: "30px", marginTop: "30px" },
              }}
            >
              <Grid md={6} sx={{ display: "flex", justifyContent: "center" }}>
                <Autocomplete
                  id="free-solo-with-text-demo"
                  disableClearable
                  value={formik.values.sotSelected?.documentName}
                  onBlur={formik.handleBlur}
                  onChange={(event: any, newValue: any) => {
                    if (typeof newValue === "string") {
                      setTimeout(() => {
                        const newVar = {
                          documentName: newValue,
                          documentId: 0,
                        };
                        formik.setFieldValue("document", newVar);
                      });
                    } else {
                      if (newValue != null) {
                        formik.setFieldValue("document", newValue);
                      }
                    }
                  }}
                  filterOptions={(
                    options: documentTypes[],
                    params: FilterOptionsState<documentTypes>
                  ) => {
                    const filtered = filterDocument(options, params);

                    if (params.inputValue !== "") {
                      filtered?.push({
                        documentId: 0,
                        documentName: `${params.inputValue}`,
                        newInstance: true,
                      });
                    }
                    return filtered;
                  }}
                  options={document}
                  getOptionLabel={(option: any) => {
                    if (typeof option === "string") {
                      return option;
                    } else {
                      return option.documentName ? option.documentName : "";
                    }
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => (
                    <li
                      key={option.documentId}
                      {...props}
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {option.newInstance
                        ? "click to add new " + option.documentName
                        : option.documentName}
                    </li>
                  )}
                  sx={{ width: "45%" }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      multiline
                      maxRows={4}
                      {...params}
                      label={"Document"}
                      name="document"
                      onBlur={formik.handleBlur}
                      fullWidth
                    />
                  )}
                />
                <Button
                  variant="contained"
                  sx={{
                    // width: "15%",
                    margin: "0 0 0 5%",
                    transform: "None",
                    backgroundColor: "#FFA500",
                    // maxHeight: "40px",
                  }}
                  onClick={() => newEntityAddHandler()}
                >
                  Add new Entity
                </Button>
              </Grid>
              <Dialog open={formik.values.document.newInstance}>
                <DialogTitle sx={{ textAlign: "center" }}>
                  Add Document
                </DialogTitle>
                <DialogContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="document"
                      label="Document"
                      name="document.documentName"
                      value={formik.values.document.documentName}
                      sx={{ width: "45%" }}
                      variant="standard"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={() => addDocumentHanlder()}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        formik.setFieldValue("document.newInstance", false)
                      }
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              <Grid md={6} sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  label="Truth Entity"
                  variant="outlined"
                  name="truthEntity"
                  value={formik.values.sotSelected?.truthEntity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                justifyContent: "flex-end",
                padding: "0  5% 0 0",
                gap: "5px",
                "& > *": { marginBottom: "16px" },
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
                  onClick={() => saveHandler()}
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
                  onClick={() => setClick(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default SotOnboard;
