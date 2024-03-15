'use client'
import React, {useEffect, useState} from "react";
import {Valuation} from "../model/Bbox";
import {
    Button,
    Divider,
    Grid,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TextField,
    Typography
} from "@mui/material";
import LinearProgressBar from "../progressBar/LinearProgressBar";
import {StyledTableCell, StyledTableRow} from "../table/TableStyle";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {findCheckbox} from "./PluginService";
import {CurrentUser} from "@/service/ServerDetail";
import {CheckboxDataTypes} from "../model/Plugins";

const CheckboxDetection = (props: { truthPageNo: number; origin: string; func: (data: Valuation) => void }) => {
    const [thresholdData, setThresholdData] = useState<number>(0);
    const [thresholdError, setThresholdError] = useState<string>();
    const [valuationInProgress, setValuationInProgress] = useState<boolean>(false);
    const [onClickIndex, setOnClickIndex] = React.useState<number>();
    const [submitOnClick, setSubmitOnClick] = useState(false);
    const [dataChange, setDataChange] = useState(false)
    const thresholdHandler = (e: any) => {
        setThresholdData(e.target.value / 100);
    };
    let item = localStorage.getItem("user");
    const user: CurrentUser = JSON.parse(item != null ? item : "{}");
    const [checkboxDetectionData, setcheckboxDetectionData] =
        React.useState<CheckboxDataTypes[]>();
    useEffect(() => {
        setThresholdError("")
        if (!thresholdData) {
            setThresholdError("Please enter numeric values")
        }
        if (thresholdData === 0) {
            setThresholdError("")
        }
    }, [thresholdData])

    function submitHandler() {
        setValuationInProgress(true);
        setDataChange(false);
        setSubmitOnClick(true);
        findCheckbox(props.origin, props.truthPageNo, user, thresholdData).then(value => {
            setcheckboxDetectionData(value)
        })

    }

    const valuationHandler = (data: any, key: number) => {
        props.func(data);
        setOnClickIndex(key);
    };
    useEffect(() => {
        if (submitOnClick) {
            setDataChange(true)
        }
    }, [props.truthPageNo, props.origin])
    return (
        <Grid>
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                }}
            ><Grid>
                <TextField
                    label="cut-off"
                    type="text"
                    sx={{width: "80%", backgroundColor: "white"}}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                    }}
                    onChange={(data) => thresholdHandler(data)}
                />
                <div style={{height: "20px"}}>
                    {thresholdError ? <Typography sx={{m: 1, color: "red"}}>{thresholdError}</Typography> : <></>}</div>
            </Grid>
                <Button
                    variant="contained"
                    sx={{width: "20%", margin: 1, transform: "None", height: "50px"}}
                    onClick={submitHandler}
                    disabled={!thresholdData}
                >
                    Extract
                </Button>
            </Grid>
            {valuationInProgress ? (
                <LinearProgressBar/>
            ) : (
                <></>
            )}

            {!valuationInProgress &&
                !dataChange &&
                thresholdData !== undefined &&
                checkboxDetectionData && (
                    <>
                        <Divider orientation='horizontal'/>
                        {checkboxDetectionData.length != 0 && (
                            <>
                                <Divider orientation="horizontal"/>
                                {/* <h3 style={{ paddingLeft: "5%" }}>Detected Result</h3> */}
                            </>
                        )}
                        <Grid
                            columnGap={5}
                            rowGap={2}
                            sx={{
                                overflowX: "hidden",
                                height: "55vh",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                                pl: 3,
                                pr: 3,
                                pt: 3
                            }}
                        >
                            {checkboxDetectionData.length != 0 ?
                                (
                                    <TableContainer component={Paper}>
                                        <Table sx={{minWidth: 500}} aria-label="simple table">
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Predicted Value</StyledTableCell>
                                                    <StyledTableCell align="center">Confidence score</StyledTableCell>
                                                    <StyledTableCell align="center">state</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {checkboxDetectionData.map((prediction, key) => {
                                                        const index = key;
                                                        return (
                                                            <StyledTableRow
                                                                sx={{
                                                                    '&:last-child td, &:last-child th': {border: 0},
                                                                    backgroundColor:
                                                                        onClickIndex === index ? "whitesmoke" : "white",
                                                                    cursor: "pointer"
                                                                }}
                                                                onClick={() => {
                                                                    valuationHandler(prediction, index);
                                                                }}
                                                            >
                                                                <StyledTableCell component="th" scope="row">
                                                                    {prediction.predictedValue}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    {`${Math.round(prediction.precision * 100)}%`}</StyledTableCell>
                                                                <StyledTableCell
                                                                    align="center">{prediction.state}</StyledTableCell>
                                                            </StyledTableRow>

                                                        )
                                                    }
                                                )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )

                                : (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            width: "50%",
                                            height: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: "auto",
                                        }}
                                    >
                                        No Checkbox data found
                                    </Paper>
                                )}
                        </Grid>
                    </>
                )}
            <ToastContainer/>
        </Grid>
    );
};

export default CheckboxDetection;