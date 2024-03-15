import React from "react";
import { Stack } from "@mui/material";
import SummaryCard from "@/app/vulcan/meta/SummaryCard";
import MetaTable from "@/app/vulcan/meta/MetaTable";

export default function MetaIndex() {
    const [refreshSummary, setRefreshSummary] = React.useState(false)
    const refreshHandler = () => {
        setRefreshSummary(true);
    }
    const refreshUpdateHandler = () => {
        setRefreshSummary(false);
    }

    return (
            <Stack
                spacing={0.5}
                direction={"column"}
                display={"flex"}
                justifyContent={"center"}
                paddingBottom={6}
                paddingTop={3}
                alignItems={"center     "}
                sx={{backgroundColor:"#e0e0e0",width:"75%"}}
                borderRadius={"0 0 20px 20px"}
            >
                <SummaryCard refresh={refreshSummary} refreshUpdate={refreshUpdateHandler}/>
               <MetaTable refresh={refreshHandler} />
            </Stack>
    )
}
