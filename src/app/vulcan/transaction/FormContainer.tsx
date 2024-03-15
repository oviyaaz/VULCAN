import React, {useState} from "react";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";

const FormContainer = (props: { open: any }) => {
    const [dropdownVal, setDropdownValue] = useState("");
    const [comment, setComment] = useState("");
    const [selectVal, setSelectVal] = useState("");

    const handleInput = (e: any) => {
        setSelectVal(e.target.value);
    };
    const handleComment = (e: any) => {
        setComment(e.target.value);
    };
    const submitHandler = () => {
        let Response = {
            touchReviewId: 0,
            touch: dropdownVal,
            comment: comment,
            correctedValue: selectVal,
            reviewStatus: "OPEN",
            createdOn: "2023-04-04T12:05:43.078Z",
        };
        synonymIdhandler(Response);
        predictionIdhandler(Response);
        props.open();
    };

    const synonymIdhandler = async (Response: any) => {
        // await ApiService.handlePost(
        //     url.SERVER_URL + "feedback/synonym/000001",
        //     Response,
        //     true
        // );
    };

    const predictionIdhandler = async (Response: any) => {
        // await ApiService.handlePost(
        //     url.SERVER_URL + "feedback/prediction/000001",
        //     Response,
        //     true
        // );
    };

    return (
        <>
            <Card sx={{
                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                marginTop: "10px"
            }}>
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>
                    Feedback
                </p>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    padding={2}
                >
                    <Autocomplete
                        id="free-solo-with-synonym"
                        value={dropdownVal}
                        onInputChange={(event, newInputValue) => {
                            setDropdownValue(newInputValue);
                        }}
                        options={["ZERO", "LOW", "HIGH"]}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        freeSolo
                        sx={{minWidth: "50%"}}
                        renderInput={(params) => (
                            <TextField maxRows={4} {...params} label={"Touch"}/>
                        )}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Expected Answer"
                        variant="outlined"
                        sx={{minWidth: "50%"}}
                        onChange={(e) => handleInput(e)}
                    />
                    <TextField
                        label="Comment"
                        multiline
                        maxRows={5}
                        sx={{minWidth: "50%"}}
                        variant="outlined"
                        onChange={(e: any) => handleComment(e)}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            fontSize: "14px",
                            margin: "3% auto",
                            textTransform: "none",
                        }}
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                </Stack>
            </Card>
        </>
    );
};

export default FormContainer;
