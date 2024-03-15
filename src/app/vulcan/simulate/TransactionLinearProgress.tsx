import React from "react";
import { Box, Typography } from "@mui/material";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import styles from "@/app/page.module.css";

function TransactionLinearProgress(
    props: LinearProgressProps & { value: number }
) {
    return (
        <div >
            <Box sx={{ minWidth: 10 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value)}% Completed`}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }} className={styles.box__width}>
                <Box sx={{ width: "100%" }}>
                    {Math.round(props.value) === 100 ? (
                        <LinearProgress
                            color="success"
                            variant="determinate"
                            {...props}
                        />
                    ) : (
                        <LinearProgress
                            color="primary"
                            variant="determinate"
                            {...props}
                        />
                    )}
                </Box>
            </Box>
        </div>
    );
}

export default TransactionLinearProgress;
