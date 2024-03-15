import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Collapse,
    Divider,
    Fade,
    FormControl,
    TextField,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
// import "../../styles/Home.css";
import { Valuation, PaperInfo } from "@/service/model/Simulator";
import TransactionValuationRow from "./TransactionValuationRow";
import TransactionStepper from "./TransactionStepper";
import { TransactionAudit } from "@/service/model/Simulator";
import TransactionPaperLayout from "./TransactionPaperLayout";
import { getAudit, getValuation } from "@/service/simulator/SimulatorService";
import { CurrentUser } from "@/service/ServerDetail";
import { getUser } from "../workspace/WorkspaceListLayout";

export default function TransactionAssetDetail(props: {
    originId?: number;
    loader?: boolean;
}) {
    console.log("PROPS", props)
    const [valuations, setValuations] = useState<Valuation[]>([]);
    const [papers, setPapers] = useState<PaperInfo[]>([]);
    const [containers, setContainers] = useState<string[]>([]);
    const dataFetchedRef = React.useRef(false);
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState<CurrentUser>();
    useEffect(() => {
        const user = getUser();
        setUser(user);
        // handleWorkspaceList(user);
    }, []);
    const [transactionAudits, setTransactionAudits] = useState<
        TransactionAudit[]
    >([]);

    const [filterInput, setFilterInput] = useState<
        string | undefined | number | readonly string[]
    >("");
    const [activeStep, setActiveStep] = React.useState(0);
    const [kie, setKie] = useState<Valuation[]>([]);
    const theme = useTheme();
    const maxSteps = valuations.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const transactionHandler = () => {
        if (user && props.originId) {
            getValuation(user, props.originId)
                .then((v) => {
                    if (v) {
                        console.log("valuationnnn", v.valuations);
                        setValuations(v.valuations);
                        setPapers(v.papers);
                        setContainers(v.containers);
                    }
                });
            getAudit(user, props.originId)
                .then((v) => {
                    setTransactionAudits(v);
                });
            setIsDataFetched(true)
        }
    }
    useEffect(() => {
        if (isDataFetched) {
            transactionHandler();
        }
    }, [props.originId]);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        if (props.originId) {
            transactionHandler();
        }
    }, [])

    // const kvpFilterHandler = () => {
    //     let kvpFilterData = valuations.filter((kvpdata: any) => {
    //         if (kvpdata.container === filterInput) {
    //             return kvpdata;
    //         }
    //     });

    //     setKie(kvpFilterData);
    // };

    useEffect(() => {
        if (filterInput) {
            let kvpFilterData = valuations.filter(function (kvpdata: any) {
                if (kvpdata.container === filterInput) {
                    return kvpdata;
                }
            });
            setKie(kvpFilterData);
        }
    }, [filterInput, valuations]);

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        >
            {valuations.length > 0 && papers.length > 0 ? (
                <>
                    <TransactionStepper transactionAudits={transactionAudits} />
                    <Box width={"100%"} display={"flex"} flexDirection={"row"}>
                        <Box sx={{ width: "70%" }}>
                            {valuations[activeStep] ? (
                                <TransactionPaperLayout
                                    papers={papers}
                                    bbox={{
                                        label: valuations[activeStep].precision + "",
                                        xmin: valuations[activeStep].leftPos,
                                        xmax: valuations[activeStep].rightPos,
                                        ymin: valuations[activeStep].lowerPos,
                                        ymax: valuations[activeStep].upperPos,
                                    }}
                                    pageNo={valuations[activeStep].pageNo}
                                />
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Box sx={{ p: 1, width: "30%" }}>
                            {/* <Box
                sx={{
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                  m: 1,
                }}
                display={"flex"}
                flexDirection={"row"}
              >
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Autocomplete
                    freeSolo
                    disableClearable
                    autoHighlight
                    id="free-solo-2-demo"
                    onChange={(event: any, newValue: string | null) => {}}
                    options={containers}
                    renderInput={(params) => {
                      setFilterInput(params.inputProps.value);
                      return (
                        <TextField
                          {...params}
                          label="Container"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      );
                    }}
                  />
                </FormControl>
              </Box>
              <Divider /> */}
                            <Box
                                flex={"column"}
                                display={"flex"}
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    backgroundColor: "white",
                                }}
                            >
                                <Box
                                    sx={{
                                        justifyContent: "end",
                                        alignItems: "center",
                                        width: "100%",
                                        backgroundColor: "white",
                                        m: 1,
                                    }}
                                >
                                    <Box
                                        sx={{ width: "100%", p: 1 }}
                                        display={"flex"}
                                        justifyContent={"center"}
                                    >
                                        {valuations[activeStep] !== undefined ? (
                                            kie && (
                                                <TransactionValuationRow
                                                    row={valuations[activeStep]}
                                                ></TransactionValuationRow>
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                    {/* <img
                    width={24}
                    height={24}
                    style={{ display: "flex", alignItems: "center" }}
                    src={"/helpIcon.png"}
                    alt="helpIcon"
                    onClick={() => setOpen(!open)}
                  />
                  {
                    <Collapse
                      in={open}
                      sx={{ width: "100%", mr: 1, mb: 1, ml: 1 }}
                    >
                      <FormContainer open={(open: any) => setOpen(false)} />
                    </Collapse>
                  } */}
                                    <div className={styles.buttons__div}>
                                        {
                                            <Button
                                                size="small"
                                                onClick={handleBack}
                                                disabled={activeStep === 0}
                                            >
                                                {theme.direction === "rtl" ? (
                                                    <KeyboardArrowRight />
                                                ) : (
                                                    <KeyboardArrowLeft />
                                                )}
                                                Back
                                            </Button>
                                        }
                                        {
                                            <Button
                                                size="small"
                                                onClick={handleNext}
                                                disabled={activeStep === maxSteps - 1}
                                            >
                                                Next
                                                {theme.direction === "rtl" ? (
                                                    <KeyboardArrowLeft />
                                                ) : (
                                                    <KeyboardArrowRight />
                                                )}
                                            </Button>
                                        }
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                        <ToastContainer />
                    </Box>
                </>
            ) : (
                <div className={styles.progress__bar}>
                    <Fade in={props.loader} unmountOnExit>
                        <CircularProgress />
                    </Fade>
                </div>
            )}
            <ToastContainer />
        </Box>
    );
}
