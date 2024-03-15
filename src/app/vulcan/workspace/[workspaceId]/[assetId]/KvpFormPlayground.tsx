import { Truth } from "@/service/model/Plugins";
import React from "react";
import { Origin } from "@/service/model/Plugins";
import { Grid } from "@mui/material";
import { FilterOptionsState, Stack, Button } from "@mui/material";
import { Question } from "@/app/vulcan/meta/MetaSchema";
import { container } from "@/app/vulcan/meta/MetaSchema";
import { SorField } from "@/app/vulcan/meta/MetaSchema";
import { Synonym } from "@/app/vulcan/meta/MetaSchema";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import BoundaryImageViewer from "@/service/Bbox/BoundingImageViewer";
import Carousel from "react-material-ui-carousel";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import "react-toastify/dist/ReactToastify.css";
import { ValuationAnswer } from "@/service/model/Plugins";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import FormContainer from "@/app/vulcan/transaction/FormContainer";
import {
  findAnswer,
  getMetaContainer,
  metaSynonym,
} from "@/service/plugins/PluginService";
import { getSynonymn } from "@/service/plugins/PluginService";
import { getUser } from "../../WorkspaceListLayout";
import { getMetaField } from "@/service/plugins/PluginService";
import { truthEntity } from "@/app/vulcan/meta/MetaSchema";
import { getMetaEntity } from "@/service/plugins/PluginService";
export function KvpFormPlayground(props: {
  images: Truth[];
  originId: string;
  workspaceId: number;
}) {
  const [valueSynonym, setValueSynonym] = React.useState<Synonym>();
  const [valuation, setValuation] = React.useState<any | undefined>();
  const [valuationInProgress, setValuationInProgress] =
    React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [sorContainers, setSorContainers] = React.useState<container[]>([]);
  const [truthEntityField,setTruthEntityField] = React.useState<any[]>([]);
  const [synonyms, setSynonyms] = React.useState<Synonym[]>([]);
  const [sorItems, setSorItems] = React.useState<SorField[]>([]);
  const containerDataFetchedRef = React.useRef(false);
  const [isSynonymFetched, setIsSynonymFetched] = React.useState(false);
  const [pageNo, setPageNo] = React.useState<number>(1);
  const formik = useFormik({
    initialValues: {
      container: {
        status: "",
        containerId: 0,
        containerName: "",
        tenantID: "",
        newInstance: false,
      },
      field: {
        status: "",
        itemId: 0,
        itemName: "",
        tenantID: "",
        newInstance: false,
      },
      synonym: {
        status: "",
        synonym: "",
        questions: [],
        synonymId: 0,
        tenantID: "",
        newInstance: false,
      },
      question: {
        question: "",
        newInstance: false,
      },
      model: "",
    },
    onSubmit: async (values) => {
      let user = getUser();
      console.log("submitted Values", values.container);
      let sorDetailBody = {
        itemName: formik.values.field?.itemName,
        itemId: formik.values.field?.itemId,
        containerName: formik.values.container?.containerName,
        containerId: formik.values.container?.containerId,
        truthEntityName: formik.values.container?.containerName,
        truthEntityId: formik.values.container?.containerId,
        synonymName: formik.values.synonym?.synonym,
        synonymId: formik.values.synonym?.synonymId,
        question: formik.values.question?.question,
        questionId: null,
      };
      metaSynonym(user, sorDetailBody).then((response: any) => {
        toast.success("Question Added", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("RESPONSEEEEEEE", response);
        setValueSynonym(response);
        formik.setFieldValue("synonym", response);
        formik.setFieldValue("question.newInstance", false);
      });
    },
  });

  const metaContainerHandler = () => {
    let user = getUser();
    getMetaContainer(user).then((response) => setSorContainers(response.payload));
    getMetaField(user).then((response: any) => setSorItems(response.payload));
    getMetaEntity(user).then((response:any)=>setTruthEntityField(response.payload));
    setIsSynonymFetched(true);
  };

  useEffect(() => {
    if (containerDataFetchedRef.current) return;
    containerDataFetchedRef.current = true;
    metaContainerHandler();
  }, []);
  const filterSorContainer = createFilterOptions<container>({
    matchFrom: "start",
    stringify: (option) => option.containerName,
  });
  const filterSorField = createFilterOptions<SorField>({
    matchFrom: "start",
    stringify: (option) => option.itemName,
  });
  const filterSorSynonym = createFilterOptions<Synonym>({
    matchFrom: "start",
    stringify: (option) => option.synonym,
  });
  const filterSorQuestion = createFilterOptions<Question>({
    matchFrom: "start",
    stringify: (option) => option.question,
  });
  const filterTruthEntity = createFilterOptions<any>({
    matchFrom: "start",
    stringify: (option) => option.truthEntity,
  });
  const synonymHandler = () => {
    let user = getUser();
    getSynonymn(
      user,
      formik.values.container.containerId,
      formik.values.field.itemId
    ).then((response: any) => setSynonyms(response.payload));
  };
  useEffect(() => {
    if (isSynonymFetched) synonymHandler();
  }, [formik.values.container && formik.values.field]);

  const valuationHandler = () => {
    setValuationInProgress(true);
    let user = getUser();
    findAnswer(user, props.originId, pageNo, formik.values.question.question,formik.values.model)
      .then((response) => {
        console.log("RESPONSE", response.payload);
        let kvpanswer:any=response.payload;
        setValuation(kvpanswer);
        setValuationInProgress(true);
        // let valuations: ValuationAnswer[] = response;
        // if (valuations && valuations.length > 0) {
        //   const valuationNew = valuations[0];
        //   setValuation(valuationNew);
        //   console.log("VALUATION", valuationNew);
        //   toast.success("Answer Found", {
        //     position: "bottom-left",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        // } else if (valuations && valuations.length === 0) {
        //   setValuation(undefined);
        //   toast.error("No Answer Found", {
        //     position: "bottom-left",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        // } else {
        //   setValuation(undefined);
        //   toast.error("No Answer Found", {
        //     position: "bottom-left",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        // }
      })
      .finally(() => setValuationInProgress(false));
  };
  console.log("VVVV",valuation);
  return (
    <Grid container md={12} sm={12} sx={{ height: "75vh" }}>
      <Grid md={7} sm={12} sx={{ height: "75vh", width: "100%" }}>
        <Carousel
          sx={{
            width: "96% !important",
            backgroundColor: "white",
            marginLeft: "20px !important",
            marginTop: "0px !important",
            marginRight: "10px !important",
            borderRadius: "25px",
            height: "100%",
          }}
          autoPlay={false}
          next={() => {
            let number = pageNo + 1;
            if (props.images.length >= number) {
              setPageNo(number);
            }
          }}
          prev={() => {
            let number = pageNo - 1;
            if (0 < number) {
              setPageNo(number);
            }
          }}
        >
          {props.images[pageNo - 1] &&
                        BoundaryImageViewer(
                            props.images[pageNo - 1].encode,
                            pageNo,
                            valuation)}
        </Carousel>
      </Grid>
      <Grid md={5} sm={12} sx={{height: "100%", background: "#ffff", borderRadius: "25px",}}>
        {/* <SynonymForm
                onChange={(valuation1) => setValuation(valuation1)}
                onChangeQuestion={(question1) => setQuestion(question1)}
                 func={pull_data}
             /> */}
        {/* <ValuationForm
                 valuation={valuation}
                 question={question}
                 truthPageNo={props.truthPageNo}
                 origin={props.origin}
                 model={model}
                 onChange={() => {
                 }}
             /> */}
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="row"
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent="center"
            gap={2}
            sx={{
              p: 2,
              borderStartEndRadius: "20px",
              borderStartStartRadius: "20px",
            }}
          >
            <Autocomplete
              id="free-solo-with-text-demo"
              disableClearable
              onBlur={formik.handleBlur}
              onChange={(event: any, newValue: any) => {
                if (typeof newValue === "string") {
                  setTimeout(() => {
                    const newVar = {
                      containerName: newValue,
                      sorContainerId: 0,
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
                options: container[],
                params: FilterOptionsState<container>
              ) => {
                const filtered = filterSorContainer(options, params);

                if (params.inputValue !== "") {
                  filtered?.push({
                    sorContainerId: 0,
                    containerName: `${params.inputValue}`,
                    newInstance: true,
                  });
                }
                return filtered;
              }}
              options={sorContainers}
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
                  key={option.sorContainerId}
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
            <Autocomplete
              id="free-solo-with-text-demo"
              disableClearable
              onBlur={formik.handleBlur}
              onChange={(event, newValue: any) => {
                if (typeof newValue === "string") {
                  setTimeout(() => {
                    const newVar = {
                      itemName: newValue,
                      sorItemId: 0,
                    };
                    formik.setFieldValue("field", newVar);
                  });
                } else {
                  if (newValue != null) {
                    formik.setFieldValue("field", newValue);
                  }
                }
              }}
              filterOptions={(
                options: SorField[],
                params: FilterOptionsState<SorField>
              ) => {
                const filtered = filterSorField(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    itemId: 0,
                    itemName: `${params.inputValue}`,
                    newInstance: true,
                  });
                }
                return filtered;
              }}
              options={sorItems}
              getOptionLabel={(option: any) => {
                if (typeof option === "string") {
                  return option;
                } else {
                  return option.itemName ? option.itemName : "";
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li
                  key={option.sorItemId}
                  {...props}
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  {option.newInstance
                    ? "click to add new " + option.itemName
                    : option.itemName}
                </li>
              )}
              sx={{ width: "45%" }}
              freeSolo
              renderInput={(params) => (
                <TextField multiline maxRows={4} {...params} label={"Field"} />
              )}
            />

            {formik.values.container.containerName != "" &&
              formik.values.field.itemName != "" && (
                <>
                  <Autocomplete
                    id="free-solo-with-synonym"
                    disableClearable
                    value={formik.values.synonym}
                    onChange={(event, newValue: any) => {
                      if (typeof newValue === "string") {
                        setTimeout(() => {
                          const newVar = {
                            synonym: newValue,
                            questions: [],
                            synonymId: 0,
                          };
                          formik.setFieldValue("synonym", newVar);
                        });
                      } else {
                        if (newValue != null) {
                          formik.setFieldValue("synonym", newValue);
                        }
                      }
                    }}
                    filterOptions={(
                      options: Synonym[],
                      params: FilterOptionsState<Synonym>
                    ) => {
                      const filtered = filterSorSynonym(options, params);
                      if (params.inputValue !== "") {
                        filtered.push({
                          synonymId: 0,
                          synonym: `${params.inputValue}`,
                          questions: [],
                          newInstance: true,
                        });
                      }
                      return filtered;
                    }}
                    options={synonyms}
                    getOptionLabel={(option: any) => {
                      if (typeof option === "string") {
                        return option;
                      } else {
                        return option.synonym ? option.synonym : "";
                      }
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                      <li
                        key={option.synonymId}
                        {...props}
                        style={{
                          wordWrap: "break-word",
                        }}
                      >
                        {option.newInstance
                          ? "click to add new " + option.synonym
                          : option.synonym}
                      </li>
                    )}
                    sx={{ width: "45%" }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        multiline
                        maxRows={4}
                        {...params}
                        label={"Synonym"}
                      />
                    )}
                  />
                  <Autocomplete
                    id="free-solo-with-synonym"
                    autoComplete={false}
                    options={["ARGON", "XENON", "KRYPTON"]}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    // freeSolo
                    // fullWidth
                    sx={{ minWidth: "45%" }}
                    onInputChange={(event, newInputValue) => {
                      formik.setFieldValue("model", newInputValue);
                      // props.func(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField maxRows={4} {...params} label={"Model"} />
                    )}
                  />
                </>
              )}
            {formik.values.model != "" && (
              <>
              {/* <Autocomplete
              id="free-solo-with-text-demo"
              disableClearable
              onBlur={formik.handleBlur}
              onChange={(event: any, newValue: any) => {
                if (typeof newValue === "string") {
                  setTimeout(() => {
                    const newVar = {
                      containerName: newValue,
                      sorContainerId: 0,
                    };
                    formik.setFieldValue("truthEntity", newVar);
                  });
                } else {
                  if (newValue != null) {
                    formik.setFieldValue("truthEntity", newValue);
                  }
                }
              }}
              filterOptions={(
                options:any[],
                params: FilterOptionsState<any>
              ) => {
                const filtered = filterSorContainer(options, params);

                if (params.inputValue !== "") {
                  filtered?.push({
                    sorContainerId: 0,
                    truthEntity: `${params.inputValue}`,
                    newInstance: true,
                  });
                }
                return filtered;
              }}
              options={truthEntityField}
              getOptionLabel={(option: any) => {
                if (typeof option === "string") {
                  return option;
                } else {
                  return option.truthEntity ? option.truthEntity : "";
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li
                  key={option.sorContainerId}
                  {...props}
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  {option.newInstance
                    ? "click to add new " + option.truthEntity
                    : option.truthEntity}
                </li>
              )}
              sx={{ width: "45%" }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  multiline
                  maxRows={4}
                  {...params}
                  label={"truthEntity"}
                  name="truthEntity"
                  onBlur={formik.handleBlur}
                  fullWidth
                />
              )}
            /> */}
                <Autocomplete
                  id="free-solo-with-synonym"
                  disableClearable
                  onChange={(event, newValue: any) => {
                    if (typeof newValue === "string") {
                      setTimeout(() => {
                        const newVar = {
                          question: newValue,
                        };
                        formik.setFieldValue("question", newVar);
                      });
                    } else {
                      if (newValue != null) {
                        formik.setFieldValue("question", newValue);
                      }
                    }
                  }}
                  filterOptions={(
                    options: Question[],
                    params: FilterOptionsState<Question>
                  ) => {
                    const filtered = filterSorQuestion(options, params);
                    if (params.inputValue !== "") {
                      filtered.push({
                        question: `${params.inputValue}`,
                        newInstance: true,
                      });
                    }
                    return filtered;
                  }}
                  options={formik.values.synonym.questions}
                  getOptionLabel={(option: any) => {
                    if (typeof option === "string") {
                      return option;
                    } else {
                      return option.question ? option.question : "";
                    }
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => (
                    <li
                      key={option.question}
                      {...props}
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {option.newInstance
                        ? "click to add new " + option.question
                        : option.question}
                    </li>
                  )}
                  sx={{ width: "93%" }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      multiline
                      maxRows={4}
                      {...params}
                      label={"Question"}
                    />
                  )}
                />
              </>
            )}
          </Stack>
          <ToastContainer />

          <>
            {formik.values.question.question && (
              <Stack
                direction="column"
                justifyContent="flex-start"
                spacing={2}
                sx={{
                  backgroundColor: "white",
                  pl: 4,
                  pr: 4,
                  pb: 3,
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  borderEndEndRadius: "20px",
                  borderEndStartRadius: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "20%", margin: 1, transform: "None" }}
                    disabled={!formik.values.question.newInstance}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      valuationHandler();
                    }}
                    sx={{ width: "20%", margin: 1, transform: "None" }}
                    // disabled={!(props.question && props.truthPageNo && props.origin)}
                  >
                    Find
                  </Button>
                </div>

                {valuationInProgress ? (
                  <Box sx={{ width: "100%", mb: 1, justifyContent: "center" }}>
                    <LinearProgress />
                  </Box>
                ) : (
                  <></>
                )}
                {!valuationInProgress && (
                  <Collapse in={valuation !== undefined} sx={{ width: "100%" }}>
                    <>
                      {valuation ? (
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          Confidence Score:{" "}
                          <Typography>
                            {valuation && valuation[0].precision *
                            100
                              ? (
                                  valuation && valuation[0]
                                    .precision * 100
                                ).toFixed(0) + "%"
                              : "0%"}
                          </Typography>
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                    <TextField
                      label="Answer"
                      inputProps={{ readOnly: true }}
                      sx={{ width: "100%" }}
                      multiline
                      variant="outlined"
                      value={
                        valuation
                          ? valuation[0].predictedValue
                          : "NO"
                      }
                    />
                  </Collapse>
                )}
                {
                  <Collapse
                    in={open}
                    sx={{ width: "100%", mr: 1, mb: 1, ml: 3 }}
                  >
                    <FormContainer open={() => setOpen(false)} />
                  </Collapse>
                }
              </Stack>
            )}
          </>
        </form>
      </Grid>
    </Grid>
  );
}
