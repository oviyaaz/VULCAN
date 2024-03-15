'use client'

import React from "react";
import {DropzoneOptions, DropzoneState, useDropzone} from "react-dropzone";
import {CircularProgress, Popover, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {green} from "@mui/material/colors";
// import AddIcon from '@mui/icons-material/Add';
// import "../../styles/Home.css";

// https://react-dropzone.js.org/#src for reference
export function AddAsset(props: {
    label: React.ReactElement|string;
    screen?: string;
    onUploadSuccess: (dropzoneState: DropzoneState) => void;
}) {
    const options: DropzoneOptions = {
        accept: {"image/*": [], "application/pdf": []},
    };
    const [uploadPopUp, setUploadPopUp] = React.useState<boolean>(false);

    function handleUploadPopupClose() {

        setUploadPopUp(false);
    }

    function getFileUploadLayout() {
        const dropzoneState: DropzoneState = useDropzone();
        const [loading, setLoading] = React.useState(false);
        return <Stack
            sx={{Width: "100%", padding: "20px", justifyContent: "center", display: "flex"}}
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
                    padding: "20px",
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: "#eeeeee",
                    borderStyle: "dashed",
                    backgroundColor: "#fafafa",
                    color: "#bdbdbd",
                    outline: "none",
                    margin: "2% 5%",
                    transition: "border .24s ease-in-out",
                }}
            >
                <input {...dropzoneState.getInputProps()} />
                <p>Drag &apos;n&apos; drop files here, or click to select files</p>
            </Box>
            <aside>
                <h4 style={{marginLeft: "5%"}}>Files</h4>
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
                sx={{
                    backgroundColor: "#FFA500",
                    borderRadius: "25px",
                    color: "black",
                    maxWidth: "50%",
                    height: "45px", textTransform: "None"
                }}
                className="btn__text__transform"
                onClick={() => {
                    setLoading(false);
                    props.onUploadSuccess(dropzoneState);
                    dropzoneState?.acceptedFiles?.splice(
                        0,
                        dropzoneState?.acceptedFiles?.length
                    );
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
                )} upload
            </Button>
        </Stack>;
    }

    return (
        <section>
            <Button
                variant="contained"
                onClick={() => {
                    setUploadPopUp(true);
                }}
                sx={{
                    backgroundColor: "#FFA500",
                    borderRadius: "25px",
                    color: "black",
                    maxWidth: "50%",
                    height: "45px", textTransform: "None"
                }}>
                {props.label}
            </Button>
            <Popover
                open={uploadPopUp}
                onClose={handleUploadPopupClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                // sx={{
                //   borderRadius: 5,
                //   p: 2,
                //   minWidth: "50vh",
                //   minHeight: "50vh",
                // }}
            >
                {getFileUploadLayout()}
            </Popover>
        </section>
    );
}
