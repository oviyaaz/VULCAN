import {Box, Button, Card, CardContent, Grid, Paper, TextField, Typography,} from "@mui/material";
import styles from "@/app/page.module.css";
import React, {useEffect, useState} from "react";
import {addWorkFlow, findAllWorkspace,} from "@/service/workspace/WorkspaceService";
import {Workspace, WorkspaceSummary} from "@/service/model/WorkspaceInterface";
import {CurrentUser} from "@/service/ServerDetail";
import CircularProgress from "@mui/material/CircularProgress";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ToastMessage from "@/service/ErrorToast/ToastMessage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from 'react-moment';
import { addAssetId } from "@/service/workspace/WorkspaceService";

export function getUser() {
    let item = localStorage.getItem("user");
    const user: CurrentUser = JSON.parse(item != null ? item : "{}");
    return user;
}

export function WorkspaceListLayout(props: {
    onSelectWorkspace: (data: Workspace) => void;
}) {

    const [workspaces, setWorkspaces] = useState<WorkspaceSummary[]>([]);
    const [filterWorkspace, setFilterWorkspace] = useState<WorkspaceSummary[]>([]);
    const [progressBar, setProgressBar] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [prefix, setPrefix] = useState("");
    const [documentId,setDocumentId]=useState();

    function updateSearchFilterData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.target.value !== "") {
            setFilterWorkspace(workspaces?.filter((data) => {
                return data.workspaceName.toLowerCase().includes(e.target.value.toLowerCase(), 0)
            }))
        } else {
            setFilterWorkspace(workspaces)
        }
    }


    const handleWorkspaceList = (user: CurrentUser) => {
        findAllWorkspace(user).then((value) => {
            if (value.success) {
                let workspace: WorkspaceSummary[] = value.payload;
                setWorkspaces(workspace);
                setFilterWorkspace(workspace)
                setProgressBar(false);
            }
            //TODO ERROR
        });
    };

    useEffect(() => {
        const user = getUser();
        handleWorkspaceList(user);
    }, []);


    function addWorkspaceList() {

        const handleClickOpen = () => {
            setOpen(true);
            setPrefix("");
            setName("");
        };
        const handleClose = () => {
            setOpen(false);
        };
        const handleNameChange = (e: any) => {
            let name = e.target.value;
            setName(name);
            if (name.length >= 3) {
                let value = name.slice(0, 3).toUpperCase();
                setPrefix(value);
            } else {
                setPrefix("");
            }
        };

        const handleSubmit = () => {
            const user = getUser();
            let payload: Workspace = {
                workspaceName: name,
                workspaceKey: prefix,
                tenantId: user.tenantId,
                status: "ACTIVE",
                workspaceId: 0,
                encode: "",
            };
            addWorkFlow(user, payload).then(() => {
                ToastMessage("Workspace Added", "success");
                handleWorkspaceList(user);
            });
        };

        const StyledTableCell = styled(TableCell)(() => ({
            [`&.${tableCellClasses.head}`]: {
                color: "#1C1C1C",
                borderBottom: "5px theme.palette.action.hover",
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
                border: 0,
                padding: 8,
            },
        }));

        const StyledTableRow = styled(TableRow)(({theme}) => ({
            "&:nth-of-type(n):hover": {
                backgroundColor: theme.palette.action.hover,

            },
            "&:last-child td, &:last-child th": {
                border: 0,
            },
        }));
        const StyledTableContainer = styled(TableContainer)({
            border: "none",
        });

        return filterWorkspace.length === 0 ? (
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "25vh",
                    margin: "10% 30%",
                    borderRadius: "30px 30px 20px 20px",
                }}
            >
                <CardContent>

                    <Typography>No Workspace Available.</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#FFA500",
                            borderRadius: "25px",
                            color: "black",
                            height: "45px",
                            textTransform: "None",
                            marginTop: "2%"
                        }}
                        onClick={handleClickOpen}
                    >
                        Create Workspace
                    </Button>

                </CardContent>
                <Dialog open={open} onClose={handleClose} className={styles.custom__Dialog}>
                    <DialogTitle sx={{textAlign: "center"}}>WorkSpace</DialogTitle>
                    <DialogContent>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                sx={{width: "45%"}}
                                variant={"outlined"}
                                autoComplete="off"
                                onChange={(e) => handleNameChange(e)}
                            />
                            <TextField
                                variant={"outlined"}
                                margin="dense"
                                id="name"
                                label="Key"
                                sx={{width: "45%"}}
                                value={prefix}
                                autoComplete="off"
                                onChange={(e) => setPrefix(e.target.value)}
                            />
                        </div>
                        <DialogActions>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={name.length < 3}
                                sx={{
                                    backgroundColor: "#FFA500",
                                    borderRadius: "25px",
                                    color: "black",
                                    height: "45px",
                                    textTransform: "None",
                                }}
                                onClick={(event) => {
                                    handleSubmit();
                                    handleClose();
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#FFA500",
                                    borderRadius: "25px",
                                    color: "black",
                                    height: "45px",
                                    textTransform: "None",
                                }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Card>
        ) : (
            <StyledTableContainer
                sx={{
                    width: "75%",
                    margin: "1% auto",
                    borderRadius: "30px 30px 20px 20px",
                    border: "2px solid #DEEDFF",
                    background: "#f0f2f5",
                    maxHeight: "70vh"
                }}
            >
                <Table stickyHeader sx={{minWidth: 300}} aria-label="customized table">
                    <TableHead
                        sx={{
                            borderBottom: "2px solid #DEEDFF",
                        }}
                    >
                        <TableRow>
                            <StyledTableCell
                                style={{fontWeight: "bold", paddingLeft: "4%"}}
                            >
                                Name
                            </StyledTableCell>
                            <StyledTableCell style={{fontWeight: "bold"}} align="center">
                                Asset
                            </StyledTableCell>
                            <StyledTableCell style={{fontWeight: "bold"}} align="center">
                                Paper
                            </StyledTableCell>
                            <StyledTableCell style={{fontWeight: "bold"}} align="center">
                                Updated on
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{border: "none !important"}}>
                        {workspaces.map((row) => (
                            <StyledTableRow
                                key={row.workspaceId}
                                sx={{cursor: "pointer"}}
                                onClick={() => props.onSelectWorkspace(row)}
                            >
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    sx={{display: "flex"}}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: "#f8eacd",
                                            color: "#805f1e",
                                            fontWeight: 600,
                                            fontSize: 16,
                                        }}
                                    >
                                        {row.workspaceKey?.slice(0, 2)}
                                    </Avatar>
                                    <span style={{padding: "2% 4%"}}>{row.workspaceName}</span>
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.assetCount}</StyledTableCell>
                                <StyledTableCell align="center">{row.paperCount}</StyledTableCell>
                                <StyledTableCell align="center"> <Moment fromNow>{row.lastUpdatedOn}</Moment></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        );
    }


    function addNewWorkspace() {

        const handleClickOpen = () => {
            setOpen(true);
            setPrefix("");
            setName("");
        };
        const handleClose = () => {
            setOpen(false);
        };
        const handleNameChange = (e: any) => {
            let name = e.target.value;
            setName(name);
            if (name.length >= 3) {
                let value = name.slice(0, 3).toUpperCase();
                setPrefix(value);
            } else {
                setPrefix("");
            }
        };

        const handleSubmit = () => {
            const user = getUser();
            let payload: Workspace = {
                workspaceName: name,
                workspaceKey: prefix,
                tenantId: user.tenantId,
                status: "ACTIVE",
                workspaceId: 0,
                encode: "",
            };
            addWorkFlow(user, payload).then(() => {
                ToastMessage("Workspace Added", "success");
                handleWorkspaceList(user);
            });
            // addAssetId(user,payload.workspaceName).then((response: any) => setDocumentId(response.payload.documentId)){
            //     ToastMessage("Asset Added","success");
            // };
        };
        return (
            <Grid className={styles.playContainer}>
                <Grid container sx={{justifyContent: "space-between", marginTop: "2%"}}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateSearchFilterData(e)}
                        sx={{width: "50%", borderRadius: "25px"}} variant="filled"
                        label={"Search Workspace"}></TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#FFA500",
                            borderRadius: "25px",
                            color: "black",
                            height: "45px",
                            textTransform: "None",
                        }}
                        onClick={handleClickOpen}
                    >
                        Create Workspace
                    </Button>
                </Grid>
                <Dialog open={open} onClose={handleClose} className={styles.custom__Dialog}>
                    <DialogTitle sx={{textAlign: "center"}}>WorkSpace</DialogTitle>
                    <DialogContent>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                sx={{width: "45%"}}
                                variant={"outlined"}
                                autoComplete="off"
                                onChange={(e) => handleNameChange(e)}
                            />
                            <TextField
                                variant={"outlined"}
                                margin="dense"
                                id="name"
                                label="Key"
                                sx={{width: "45%"}}
                                value={prefix}
                                autoComplete="off"
                                onChange={(e) => setPrefix(e.target.value)}
                            />
                        </div>
                        <DialogActions>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={name.length < 3}
                                sx={{
                                    backgroundColor: "#FFA500",
                                    borderRadius: "25px",
                                    color: "black",
                                    height: "45px",
                                    textTransform: "None",
                                }}
                                onClick={(event) => {
                                    handleSubmit();
                                    handleClose();
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#FFA500",
                                    borderRadius: "25px",
                                    color: "black",
                                    height: "45px",
                                    textTransform: "None",
                                }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <ToastContainer/>
            </Grid>
        );
    }

    return (
        <Box
            sx={{
                width: "98%",
                height: "90vh",
                borderRadius: "0 0 25px 25px",
                backgroundColor: "#E0E0E0",
            }}
        >
            {workspaces && workspaces.length > 0 ? addNewWorkspace() : null}
            {progressBar ? (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress/>
                </div>
            ) : (
                addWorkspaceList()
            )}
        </Box>
    );
}
