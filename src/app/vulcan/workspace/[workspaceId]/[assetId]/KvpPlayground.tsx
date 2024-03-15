import {question, Truth} from "@/service/model/WorkspaceInterface";
import BoundaryImageViewer from "@/service/Bbox/BoundingImageViewer";
import Carousel from "react-material-ui-carousel";
import React,{useEffect} from "react";
import {Valuation} from "@/service/model/Bbox";
import {useFormik} from "formik";
import {doKvpApicall, storeDraftData} from "@/service/plugins/PluginService";
import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";
import {Button, CircularProgress, Fab, Grid, IconButton, TextField, Typography,Paper} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExcelExport from "./ExcelExport";
import { CurrentUser } from "@/service/ServerDetail";

export function KvpPlayground(props: {
    images: Truth[];
    originId: string;
    workspaceId: number;
}) {
    const [pageNo, setPageNo] = React.useState<number>(1);
    const [valuation, setValuation] = React.useState<Valuation>();
    const [filteredData,setFilteredData] = React.useState<any>([])
    const [dataExport,setDataExport] = React.useState<any>([])
    const [convHistory, setConvHistory] = React.useState<
        {
            question: string;
            model: string;
            response: Valuation;
        }[]
    >([]);
    const [inprogress, setInprogress] = React.useState<boolean>(false);

    const draftHandler=()=>{
        let user = getUser();
        filteredData.map((draft:any)=>{
            let payload={question:draft[0]};
            storeDraftData("meta/question/unmapped?tenantId=",user,payload).then((res)=>{
                console.log("draft data",res)
            })
        })
        
    }

    const formik = useFormik({
        initialValues: {
            question: "",
            model: "ARGON",
        },
        onSubmit: async (values) => {
            setInprogress(true);
            let payload: question = {
                question: values.question,
            };
            let user = getUser();
            doKvpApicall(props.originId, pageNo, user, values.model, payload).then(
                (response) => {
                    let valuations: Valuation[] = response.payload;
                    if (valuations && valuations.length > 0) {
                        const valuationNew = valuations[0];
                        setConvHistory([
                            ...convHistory,
                            {
                                question: values.question,
                                response: valuationNew,
                                model: values.model,
                            },
                        ]);
                        setValuation(valuationNew);
                        formik.setFieldValue("question", "");
                        setInprogress(false);
                    }
                }
            );
        },
    });
    const handleChange = (convHistory:any) => {
        const index = dataExport.findIndex((item: any) => item.question === convHistory.question && item.response.predictedValue === convHistory.response.predictedValue);
        if (index !== -1) {
          const updatedDataExport = [...dataExport];
          updatedDataExport.splice(index, 1);
          setDataExport(updatedDataExport);
        }
        else{
            setDataExport([...dataExport,convHistory])
        }    
    
        
      };
      useEffect(() =>{
        let tblBody:any|[]=[];
        for (let i = 0; i < dataExport.length; i++) {
           const question: string = dataExport[i].question;
            const response: string = dataExport[i].response.predictedValue;
            const model: string = dataExport[i].model;
            tblBody.push([question, response, model]);
        }
        setFilteredData(tblBody)
    },[dataExport])
    return (
        <Grid container md={12} sm={12} sx={{height: "75vh"}}>
            <Grid md={7} sm={12} sx={{height: "75vh", width: '100%'}}>
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
            <Grid
                sm={12}
                md={5}
                sx={{
                    width: "100% !important",
                    backgroundColor: "white",
                    borderRadius: "25px",
                    height: "100%",
                }}
            >
                <Grid sx={{height: "85%",position:"relative",overflowY:"scroll"}}>
                    
                    <Grid  container sx={{justifyContent:"flex-end",borderRadius: "25px",position:"sticky",top:0,backgroundColor:"white",zIndex:11}}>
                    <Button
                        type="submit" variant="contained"
                        sx={{
                            backgroundColor: "#FFA500",
                            borderRadius: "25px",
                            color: "black",
                            height: "31px",
                            textTransform: "None",
                            width: "17%",
                            marginTop:"1%"
                        }}
                        onClick={draftHandler}
                    >
                        Draft
                    </Button>
                    <ExcelExport excelData={filteredData} fileName={"Excel Export"}/>
                    </Grid>
                    {convHistory.length > 0 && (
                        <Grid
                            sx={{
                                padding: "10px 10px 10px 10px",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            {convHistory.map((conv: any) => (
                                <Grid position={"relative"} sm={12} md={12}>
                                    {/* <Grid
                                        xs={6}
                                        sm={6}
                                        md={7}
                                        container
                                        sx={{
                                            justifyContent: "flex-end",
                                        }}
                                    > */}
                                        
                                    {/* </Grid> */}
                                    
                                    
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={12}
                                        container
                                        flexDirection={"column"}
                                    >
                                        
                                         <FormControl sx={{width:"100%"}}>
                                                    <FormGroup sx={{width:"100% !important"}}>
                                                
                                                        <FormControlLabel
                                                        sx={{width:"100%"}}
                                                            control={<Checkbox sx={{
                                                                borderRadius: "50%",
                                                                '&.Mui-checked': {
                                                                  color: '#1976d2',
                                                                  width:"auto"
                                                                },
                                                              }} onChange={() => handleChange(conv)} name="gilad" />}
                                                            label={
                                                                <>
                                                                   <Grid sx={{marginBottom:"10px",backgroundColor:"white",width:"100% !important"}}>
                                    <Paper  sx={{backgroundColor:"#cccccc",minHeight:"4vh",color:"black",padding:"10px",borderRadius: "15px 15px 15px 0px"}}>
                                        <Grid container sx={{fontSize:"8px",fontWeight:"bold",justifyContent:"flex-end"}}>
                                            Model: {conv.model}
                                        </Grid>
                                        <Grid sx={{padding:"5px 5px 5px 0"}}>
                                            {conv.question}
                                            </Grid>
                                            </Paper>
                                        </Grid>
                                                                </>
                                                            }
                                                        />
                                               

                                                    </FormGroup>
                                                </FormControl>
                                     
                                    </Grid>

                                    <Grid sm={12} md={12} container justifyContent={"flex-end"}>
                                        <Grid xs={6} sm={6} md={6}></Grid>
                                        {/* <Grid
                                            xs={5}
                                            sm={5}
                                            md={4}
                                            container
                                            flexDirection={"column"}
                                            justifyContent="flex-end"
                                            sx={{
                                                backgroundColor: "#DEEDFF",
                                                borderRadius: "20px 20px 20px 0px",
                                            }}
                                        > */}
                    <Grid  md={6} >
                                    <Paper  sx={{backgroundColor:"#377ded",minHeight:"4vh",color:"white",padding:"10px",borderRadius: "15px 15px 0px 15px",}}>
                                        {/* <Grid sx={{fontSize:"8px"}}>
                                        {conv.model}
                                        </Grid> */}
                                        {conv?.response?.precision && (<Grid container sx={{fontSize:"8px",fontWeight:"bold",justifyContent:"flex-end"}}>
                                        Confidence score: {conv?.response?.precision*100}
                                        </Grid>)}
                                        <Grid sx={{padding:"5px 5px 5px 0"}}>
                                             {conv.response.predictedValue}
                                            </Grid>
                                            </Paper>
                                        </Grid>
    
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <Grid md={12} sm={12}>
                    {inprogress ? (
                                <Grid sx={{position: "absolute", top: "50%", left: "50%"}}>
                                    <CircularProgress />
                                </Grid>
                            ) : null}
                            </Grid>
                </Grid>
                <Grid sx={{height: "15%", width: "100%"}}>
                    <form style={{height: "100%"}} onSubmit={formik.handleSubmit}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={12}
                            container
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center !important",
                                marginLeft: " 10px",
                                marginRight: "10px",
                                width: "100%",
                                paddingRight: "10px",
                            }}
                        >
                            <Grid item md={7} sm={7} xs={5} sx={{paddingRight: "5px"}}>
                                <TextField
                                    fullWidth
                                    label="Query"
                                    variant="outlined"
                                    multiline
                                    // size="small"
                                    name="question"
                                    onChange={formik.handleChange}
                                    value={formik.values.question}
                                />
                            </Grid>
                            <Grid item md={4} sm={4} xs={5} sx={{paddingRight: "5px"}}>
                                <Autocomplete
                                    fullWidth
                                    id="free-solo-with-synonym"
                                    autoComplete={false}
                                    defaultValue={"ARGON"}
                                    options={["ARGON", "XENON", "KRYPTON"]}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    onInputChange={(event, newInputValue) => {
                                        formik.setFieldValue("model", newInputValue);
                                        // props.func(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField maxRows={4} {...params} label="Model"/>
                                    )}
                                />
                            </Grid>
                            <Grid md={1} sm={1} xs={2} sx={{paddingRight: "3px"}}>
                                <Fab
                                    type="submit"
                                    size="small"
                                    sx={{
                                        transform: "None",
                                    }}
                                    color="primary"
                                    aria-label="add"
                                >
                                    <SendIcon sx={{color: "white"}}/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}
