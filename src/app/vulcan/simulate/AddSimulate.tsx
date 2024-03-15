'use client'

import React, { useState, useEffect } from 'react'
import {
    Button,
    Popover,
    Stack,
    Typography,
    Switch,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Box,
    CircularProgress
} from "@mui/material";
import { green } from "@mui/material/colors";
import { DropzoneOptions, DropzoneState, useDropzone } from "react-dropzone";
import styles from "@/app/page.module.css";

const AddSimulate = (props:
    {
        label: string;
        onUploadSuccess: (dropzoneState: DropzoneState, transaction: any) => void;

    }) => {
    const [kvpCheck, setKVPCheck] = useState<Boolean>(false);
    const [uploadPopUp, setUploadPopUp] = useState<boolean>(false);
    const [kvpModel, setKVPModel] = useState("");
    const [loading, setLoading] = useState(false);
    const [transactionOnChange, setTransactionOnChange] = useState({
        CHECKBOX: false,
        TABLE: false,
        KVP: false,
    });
    const [transaction, setTransaction] = React.useState<any>();
    const [transactionRequest, setTransactionRequest] = useState<{
        plugins: string[];
        kvpModelRegistry: string;
    }>({
        plugins: [],
        kvpModelRegistry: "",
    });
    const dropzoneState: DropzoneState = useDropzone();
    const label = { inputProps: { "aria-label": "Switch demo" } };

    useEffect(() => {
        if (transactionRequest.kvpModelRegistry != "") {
            setTransaction(encodeURIComponent(JSON.stringify(transactionRequest)));
        }
    }, [transactionRequest])
    useEffect(() => {
        if (transaction) {
            setLoading(false);
            props.onUploadSuccess(dropzoneState, transaction);
            dropzoneState?.acceptedFiles?.splice(
                0,
                dropzoneState?.acceptedFiles?.length
            );
            setUploadPopUp(false);
        }
    }, [transaction]);
    function handleUploadPopupClose() {
        dropzoneState?.acceptedFiles?.splice(
            0,
            dropzoneState?.acceptedFiles?.length
        );
        setUploadPopUp(false);
    }
    const handleTransactionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTransactionOnChange({
            ...transactionOnChange,
            [event.target.name]: event.target.checked,
        });
    };
    const kvpHandler = () => {
        setKVPCheck(!kvpCheck);
    };
    const handleChange = (event: any) => {
        setKVPModel(event.target.value);
    };
    const handleTransactionSet = () => {
        const keys = Object.keys(transactionOnChange);
        const value = Object.values(transactionOnChange);
        const filterData = keys.filter((flag, index) => {
            if (value[index]) {
                return flag;
            }
        });
        setTransactionRequest({ plugins: filterData, kvpModelRegistry: kvpModel });
    };
    return (
        <section>
            <Button
                variant="contained"
                onClick={() => {
                    setUploadPopUp(true);
                }}
                sx={{ borderRadius: "25px", backgroundColor: "#0484c4", marginTop: "20px" }}
            >
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
                <div style={{ display: "flex", flexDirection: "row", width: "600px" }}>
                    <Stack sx={{ width: "300px", padding: "30px", height: "280px" }} direction="column" spacing={2}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography style={{ marginTop: "8px" }}>Checkbox</Typography>
                            <Switch
                                {...label}
                                checked={transactionOnChange.CHECKBOX}
                                name="CHECKBOX"
                                onChange={handleTransactionChange}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography style={{ marginTop: "8px" }}>Table</Typography>
                            <Switch
                                {...label}
                                checked={transactionOnChange.TABLE}
                                name="TABLE"
                                onChange={handleTransactionChange}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography style={{ marginTop: "8px" }}>KVP</Typography>
                            <Switch
                                {...label}
                                checked={transactionOnChange.KVP}
                                name="KVP"
                                onClick={kvpHandler}
                                onChange={handleTransactionChange}
                            />
                        </div>
                        {kvpCheck && (
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Model"
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    >
                                        <MenuItem value="ARGON">Argon</MenuItem>
                                        <MenuItem value="XENON">Xenon</MenuItem>
                                        <MenuItem value="KRYPTON">Krypton</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        )}
                    </Stack>
                    <Stack
                        sx={{ Width: "100%", padding: "20px" }}
                        direction="column"
                        spacing={2}
                    >
                        <Box
                            {...dropzoneState.getRootProps({ className: "dropzone" })}
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
                            <p>
                                Drag &apos;n&apos; drop files here, or click to select files
                            </p>
                        </Box>
                        <aside>
                            <h4 style={{ marginLeft: "5%" }}>Files</h4>
                            <ul>
                                {dropzoneState.acceptedFiles.map((value) => (
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
                                dropzoneState.acceptedFiles.length >= 1
                                    ? loading
                                    : !loading && !(transactionRequest.kvpModelRegistry != "")
                            }
                            className={styles.btn__text__transform}
                            onClick={() => {
                                handleTransactionSet();
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
                    </Stack>
                </div>
            </Popover>
        </section>
    )
}
export default AddSimulate;