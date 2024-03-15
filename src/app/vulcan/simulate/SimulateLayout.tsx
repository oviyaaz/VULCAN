'use client'

import styles from "@/app/page.module.css";
import TransactionHeader from "./TransactionHeader";
import ToastMessage from "@/service/ErrorToast/ToastMessage";
import {
    Box,
    Button,
    Collapse,
    Grid,
    Tooltip,
    Paper,
    Tab,
    ButtonBase,
    IconButton,
    Typography
} from "@mui/material";
import {
    DownloadOutlined,
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
} from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PaginatedTable, {
    StyledTableCell,
    StyledTableRow,
} from "@/app/vulcan/table/PaginatedTable";
import { getSimulatorTable, simulatorDownload } from "@/service/simulator/SimulatorService";
import React, { useState, useEffect } from 'react';
import { CurrentUser } from "@/service/ServerDetail";
import { getUser } from "../workspace/WorkspaceListLayout";
import { Transaction } from "@/service/model/Simulator";
import { TransactionAsset } from "@/service/model/Simulator";
import TransactionLinearProgress from "./TransactionLinearProgress";
import TransactionAssetDetail from "./TransactionAssetDetail";
import { EnumConfig } from "../chip/EnumChip";
import { ToastContainer } from "react-toastify";
import Moment from 'react-moment';


export function secondsToHms(d: number | string) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? "h" : "h") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    return hDisplay + " " + mDisplay + " " + sDisplay;
}

function renderRow(row: any) {
    console.log("ASHIK")
    return <TransactionRow row={row} />;
}
function TransactionRow(props: { row: any }) {
    console.log("ROW", props.row)
    const { row } = props;
    const enumConfig = new EnumConfig();
    const [user, setUser] = useState<CurrentUser>();
    const [value, setValue] = React.useState("0");
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [transactionAsset, setTransactionAsset] = useState<TransactionAsset>();
    const [transactionAssets, setTransactionAssets] = useState<
        TransactionAsset[]
    >([]);
    useEffect(() => {
        const user = getUser();
        setUser(user);
    }, []);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const tabsHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell>{row.rootPipelineId}</StyledTableCell>
                <StyledTableCell width={"18%"}>{row.name}</StyledTableCell>
                <StyledTableCell width={"18%"}>{row.pipelineName}</StyledTableCell>
                <StyledTableCell align={"center"}>
                    {row.totalAssetCount}
                </StyledTableCell>
                <StyledTableCell align={"center"}>
                    {enumConfig.createTransactionStatusChip(row.transactionStatus)}
                </StyledTableCell>
                <StyledTableCell align={"left"} width={"10%"}>
                    <Moment fromNow>{row.startedOn}</Moment>
                </StyledTableCell>
                <StyledTableCell align={"center"}>
                    {secondsToHms(row.timeTaken)}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <Button
                        disabled={row.transactionStatus !== "COMPLETED"}
                        variant="text"
                    > <DownloadOutlined
                        onClick={(event) => {
                            if (row.transactionStatus === "COMPLETED") {
                                user && simulatorDownload(user, row.rootPipelineId)
                                    .then((resp) => {
                                        if (resp.success) {
                                            resp.blob().then((blob: any) => {
                                                const url = window.URL.createObjectURL(blob);
                                                const a = document.createElement("a");
                                                a.style.display = "none";
                                                a.href = url;
                                                a.download = row.rootPipelineId + ".zip";
                                                document.body.appendChild(a);
                                                a.click();
                                                window.URL.revokeObjectURL(url);
                                            });
                                        }
                                    })
                                    .catch(() => alert("export failed"));
                            }
                        }}
                    ></DownloadOutlined>
                    </Button>
                </StyledTableCell>
                <StyledTableCell width={"10%"} align="center" sx={{ padding: "0" }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{ marginRight: "10px", color: "#0055B4" }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
                    </IconButton>

                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                {open && (
                    <StyledTableCell className={styles.styled__table_cell} colSpan={12}>
                        <Collapse
                            in={open}
                            timeout="auto"
                            unmountOnExit
                            sx={{
                                borderRadius: "10px",
                                width: "100%",
                                height: "fit-content",
                            }}
                        >
                            <>
                                <Grid
                                    sx={{
                                        //padding: "10px",
                                        width: "100%",
                                        backgroundColor: "whitesmoke",
                                        textAlign: "end",
                                    }}
                                >
                                    {checked && (
                                        <Tooltip title="Fullscreen">
                                            <FullscreenIcon
                                                onClick={handleChange}
                                                className={styles.cursor__pointer}
                                            />
                                        </Tooltip>
                                    )}

                                    {!checked && (
                                        <Tooltip title="Exit Fullscreen">
                                            <FullscreenExitIcon
                                                onClick={handleChange}
                                                className={styles.cursor__pointer}
                                            />
                                        </Tooltip>
                                    )}
                                </Grid>
                                {transactionAssets.length > 0 ? <Grid
                                    spacing={0.5}
                                    columns={16}
                                    sx={{
                                        margin: "20px",
                                        boxShadow:
                                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                    }}
                                >
                                    <TabContext value={value}>
                                        {checked && <Box >
                                            <TabList onChange={tabsHandleChange} aria-label="lab API tabs example">
                                                {transactionAssets.map((tAssets, key) => (
                                                    <Tab label={
                                                        <React.Fragment>
                                                            <Paper
                                                                sx={{
                                                                    margin: "auto",
                                                                    width: "20vw",
                                                                    cursor: "default",
                                                                    overflowY: "auto",
                                                                    backgroundColor:
                                                                        value === key.toString()
                                                                            ? "white" : "whitesmoke",


                                                                    boxShadow:
                                                                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                                                }}
                                                            >
                                                                <Grid spacing={2}>
                                                                    <Grid sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                                        <ButtonBase
                                                                            sx={{
                                                                                width: "100%",
                                                                                cursor: "default",
                                                                                padding: "2px",
                                                                                justifyContent: "space-around"
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                gutterBottom
                                                                                variant="subtitle2"
                                                                                component="div"
                                                                                sx={{ fontWeight: "bold", ml: 1, mt: 1 }}
                                                                            >
                                                                                {tAssets.name}
                                                                            </Typography>
                                                                            <div style={{ marginLeft: "10px" }}>
                                                                                {enumConfig.createTransactionStageChip(
                                                                                    tAssets?.latestTransactionAudit
                                                                                        ?.transactionStage
                                                                                )}
                                                                            </div>
                                                                        </ButtonBase>
                                                                    </Grid>
                                                                    <Grid
                                                                        sx={{
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                        }}
                                                                    >
                                                                        <ButtonBase
                                                                            sx={{
                                                                                width: "100%",
                                                                                marginBottom: "5px",
                                                                                cursor: "default",
                                                                            }}
                                                                        >
                                                                            <TransactionLinearProgress
                                                                                value={tAssets.progressPercent}
                                                                            />
                                                                        </ButtonBase>
                                                                    </Grid>


                                                                </Grid>
                                                            </Paper>
                                                        </React.Fragment>
                                                    } value={key.toString()} />
                                                ))}

                                            </TabList>
                                        </Box>}

                                        {transactionAssets.map((tAssets, key) =>
                                        (

                                            <TabPanel value={key.toString()} >

                                                <TransactionAssetDetail
                                                    originId={tAssets?.originId}
                                                    loader={loading}
                                                />
                                            </TabPanel>)
                                        )}

                                    </TabContext>

                                </Grid> : <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "2%" }}>No Data</Typography>}
                            </>
                        </Collapse>
                    </StyledTableCell>
                )}
            </StyledTableRow>
        </>
    );
}

function renderHeader() {
    return (
        <StyledTableRow>
            <StyledTableCell width={"15%"}>
                Pipeline ID
            </StyledTableCell>
            <StyledTableCell width={"15%"}>Name</StyledTableCell>
            <StyledTableCell width={"15%"}>Pipeline</StyledTableCell>
            <StyledTableCell align={"center"}>Asset count</StyledTableCell>
            <StyledTableCell align={"center"}>Status</StyledTableCell>
            {/*<StyledTableCell align={"center"}>Triggered by</StyledTableCell>*/}
            <StyledTableCell align={"center"}>Start time</StyledTableCell>
            <StyledTableCell align={"left"}>Duration</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell width={"5%"} align="center">Expand</StyledTableCell>
        </StyledTableRow>
    );
}

const SimulateLayout = () => {
    const [user, setUser] = useState<CurrentUser>();
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        const user = getUser();
        setUser(user);
    }, []);

    return (
        <div className={styles.onboardContainer}>
            <TransactionHeader onUploadSuccess={() => {
                ToastMessage("File Uploaded", "success")
                setUpdate(true)
                // refresh
            }} />
            <div style={{ margin: "2% auto auto auto", width: "99%" }}>
                <PaginatedTable
                    renderRow={(row) => renderRow(row)}
                    refresh={update}
                    renderHeader={renderHeader}
                    fetchHandler={(pageNo, pageSize) => {
                        if (user) {
                            return getSimulatorTable(user, pageNo, pageSize).then((res) => res);
                        } else {
                            return Promise.resolve(undefined); // Return an empty promise for the falsy case
                        }
                    }}
                />
            </div>
            <ToastContainer />
        </div>
    )
}
export default SimulateLayout;