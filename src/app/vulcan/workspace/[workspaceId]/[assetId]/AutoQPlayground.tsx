import {Button, CircularProgress, Divider, Grid, IconButton, Paper} from "@mui/material";
import {ToastContainer} from "react-toastify";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {StyledTableCell, StyledTableRow} from "@/app/vulcan/table/PaginatedTable";
import {AutoQ, Truth} from "@/service/model/WorkspaceInterface";
import BoundaryImageViewer from "@/service/Bbox/BoundingImageViewer";
import Carousel from "react-material-ui-carousel";
import React,{useEffect} from "react";
import {useFormik} from "formik";
import {findAutoQDetection} from "@/service/plugins/PluginService";
import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ExcelExport from "./ExcelExport";
import { storeDraftData } from "@/service/plugins/PluginService";

export function AutoQPlayground(props: { images: Truth[], originId: string, workspaceId: number }) {

    const [pageNo, setPageNo] = React.useState<number>(1)
    const [valuation, setValuation] = React.useState<any>();
    const [imageEncode, setImageEncode] = React.useState<any>();
    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [foundValuationData,setFoundValuationData]=React.useState<boolean>(false)
    const [dataExport,setDataExport] = React.useState<any>([])
    const [filteredData,setFilteredData] = React.useState<any>([])


    const draftHandler=()=>{
        let user = getUser();
        console.log("filterData",filteredData)
        filteredData.map((draft:any)=>{
            let payload={synonymName:draft.label};
            storeDraftData("meta/synonym/unmapped?tenantId=",user,payload).then((res)=>{
                console.log("draft data",res)
            })
        })
        
    }


    const formik = useFormik({
        initialValues: {
            maxDoctrDiff: 10,
            maxQuestion_Diff: 10,
            maxMultilineQuestionDiff: 10,
            inputFilepath: 10
        },
        onSubmit: async (values) => {
            setInProgress(true);
            let user = getUser();
            let payload: AutoQ = {
                maxDoctrDiff: formik.values.maxDoctrDiff,
                maxQuestionDiff: formik.values.maxQuestion_Diff,
                maxMultilineQuestionDiff: formik.values.maxMultilineQuestionDiff
            }
            findAutoQDetection(user, props.originId, pageNo, payload)
                .then((response) => {
                    if (response.success) {
                        let autoQResponse = response.payload
                        setValuation(autoQResponse.predictions);
                        //setImageEncode(autoQResponse.encode);
                        setInProgress(false)
                        setFoundValuationData(true);
                    }
                });
        },
    });
    const handleChange = (prediction: any) => {
        const index = dataExport.findIndex((item: any) => item.label === prediction.label && item.predictedValue === prediction.predictedValue);
        if (index !== -1) {
          const updatedDataExport = [...dataExport];
          updatedDataExport.splice(index, 1);
          setDataExport(updatedDataExport);
        }
        else{
            setDataExport([...dataExport,prediction])
        }       
      };
      useEffect(() =>{
        var filterdata = []
       for(var i=0;i<dataExport.length;i++){
        filterdata.push({"PredictedValue":dataExport[i].predictedValue,"label":dataExport[i].label})
       }
        setFilteredData(filterdata) 
    },[dataExport])
      
    const valuationHandler = (data: any, index: number) => {
        setImageEncode(data)        
      };
    const autoQResponseLayout = (valuation: any) => {
        return (
            <Grid sx={{height: "50vh", overflow: "scroll"}}>
                <TableContainer component={Paper}
                                sx={{height: "auto", overflowY: "scroll", width: "94%", margin: "2% auto"}}>
                    <Table stickyHeader sx={{minWidth: 500}} aria-label="simple table">
                        {valuation && valuation.length > 0 && <TableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>SOT Label</StyledTableCell>
                                <StyledTableCell>Answer</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>}
                        <TableBody>
                            {
                                valuation && valuation.length > 0 && valuation.map((prediction: any, index: number) => {
                                    return (
                                        <StyledTableRow key={index} sx={{padding: "0 !important"}}>
                                            <StyledTableCell>
                                                <FormControl component="fieldset" variant="standard">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox sx={{
                                                                borderRadius: "50%",
                                                                '&.Mui-checked': {
                                                                  color: '#1976d2',
                                                                },
                                                              }} onChange={() => handleChange(prediction)} name="gilad" />}
                                                            label=""
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </StyledTableCell>
                                           
                                            <StyledTableCell onClick={() => valuationHandler(prediction, index)}>
                                                {prediction.label}
                                            </StyledTableCell>
                                            <StyledTableCell
                                            onClick={() => valuationHandler(prediction, index)}>{prediction.predictedValue}</StyledTableCell>                         
                                        </StyledTableRow>
                                    );
                                })

                            }
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
            No AutoQ data found
        </Paper>
    }


    return (<Grid container sx={{justifyContent: "space-between"}} md={12} sm={12}>
        <Grid md={5.8} sm={12} sx={{width: "100%", height: "71.5vh"}}>
            <Carousel sx={{
                width: "100% !important",
                backgroundColor: "white",
                marginLeft: "20px !important",
                marginTop: "0px !important",
                marginRight: "10px !important",
                borderRadius: "25px",
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
                {props.images[pageNo - 1] &&
                    BoundaryImageViewer(
                        props.images[pageNo - 1].encode,
                        pageNo,
                        valuation)}
            </Carousel>
        </Grid>
        <Grid md={5.9} sm={12} sx={{height: "71.5vh", background: "#ffff", borderRadius: "25px",}}>
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px",
                    }}
                >
                    <Button
                        type="submit" variant="contained" disabled={inProgress}
                        sx={{
                            backgroundColor: "#FFA500",
                            borderRadius: "25px",
                            color: "black",
                            height: "45px",
                            textTransform: "None",
                            width: "20%",
                            margin: "auto"
                        }}
                    >
                        Analyse
                    </Button>
                    <Button
                        type="submit" variant="contained" disabled={inProgress}
                        sx={{
                            backgroundColor: "#FFA500",
                            borderRadius: "25px",
                            color: "black",
                            height: "45px",
                            textTransform: "None",
                            width: "20%",
                            margin: "auto"
                        }}
                        onClick={draftHandler}
                    >
                        Draft
                    </Button>
                        <ExcelExport excelData={filteredData} fileName={"Excel Export"}/>
                </Grid>
            </form>
            <Divider orientation="horizontal"/>
            {
                inProgress ? <div style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <CircularProgress/>
                </div> : valuation && valuation.length > 0 ? autoQResponseLayout(valuation) : foundValuationData && NoDataDisplay()
            }
            <ToastContainer/>
        </Grid>
    </Grid>);
}