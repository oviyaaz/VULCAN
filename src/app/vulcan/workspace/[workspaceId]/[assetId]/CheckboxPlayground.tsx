import {Button, CircularProgress, Divider, Grid, IconButton, Paper, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {ToastContainer} from "react-toastify";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {StyledTableCell, StyledTableRow} from "@/app/vulcan/table/PaginatedTable";
import {Truth} from "@/service/model/WorkspaceInterface";
import Carousel from "react-material-ui-carousel";
import React, {useState} from "react";
import {useFormik} from "formik";
import {findCheckBoxDetection} from "@/service/plugins/PluginService";
import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";
import ToastMessage from "@/service/ErrorToast/ToastMessage";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable'
import {BoundingBox} from "@/service/Bbox/BoundingBox";

export function CheckboxPlayground(props: { images: Truth[], originId: string, workspaceId: number }) {

    const [pageNo, setPageNo] = useState<number>(1)
    const [valuation, setValuation] = useState<any>();
    const [inprogress, setInprogress] = useState<boolean>(false);
    const [foundValuationData, setFoundValuationData] = useState<boolean>(false)
    const [imageEncode, setImageEncode] = useState<any>(false)

    const formik = useFormik({
        initialValues: {
            threshold: 90.0,
        },
        onSubmit: async (values) => {
            setInprogress(true);
            let user = getUser();
            findCheckBoxDetection(user, props.originId, pageNo, values.threshold)
                .then((response) => {
                    if (response.success) {
                        let tabledata = response.payload
                        setValuation(tabledata);
                        setFoundValuationData(true);
                        setInprogress(false);
                        ToastMessage("Checkbox Detection result Found", "success")
                    }
                });
        },
    });

    const valuationHandler = (data: any, key: number) => {
        setImageEncode(data)
    };


    const ExtractCheckBoxDataAsPdf = () => {
        const doc = new jsPDF();
        let tblBody: any | [] = [];
        for (let i = 0; i < valuation.length; i++) {
            const predictedValue: string = valuation[i].predictedValue;
            const precision: string = `${Math.round(valuation[i].precision * 100)}%`;
            const state: string = valuation[i].state;
            tblBody.push([predictedValue, precision, state]);
        }
        autoTable(doc, {
            head: [["Predicted Value", "Confidence Score", "State"]],
            body: tblBody,
        })
        doc.save("CheckBoxData.pdf");
    }

    const tableDataDisplay = (valuation: any) => {
        return (
            <Grid sx={{height: "50vh", overflow: "scroll"}}>
                <TableContainer component={Paper}
                                sx={{height: "auto", overflowY: "scroll", width: "94%", margin: "2% auto"}}>
                    <Table sx={{minWidth: 500}} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Predicted Value</StyledTableCell>
                                <StyledTableCell align="center">Confidence score</StyledTableCell>
                                <StyledTableCell align="center">State</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                valuation && valuation.map((prediction: any, index: number) => {
                                    return (<><StyledTableRow onClick={() => {
                                        valuationHandler(prediction, index)
                                    }}>
                                        <StyledTableCell component="th" scope="row">
                                            {prediction.predictedValue}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {`${Math.round(prediction.precision * 100)}%`}</StyledTableCell>
                                        <StyledTableCell align="center">{prediction.state}</StyledTableCell>
                                    </StyledTableRow></>)
                                })}


                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        )
    }

    const NoDataDisplay = () => {
        return <Paper
            variant="outlined"
            sx={{
                width: "50%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10% auto",
            }}
        >
            No Checkbox data found
        </Paper>
    }


    return (
    <Grid container sx={{justifyContent: "space-between", height: "75vh"}} md={12} sm={12}>
        <Grid md={5.8} sm={12} sx={{width: "100%", height: "75vh%"}}>
            <Carousel sx={{
                width: "100% !important",
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
                              setPageNo(number)
                          }
                      }}
                      prev={() => {
                          let number = pageNo - 1;
                          if (0 < number) {
                              setPageNo(number)
                          }
                      }}
            >
                {(props.images[pageNo - 1] || imageEncode) && (
                    <BoundingBox
                        imageEncode={props.images[pageNo - 1].encode}
                        // imageResolution={resolutionHandler}
                        box={{
                            label: "",
                            xmin: valuation !== undefined ? valuation.leftPos : 0,
                            xmax:
                                valuation !== undefined ? valuation.rightPos : 0,
                            ymin:
                                valuation !== undefined ? valuation.lowerPos : 0,
                            ymax:
                                valuation !== undefined ? valuation.upperPos : 0,
                        }}
                    />

                )}
            </Carousel>
        </Grid>
        <Grid md={5.9} sm={12} sx={{height: "100%", background: "#ffff", borderRadius: "25px",}}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                    }}
                >
                    <TextField
                        label="cut-off"
                        sx={{width: "80%", backgroundColor: "white"}}
                        type="text"
                        name="threshold"
                        onChange={formik.handleChange}
                        value={formik.values.threshold}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />

                    <Button
                        type="submit" variant="contained"
                        sx={{width: "20%", margin: "2px 8px", transform: "None", height: "50px"}}
                    >
                        Extract
                    </Button>
                    <Grid>
                        <IconButton onClick={ExtractCheckBoxDataAsPdf}>
                            <FileDownloadIcon color="primary"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </form>
            <Divider orientation="horizontal"/>
            {inprogress ?
                <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress/></div> :

                valuation && valuation.length > 1 ? tableDataDisplay(valuation) : foundValuationData && NoDataDisplay()}

            <ToastContainer/>
        </Grid>
    </Grid>);
}