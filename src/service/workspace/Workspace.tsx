'use client'

import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import styles from "@/app/page.module.css";
import {Workspace} from "@/service/model/WorkspaceInterface";
import {addWorkFlow, findAllWorkspace} from "@/service/workspace/WorkspaceService";
import {CurrentUser} from "@/service/ServerDetail";

const WorkspaceLayout = (
    props: {
        assetSelectionFunction: (data: any) => void;
        workspace: Workspace[];
        valuationInProgress: boolean;
    }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [prefix, setPrefix] = useState('')
    const [rescheck, setResCheck] = useState(true)
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [workspace, setWorkspace] = useState<Workspace[]>([])
    const [valuationInProgress, setValuationInProgress] = useState<boolean>(true);
    let item = localStorage.getItem("user");
    const user: CurrentUser = JSON.parse(item != null ? item : "{}");
    const handleClickOpen = () => {
        setOpen(true);
        setPrefix('')
    };
    const handleWorkspace = () => {
        setResCheck(true)
        findAllWorkspace(user).then(value => {
            if (value.success) {
                let workspaces: Workspace[] = value.payload;
                setWorkspace(workspaces);
            }
            //TODO ERROR
        }).finally(() => {
            setValuationInProgress(false)
        })
        setOpen(false)
    }
    useEffect(() => {
        handleWorkspace()
    }, [])

    const handleClose = () => {
        setOpen(false);
    };
    const handleNameChange = (e: any) => {
        let name = e.target.value
        setName(name)
        if (name.length >= 3) {
            let value = name.slice(0, 3).toUpperCase()
            setPrefix(value)
            setResCheck(false)
        } else {
            setPrefix("")
            setResCheck(true)
        }
    }

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            color: "#1C1C1C",
            borderBottom: "5px theme.palette.action.hover",

        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            border: 0,
            padding: 8
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(n):hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const StyledTableContainer = styled(TableContainer)({
        border: 'none',
    });

    function projectSelectHandler(data: any) {

        props.assetSelectionFunction(data)
    }

    const handleSubmit = () => {
        setResCheck(true)
        let payload: Workspace = {
            workspaceName: name,
            workspaceKey: prefix,
            tenantId: user.tenantId,
            status: "ACTIVE",
            workspaceId: 0,
            encode: ""
        }
        addWorkFlow(user, payload).then(value => {
            handleWorkspace()

        });
    }
    return (
        <Box sx={{width: '100%', backgroundColor: "#ffff", minHeight: "95vh"}}>
            <div className={styles.playContainer}>
                <Typography variant='h4'>Workspace</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFA500",
                        borderRadius: "25px",
                        color: "black",
                        height: "45px",
                    }}
                    onClick={handleClickOpen}
                >
                    Create New
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "40px !important" }}>
                <DialogTitle sx={{textAlign: "center"}}>WorkS</DialogTitle>
                <DialogContent>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            sx={{width: "45%"}}
                            variant="standard"
                            autoComplete='off'
                            onChange={(e) => handleNameChange(e)}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Prefix"
                            sx={{width: "45%"}}
                            value={prefix}
                            autoComplete='off'
                            variant="standard"
                            onChange={(e) => setPrefix(e.target.value)}
                        />
                    </div>
                    <DialogActions>
                        <Button disabled={rescheck} onClick={handleSubmit}>Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            {valuationInProgress ?
                <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress/></div> : <></>}
            {!valuationInProgress &&
                (
                    workspace.length === 0 ?
                        (
                            <Card variant='outlined' sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "25vh",
                                margin: "5% 30%",
                                borderRadius: "30px 30px 20px 20px",
                            }}>
                                <CardContent>
                                    <Typography>No Workspace Available.</Typography>
                                </CardContent>
                            </Card>)
                        :
                        (
                            <StyledTableContainer sx={{
                                width: "75%",
                                margin: "1% auto",
                                borderRadius: "30px 30px 20px 20px",
                                border: "2px solid #DEEDFF",
                                background: "#f0f2f5"
                            }}>
                                <Table sx={{minWidth: 300}} aria-label="customized table">
                                    <TableHead sx={{
                                        borderBottom: "2px solid #DEEDFF",
                                        //  borderRadius: "5px"
                                    }}>
                                        <TableRow>
                                            <StyledTableCell
                                                style={{fontWeight: "bold", paddingLeft: "4%"}}>Name</StyledTableCell>
                                            <StyledTableCell style={{fontWeight: "bold"}}
                                                             align="center">Key</StyledTableCell>
                                            <StyledTableCell style={{fontWeight: "bold"}}
                                                             align="center">Asset</StyledTableCell>
                                            <StyledTableCell style={{fontWeight: "bold"}}
                                                             align="center">CreatedOn</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{border: "none !important"}}>
                                        {workspace.map((row) => (
                                            <StyledTableRow key={row.workspaceId} sx={{cursor: "pointer"}}
                                                            onClick={() => projectSelectHandler(row)}>
                                                <StyledTableCell component="th" scope="row" sx={{display: "flex"}}>
                                                    <Avatar sx={{
                                                        bgcolor: "#f8eacd",
                                                        color: "#805f1e",
                                                        fontWeight: 600,
                                                        fontSize: 16
                                                    }}>{row.workspaceKey?.slice(0, 2)}</Avatar>
                                                    <span style={{padding: "2% 4%"}}>{row.workspaceName}</span>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.workspaceKey}</StyledTableCell>
                                                <StyledTableCell align="center">-</StyledTableCell>
                                                <StyledTableCell align="center">-</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        )
                )}
        </Box>
    )
}

export default WorkspaceLayout;