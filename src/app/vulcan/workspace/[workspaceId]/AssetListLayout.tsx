import CircularProgress from "@mui/material/CircularProgress";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Workspace, WorkspaceAsset} from "@/service/model/WorkspaceInterface";
import {CurrentUser} from "@/service/ServerDetail";
import {addAsset, findAllAsset} from "@/service/workspace/WorkspaceService";
import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";
import styles from "@/app/page.module.css";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {toast} from "react-toastify";
import {AddAsset} from "@/service/workspace/AddAsset";
import ToastMessage from "@/service/ErrorToast/ToastMessage";
import {WorkspaceAssets} from "@/service/workspace/WorkspaceAssets";

export function AssetListLayout(props: {
    workspace: Workspace,
    onSelectWorkspaceAsset: (workspaceSelected: Workspace,
                             workspaceAssetSelected: WorkspaceAsset) => void
}) {


    const [progressBar, setProgressBar] = useState<boolean>(true);
    const [workspaceAssets, setWorkspaceAssets] = useState<WorkspaceAsset[]>([])
    const [filterWorkspaceAssets, setFilterWorkspaceAssets] = useState<WorkspaceAsset[]>([])


    const handleWorkspaceAssetList = (user: CurrentUser) => {
        if (props.workspace) {
            findAllAsset(user, props.workspace).then(value => {
                if (value.success) {
                    let workspaces: WorkspaceAsset[] = value.payload;
                    setWorkspaceAssets(workspaces);
                    setFilterWorkspaceAssets(workspaces)
                    setProgressBar(false);
                }
                //TODO ERROR
            });
        }
    }


    function getAddAsset() {
        return <AddAsset
            label={
                <Tooltip title="Upload Asset">
                    <IconButton>
                        <FileUploadIcon/>
                    </IconButton>
                </Tooltip>
            }
            onUploadSuccess={(dropzoneState: { acceptedFiles: any[] }) => {
                let formData = new FormData();
                dropzoneState.acceptedFiles.forEach((file: string | Blob) =>
                    formData.append("file", file)
                );
                handleSubmit(formData);
            }}
        />;
    }

    const handleSubmit = (formData: FormData) => {
        const user = getUser();
        setProgressBar(true)
        addAsset(user, props.workspace, formData).then(() => {
            handleWorkspaceAssetList(user);
        });
    }

    function addNewWorkspaceAsset() {

        function updateSearchFilterData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
            if (e.target.value !== "") {
                setFilterWorkspaceAssets(workspaceAssets?.filter((data) => {
                    return data.name.toLowerCase().includes(e.target.value.toLowerCase(), 0)
                }))
            } else {
                setFilterWorkspaceAssets(workspaceAssets)
            }
        }

        return (<Box className={styles.playContainer} sx={{
            justifyContent: "space-between !important",
            position: "fixed",
            zIndex: 10,
            backgroundColor: "#E0E0E0"
        }}>
            <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateSearchFilterData(e)}
                sx={{width: "60%", borderRadius: "25px"}} variant="filled"
                label={"Search Assets"}></TextField>
            {getAddAsset()}
        </Box>);
    }

    useEffect(() => {
        const user = getUser();
        handleWorkspaceAssetList(user);
    }, []);

    function fileTypeIconPicker(fileType: string) {
        if (fileType === "png") {
            return (
                <img
                    src={"/png.png"}
                    alt="File Type"
                    style={{width: "8%", height: "8%"}}
                />
            )
        } else if (fileType === "jpg") {
            return (
                <img
                    src={"/jpg.png"}
                    alt="File Type"
                    style={{width: "8%", height: "8%"}}
                />
            )
        } else if (fileType === "jpeg") {
            return (
                <img
                    src={"/jpeg.png"}
                    alt="File Type"
                    style={{width: "8%", height: "8%"}}
                />
            )
        } else if (fileType === "pdf") {
            return (
                <img
                    src={"/pdf.png"}
                    alt="File Type"
                    style={{width: "8%", height: "8%"}}
                />
            )
        }
    }


    function addWorkspaceAssetList() {
        return (
            <Grid container sx={{
                display: "flex",
                justifyContent: 'space-evenly',
                pl: 5,
                pr: 5,
                pt: 3,
                width: "90%",
                margin: "100px auto",
            }}>
                {filterWorkspaceAssets.map((data: any) => {
                        return (
                            <Card className={styles.cardHover}
                                  onClick={() => props.onSelectWorkspaceAsset(props.workspace, data)}
                                  sx={{
                                      backgroundColor: "whitesmoke",
                                      height: "13em",
                                      width: "26em",
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                      textAlign: "center",
                                      alignItems: "center",
                                      marginBottom: "50px",
                                      paddingTop: "10px",
                                      background: "#f0f2f5",
                                      borderRadius: "30px 30px 20px 20px",
                                      border: "2px solid #DEEDFF",
                                  }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="160px"
                                        image={"data:image/png;base64," + (data.previewEncode)}
                                    />
                                    <CardContent sx={{paddingBottom: "6% !important"}}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}
                                        >
                                            {/* <img
                                                src={"/pdf.png"}
                                                alt="logo login"
                                                style={{width: "8%", height: "8%"}}
                                            /> */}
                                            {fileTypeIconPicker(data.extension)}
                                            {/* <div>{data.extension}
                                            </div> */}
                                            <Typography
                                                sx={{fontSize: "1.1rem !important"}}
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {data.name}
                                            </Typography>
                                            <Tooltip title="view details">
                                                <ArrowForwardIcon color="primary"/>
                                            </Tooltip>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>)
                    }
                )}
            </Grid>);
    }


    return (<Box sx={{
        width: "98%",
        height: "92vh",
        borderRadius: "0 0 25px 25px",
        overflow: "scroll",
        backgroundColor: "#E0E0E0",
    }}>
        {workspaceAssets.length > 0 && addNewWorkspaceAsset()}
        {progressBar ?
            <div style={{
                height: "100%",
                display: "flex",
                marginTop: "30px",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <CircularProgress/></div> : workspaceAssets.length > 0 ? addWorkspaceAssetList() :
                <WorkspaceAssets onUploadSuccess={(dropzoneState: { acceptedFiles: any[] }) => {
                    let formData = new FormData();
                    dropzoneState.acceptedFiles.forEach((file: string | Blob) =>
                        formData.append("file", file)
                    );
                    handleSubmit(formData);
                }}
                />}
    </Box>);
}