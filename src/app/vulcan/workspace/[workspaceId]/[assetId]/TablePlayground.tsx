import {Truth} from "@/service/model/WorkspaceInterface";

import BoundaryImageViewer from "@/service/Bbox/BoundingImageViewer";

import Carousel from "react-material-ui-carousel";

import React, {useState} from "react";

import {useFormik} from "formik";

import {findTableDetection} from "@/service/plugins/PluginService";

import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";

import {Button, CircularProgress, Divider, Grid, IconButton, Paper, TextField} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";

import {ToastContainer} from "react-toastify";

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell, {tableCellClasses} from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

import {styled} from "@mui/material/styles";
import ToastMessage from "@/service/ErrorToast/ToastMessage";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable'


export function TablePlayground(props: { images: Truth[], originId: string, workspaceId: number }) {


    const [pageNo, setPageNo] = useState<number>(1)

    const [valuation, setValuation] = useState<any>();

    const [foundValuationData,setFoundValuationData]=useState<boolean>(false);


    const [inprogress, setInprogress] = useState<boolean>(false);


    const formik = useFormik({

        initialValues: {

            threshold: 90.0,

        },

        onSubmit: async (values) => {

            setInprogress(true);


            let user = getUser();

            findTableDetection(user, props.originId, pageNo, values.threshold)

                .then((response) => {

                    if (response.success) {

                        let tabledata = response.payload
                        
                        setValuation(tabledata);
                        setFoundValuationData(true)
                        setInprogress(false);
                        ToastMessage("Table Detection Result is Found","success");
                    }

                });

        },

    });

    const ExtractTableDataAsPdf=()=>{
        const doc = new jsPDF();
        let header:any[]=[];
        let table=valuation[0].tableData.data;
        valuation.map((table:any)=>{
         header = table.tableData.data[0];
        })
        const tableBody = table.filter((body: any, index: number) => {
            return index !== 0
        })
        autoTable(doc, {
            head: [header],
            body: tableBody,
          })
        doc.save("TableExtractionData.pdf");
    }


    const tableDataDisplay = (table: any, header: any) => {


        const StyledTableCell = styled(TableCell)(({theme}) => ({

            [`&.${tableCellClasses.head}`]: {

                color: "#1C1C1C",

                borderBottom: "5px theme.palette.action.hover",

                width: "15%"


            },

            [`&.${tableCellClasses.body}`]: {

                fontSize: 14,

                border: 0,

                padding: 8,

                width: "15%"

            },

        }));


        const StyledTableRow = styled(TableRow)(({theme}) => ({

            '&:nth-of-type(n):hover': {

                backgroundColor: theme.palette.action.hover,


            },

            "&:nth-of-type(odd,even)": {

                borderCollapse: 'separate',

            },

            '&:last-child td, &:last-child th': {

                border: 0,


            },

        }));

        const StyledTableContainer = styled(TableContainer)({

            border: 'none',

        });

        const tableBody = table?.tableData.data.filter((body: any, index: number) => {
            return index !== 0


        })

        return (<StyledTableContainer sx={{

            width: "94%",

            height: "55vh",

            margin: "1% auto",

            borderRadius: "20px",

            border: "2px solid #DEEDFF",

            background: "#f0f2f5"

        }}>


            <Table sx={{minWidth: 300}} aria-label="customized table">

                <TableHead sx={{borderBottom: "2px solid #DEEDFF",backgroundColor:"#DEEDFF",position:"sticky",top:0}}>

                    <TableRow>

                        {header.map((data: any) =>

                            (<StyledTableCell
                                style={{fontWeight: "bold", textAlign: "center"}}>{data}</StyledTableCell>)
                        )}

                    </TableRow>

                </TableHead>

                <TableBody sx={{borderBottom: "1px solid"}}>

                    {

                        tableBody.map((value: any) => (

                            <TableRow>

                                {value.map((response: any) => {


                                    return <StyledTableCell
                                        style={{fontWeight: "bold", textAlign: "center"}}>{response}</StyledTableCell>

                                })}

                            </TableRow>

                        ))}


                </TableBody>


            </Table>

        </StyledTableContainer>)


    }


    const noDataDisplay = () => {

        return <Paper

            variant="outlined"

            sx={{

                width: "50%",

                height: "50%",

                //padding: "10%",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                margin: "10% auto",

                //marginTop: "50px",

            }}

        >

            Table not found

        </Paper>

    }


    return (<Grid container sx={{justifyContent: "space-between",height: "75vh"}} md={12} sm={12} >
        <Grid md={4.8} sm={12} sx={{width: "100%", height: "75vh"}}>
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

                {props.images[pageNo - 1] &&
                    BoundaryImageViewer(
                        props.images[pageNo - 1].encode,
                        pageNo,
                        valuation)}

            </Carousel>

        </Grid>

        <Grid md={6.9} sm={12} sx={{height: "100%", background: "#ffff", borderRadius: "25px",}}>
            <form  onSubmit={formik.handleSubmit}>
     
        

            {/* <form style={{height:"10%"}} onSubmit={formik.handleSubmit}> */}

                <Grid
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems:"center",
                        padding: "20px",
                    }}
                >
                    <TextField
                        label="Precision"
                        name="threshold"
                        sx={{width: "80%", backgroundColor: "white"}}
                        type="text"
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

                        Find table

                    </Button>

                    <Grid>
                    <IconButton onClick={ExtractTableDataAsPdf}>
                    <FileDownloadIcon color="primary"/>
                    </IconButton>
                    </Grid>

                </Grid>

            </form>
            
            
            <Divider orientation="horizontal"/>
            

            {inprogress ?

<div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress/></div>:

valuation && valuation.length > 0 ? valuation.map((table: any) => {

    var header = table.tableData.data[0]

    return tableDataDisplay(table, header)

})

    : foundValuationData && noDataDisplay()

}

            <ToastContainer/>
            </Grid>
        {/* </Grid> */}

    </Grid>);

}