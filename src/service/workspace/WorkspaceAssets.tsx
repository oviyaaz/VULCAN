'use client'
import React from 'react';
import {DropzoneOptions, DropzoneState, useDropzone} from "react-dropzone";
import {CircularProgress, Grid, Paper, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {green} from "@mui/material/colors";
import styles from '@/app/page.module.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

export function WorkspaceAssets(props: {

    onUploadSuccess: (dropzoneState: DropzoneState) => void;

}) {
    const options: DropzoneOptions = {
        accept: {"image/*": [], "application/pdf": []},
    };
    const dropzoneState: DropzoneState = useDropzone();
    const [loading, setLoading] = React.useState(false);
    const [uploadPopUp, setUploadPopUp] = React.useState<boolean>(false);

    function handleUploadPopupClose() {
        dropzoneState?.acceptedFiles?.splice(
            0,
            dropzoneState?.acceptedFiles?.length
        );
        setUploadPopUp(false);
    }

    return (
        <Stack
            sx={{Width: "100%", padding: "20px", height: "40vh"}}
            direction="column"
            spacing={2}
        >
            <Box
                {...dropzoneState.getRootProps({className: "dropzone"})}
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    //padding: "20px",
                    borderWidth: 2,
                    borderRadius: 2,
                    border: "2px solid #DEEDFF",
                    borderStyle: "dashed",
                    backgroundColor: "white",
                    color: "#bdbdbd",
                    outline: "none",
                    //margin: "2% 5%",
                    transition: "border .24s ease-in-out",
                    width: "40% !important",
                    margin: " 10% auto 1%",
                    cursor: "pointer",
                    justifyContent: "center",
                }}
            >
                
                <Grid container sx={{flexDirection: "column", alignItems: "center",padding:"20px"}}>
                    <Grid container sx={{justifyContent: "center"}}>
                    <img
                    src={"/adobePdf.png"}
                    alt="File Type"
                    style={{width: "20%", height: "90%"}} />
                    </Grid>
                    <Grid>
                        <input {...dropzoneState.getInputProps()} /><br/>
                        <Typography variant='h6' sx={{color:"black",marginBottom:"2%"}}>Upload Document Here</Typography>
                        <p style={{textAlignLast:"center",color:"black"}}>or drop files here</p>
                    </Grid>
                </Grid>
            </Box>
            {dropzoneState.acceptedFiles.length >= 1 &&
                <div className={styles.file_wrapper}>
                    <aside style={{marginBottom: "2%"}}>
                        <h4>Files</h4>
                        <ul>
                            {dropzoneState.acceptedFiles.map((value: any) => (
                                <li key={value.name}>
                                    {value.name + " (" + value.size / 1000 + " KB)"}
                                </li>

                            ))}
                        </ul>
                    </aside>
                    <Button
                        variant="contained"
                        component="label"
                        disabled={
                            dropzoneState.acceptedFiles.length >= 1 ? loading : !loading
                        }
                        //className="btn__text__transform"
                        // style={{ marginLeft: "3%" }}
                        style={{borderRadius: "25px", background: "#FFA500", color: "#000000"}}
                        onClick={() => {
                            setLoading(false);
                            props.onUploadSuccess(dropzoneState);
                            dropzoneState?.acceptedFiles?.splice(
                                0,
                                dropzoneState?.acceptedFiles?.length
                            );

                            setUploadPopUp(false);
                        }}
                    >
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                }}
                            />
                        )}
                        submit
                    </Button>
                </div>
            }
        </Stack>
    )
}
