'use client'

import React, {useEffect} from "react";
import {CurrentUser} from "../ServerDetail";
import {Button, Divider, Paper, TextField, Typography} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {styled} from "@mui/material/styles";
import LinearProgressBar from "../progressBar/LinearProgressBar";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {findTableDetection} from "./PluginService";

const TableExtraction = (props: { truthPageNo: number, originId: string }) => {

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#DEEDFF",
            color: theme.palette.common.black,
            position: "sticky",
            top: "0",
        },

        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        "&:nth-of-type(odd)": {
            // backgroundColor: theme.palette.action.hover,
        },

        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const [thresholdData, setThresholdData] = React.useState<number>(0);
    const [thresholdError, setThresholdError] = React.useState<string>();
    const [response, setResponse] = React.useState<any>();
    const [submitOnClick, setSubmitOnClick] = React.useState(false);
    const [dataChange, setDataChange] = React.useState(false);


    const [tableTraverseIndex, setTableTraverseIndex] = React.useState<number>(1);
    let [verticalTable, setVerticalTable] = React.useState<any[]>([]);

    let item = localStorage.getItem("user");
    const user: CurrentUser = JSON.parse(item != null ? item : "{}");


    const thresholdHandler = (e: any) => {
        setThresholdData(e.target.value / 100);
    };

    let TableHeader;
    let TableContent;
    let WholeData;
    // let tableDatas: any[] = [];

    const [currentpage, setCurrentPage] = React.useState<any | undefined>([]);
    const [next, setNext] = React.useState();
    const [back, setBack] = React.useState();

    const DataHandler = () => {
        verticalTable = [];
        let table = response?.map((tableData: any) => {
            return tableData?.tableData;
        });

        if (table.length != 0) {
            let firstTable = table[0]?.data;
            let column = firstTable[0];
            TableHeader = column;
            let row = firstTable[tableTraverseIndex];
            TableContent = row;
            WholeData = firstTable;
            for (let i = 0; i < column.length; i++) {
                verticalTable.push([column[i], row[i]]);
                setVerticalTable(verticalTable);
            }
        }
    };
    const SubmitHandler = () => {
        setValuationInProgress(true);
        setDataChange(false);
        // props.originHandler(true);
        setResponse(undefined);
        setSubmitOnClick(true);
        let payload = {
            threshold: thresholdData,
        }
        findTableDetection(user, props.originId, props.truthPageNo, thresholdData).then(value => {
            if (value.success) {
                let tabledata = value.payload
                setResponse(tabledata);
            }
        })
        // ApiService.handlePost(
        //   url.SERVER_URL +
        //     `studio/plugin/detection/table/${originId}/${pageNo}?tenantId=` +
        //     ApiService.getTenantId(),
        //   {                 

        //     threshold: thresholdData,
        //   }
        // )
        //   .then((res) => {
        //     setResponse(res);
        //     // DataHandler();
        //     toast.success("Table Extraction Result Found", {
        //       position: "bottom-left",
        //       autoClose: 3000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //     });
        //   })
        //   .finally(() => {
        //     props.originHandler(false);
        //     setValuationInProgress(false);
        //   });
    };

    React.useEffect(() => {
        if (submitOnClick) {
            setDataChange(true);
        }
    }, [props.originId, props.truthPageNo]);
    let table = response?.map((tableData: any) => {
        return tableData?.tableData;
    });

    const tableheader: any = response ? table[0]?.data[0] : "";

    const tableBody = response
        ? table[0]?.data.filter((body: any, index: number) => {
            if (index !== 0) {
                return body;
            }
        })
        : "";

    const handleNext = () => {
        setTableTraverseIndex((prevActiveStep: any) => prevActiveStep + 1);
        setVerticalTable([]);
        // DataHandler();
        //setTableTraverseIndex(value)
        // setCurrentPage((prevActiveStep:any) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setTableTraverseIndex((prevActiveStep: any) => prevActiveStep - 1);
        setVerticalTable([]);
        // DataHandler();
        //setTableTraverseIndex(value)
        // setCurrentPage((prevActiveStep:any) => prevActiveStep - 1);
    };
    useEffect(() => {
        if (submitOnClick) DataHandler();
    }, [tableTraverseIndex, response]);
    const [value, setValue] = React.useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };
    const [valuationInProgress, setValuationInProgress] =
        React.useState<boolean>(false);
    useEffect(() => {
        setThresholdError("");
        if (!thresholdData) {
            setThresholdError("Please enter numeric values");
        }
        if (thresholdData === 0) {
            setThresholdError("");
        }
    }, [thresholdData]);
    return (
        <Grid>
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                }}
            >
                <Grid>
                    <TextField
                        label="cut-off"
                        sx={{width: "80%", backgroundColor: "white"}}
                        type="text"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        onChange={(data) => thresholdHandler(data)}
                    />
                    <div style={{height: "20px"}}>
                        {thresholdError ? (
                            <Typography sx={{m: 1, color: "red"}}>
                                {thresholdError}
                            </Typography>
                        ) : (
                            <></>
                        )}
                    </div>
                </Grid>
                <Button
                    variant="contained"
                    sx={{width: "20%", margin: 1, transform: "None", height: "50px"}}
                    onClick={SubmitHandler}
                    disabled={!thresholdData}
                >
                    Extract
                </Button>
            </Grid>
            {valuationInProgress ? <LinearProgressBar/> : <></>}
            {response && !dataChange && (
                <>
                    <Divider orientation="horizontal"/>
                    {response.length !== 0 && (
                        <Typography style={{fontWeight: "bold", padding: "3% 0 3% 5%"}}>
                            Detected Result
                        </Typography>
                    )}
                    {response.length !== 0 && (
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab label="Image" value="1"/>
                                    <Tab label="Table" value="2"/>
                                </TabList>
                            </Box>
                            {response.length > 0 && (
                                <TabPanel value="1">
                                    <Paper variant="outlined">
                                        <div className="bBox__parent__grid">
                                            <TableContainer
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "30px 30px 20px 20px",
                                                }}
                                            >
                                                <Table aria-label="simple table">
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            {tableheader &&
                                                                tableheader?.map((row: any) => (
                                                                    <StyledTableCell>
                                                                        <StyledTableRow>{row}</StyledTableRow>
                                                                    </StyledTableCell>
                                                                ))}
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tableBody &&
                                                            tableBody?.map((bodydata: any) => (
                                                                <StyledTableRow>
                                                                    {bodydata.map((value: any) => (
                                                                        <StyledTableCell>
                                                                            {value ?? "null"}{" "}
                                                                        </StyledTableCell>
                                                                    ))}
                                                                </StyledTableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </Paper>
                                </TabPanel>
                            )}
                            {response.length > 0 && (
                                <TabPanel value="2">
                                    <div className="bBox__parent__grid">
                                        <>
                                            <TableContainer
                                                className="table__Container__Fix"
                                                component={Paper}
                                            >
                                                <Table
                                                    sx={{minWidth: 500, overflow: "scroll"}}
                                                    aria-label="simple table"
                                                >
                                                    <TableHead>
                                                        <StyledTableRow className="table__Row">
                                                            <StyledTableCell align="center">
                                                                {"Column"}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {"Row " + tableTraverseIndex}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {verticalTable.length !== 0 &&
                                                            verticalTable.map((value: any, index: number) => (
                                                                <StyledTableRow key={index}>
                                                                    {value.map((cell: any, cellIndex: number) => (
                                                                        <StyledTableCell
                                                                            align="center"
                                                                            key={cellIndex}
                                                                        >
                                                                            {cell ?? "null"}
                                                                        </StyledTableCell>
                                                                    ))}
                                                                </StyledTableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <div className="table__Button">
                                                <Button
                                                    variant="contained"
                                                    onClick={handleBack}
                                                    disabled={tableTraverseIndex === 1}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    disabled={
                                                        tableTraverseIndex + 1 ===
                                                        response[0].tableData.data.length
                                                    }
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </>
                                    </div>
                                </TabPanel>
                            )}
                        </TabContext>
                    )}
                    {response.length === 0 && (
                        <Paper
                            variant="outlined"
                            sx={{
                                width: "50%",
                                height: "50%",
                                padding: "10%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "auto",
                                marginTop: "50px",
                            }}
                        >
                            Table not found
                        </Paper>
                    )}
                </>
            )}

            <ToastContainer/>
        </Grid>
    );
};

export default TableExtraction;