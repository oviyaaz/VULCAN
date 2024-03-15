"use client";

import React, {useEffect, useState} from "react";
import styles from "@/app/page.module.css";
import NavBar from "@/service/NavBar";
import {getUser} from "@/app/vulcan/workspace/WorkspaceListLayout";
import {Truth, WorkspaceAsset} from "@/service/model/WorkspaceInterface";
import {findOneWorkspaceAsset, findPapersForWorkspaceAsset,} from "@/service/workspace/WorkspaceService";
import {Autocomplete, Box, Grid, TextField, Typography} from "@mui/material";
import {UsecaseEnum} from "@/service/workspace/WorkspaceSchema";
import {TablePlayground} from "@/app/vulcan/workspace/[workspaceId]/[assetId]/TablePlayground";
import {CheckboxPlayground} from "./CheckboxPlayground";
import {AutoQPlayground} from "./AutoQPlayground";
import { KvpPlayground } from "@/app/vulcan/workspace/[workspaceId]/[assetId]/KvpPlayground";
import { KvpFormPlayground } from "@/app/vulcan/workspace/[workspaceId]/[assetId]/KvpFormPlayground";

export default function Page({
                                 params,
                             }: {
    params: { workspaceId: number; assetId: string };
}) {
    const [selectedPapers, setSelectedPapers] = useState<Truth[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<WorkspaceAsset>();
    const [usecaseLayout, setUsecaseLayout] = React.useState<React.JSX.Element>(<></>);

    function fileTypeIconPicker(fileType: string) {
        if (fileType === "png") {
            return (
                <img
                    src={"/png.png"}
                    alt="File Type"
                    style={{width: "4%", height: "4%"}}
                />
            )
        } else if (fileType === "jpg") {
            return (
                <img
                    src={"/jpg.png"}
                    alt="File Type"
                    style={{width: "4%", height: "4%"}}
                />
            )
        } else if (fileType === "jpeg") {
            return (
                <img
                    src={"/jpeg.png"}
                    alt="File Type"
                    style={{width: "4%", height: "4%"}}
                />
            )
        } else if (fileType === "pdf") {
            return (
                <img
                    src={"/pdf.png"}
                    alt="File Type"
                    style={{width: "4%", height: "4%"}}
                />
            )
        }
    }

    useEffect(() => {
        const user = getUser();
        findPapersForWorkspaceAsset(user, params.assetId).then((value) => {
            let assets: Truth[] = value.payload;
            setSelectedPapers(assets);
            setUsecaseLayout(<KvpPlayground
                images={assets}
                originId={params.assetId}
                workspaceId={params.workspaceId}
            />);
        });
        findOneWorkspaceAsset(user, params.assetId).then((value) => {
            let asset: WorkspaceAsset = value.payload;
            setSelectedAsset(asset);
        });

    }, [params.assetId]);

    return (
        <main className={styles.main}>
            <NavBar/>
            <div className={styles.center}>
                <Box
                    sx={{
                        width: "98%",
                        minHeight: "92vh",
                        borderRadius: "25px",
                        backgroundColor: "#E0E0E0",
                    }}
                >
                    <Grid
                        // className={styles.playgroundContainer}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "25px",
                            padding: "10px",
                            borderRadius: "25px",
                            backgroundColor: "white",
                            marginLeft: "2%",
                            marginRight: "2%",
                            width: "96% !important",
                        }}
                    >
                        {selectedAsset && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap",
                                }}
                            >
                                {fileTypeIconPicker(selectedAsset.extension)}
                                <Typography
                                    sx={{
                                        fontSize: "1.1rem !important",
                                        paddingLeft: "5px",
                                        color: "black !important",
                                        marginTop: "1%"
                                    }}
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {selectedAsset.name}
                                </Typography>
                            </div>
                        )}
                        <Autocomplete
                            disableClearable
                            sx={{
                                width: "25%",
                                ml: 2,
                                backgroundColor: "#E0E0E0",
                                marginRight: "20px",
                            }}
                            defaultValue={UsecaseEnum.KVP}
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    if (newValue == UsecaseEnum.TABLE_EXTRACTION) {
                                        setUsecaseLayout(<TablePlayground
                                            images={selectedPapers}
                                            originId={params.assetId}
                                            workspaceId={params.workspaceId}
                                        />);
                                    }

                                    if (newValue == UsecaseEnum.KVP) {
                                        setUsecaseLayout(<KvpPlayground
                                            images={selectedPapers}
                                            originId={params.assetId}
                                            workspaceId={params.workspaceId}
                                        />);
                                    }

                                    if (newValue == UsecaseEnum.AUTOQ) {
                                        setUsecaseLayout(<AutoQPlayground
                                            images={selectedPapers}
                                            originId={params.assetId}
                                            workspaceId={params.workspaceId}
                                        />);
                                    }

                                    if (newValue == UsecaseEnum.CHECKBOX_DETECTION) {
                                        setUsecaseLayout(<CheckboxPlayground
                                            images={selectedPapers}
                                            originId={params.assetId}
                                            workspaceId={params.workspaceId}
                                        />);
                                    }

                                    if (newValue == UsecaseEnum.KVP_FORM) {
                                        setUsecaseLayout(<KvpFormPlayground
                                            images={selectedPapers}
                                            originId={params.assetId}
                                            workspaceId={params.workspaceId}
                                        />);
                                    }
                                }
                            }}
                            options={[
                                UsecaseEnum.KVP,
                                UsecaseEnum.TABLE_EXTRACTION,
                                UsecaseEnum.CHECKBOX_DETECTION,
                                UsecaseEnum.AUTOQ,
                                UsecaseEnum.KVP_FORM,
                            ]}
                            getOptionLabel={(option) => {
                                return option;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            renderInput={(params) => (
                                <TextField {...params} label="Usecase"/>
                            )}
                        />
                    </Grid>
                    <Grid md={10} sx={{margin: "10px 30px 10px 10px !important"}}>

                        {usecaseLayout}

                    </Grid>
                </Box>
            </div>
        </main>
    );
}
