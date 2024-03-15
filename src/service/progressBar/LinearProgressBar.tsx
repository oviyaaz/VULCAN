import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearProgressBar() {
    return (
        <Paper elevation={0} sx={{pl: 3, pr: 3}}>
            <Box sx={{width: "100%", mb: 1, justifyContent: "center"}}>
                <LinearProgress/>
            </Box>
        </Paper>
    )
}