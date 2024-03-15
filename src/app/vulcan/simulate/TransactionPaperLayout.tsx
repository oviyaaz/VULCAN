import React, { useEffect } from "react";
import { Box, Chip, CircularProgress, Paper, Typography } from "@mui/material";
// import { PaperInfo } from "./TransactionAssetDetail";
import { PaperInfo } from "@/service/model/Simulator";
// import "../../styles/Home.css";
import { Bbox } from "@/service/model/Bbox";
import { BoundingBox } from "@/service/Bbox/BoundingBox";
import styles from "@/app/page.module.css";


function TransactionPaperLayout(props: {
    papers: PaperInfo[];
    pageNo: number;
    bbox: Bbox;
}) {
    const [image, setImage] = React.useState(
        props.papers.filter((value) => value.pageNo === props.pageNo).pop()
    );

    useEffect(() => {
        setImage(
            props.papers.filter((value) => value.pageNo === props.pageNo).pop()
        );
    }, [props.pageNo, props.papers]);

    return (
        <Box sx={{ width: "100%", display: "flex" }}>
            <div className={styles.paper__layout} style={{ padding: "20px" }}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: 50,
                        pl: 2,
                        backgroundColor: "background.default",
                        justifyContent: "space-between",
                        pr: 3,
                    }}
                >
                    <Typography>{image !== undefined ? image.filename : null}</Typography>
                    {image && (
                        <Chip
                            variant="outlined"
                            color="default"
                            label={"Page: " + image.pageNo}
                        />
                    )}
                </Paper>
                <div>
                    {image !== undefined ? (
                        <div className={styles.bBox__parent__div}>
                            <div
                                key={image.pageNo}
                                style={{ justifyContent: "center", width: "100%" }}
                            >
                                <BoundingBox imageEncode={image.encode} box={props.bbox} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>
        </Box>
    );
}

export default TransactionPaperLayout;
